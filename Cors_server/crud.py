# crud.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from models import User, SpinHistory
from config import prizes, RANDOM_ORG_API_KEY
import httpx

async def get_random_number():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            'https://api.random.org/json-rpc/4/invoke',
            json={
                "jsonrpc": "2.0",
                "method": "generateIntegers",
                "params": {
                    "apiKey": RANDOM_ORG_API_KEY,
                    "n": 1,
                    "min": 0,
                    "max": 1_000_000,
                    "replacement": True
                },
                "id": 42
            }
        )
        data = response.json()
        random_int = data["result"]["random"]["data"][0]
        return random_int / 1_000_000

async def get_or_create_user(db: AsyncSession, telegram_name: str):
    result = await db.execute(select(User).where(User.telegram_name == telegram_name))
    user = result.scalars().first()
    if not user:
        user = User(telegram_name=telegram_name)
        db.add(user)
        await db.commit()
        await db.refresh(user)
    return user

async def perform_spin(db: AsyncSession, user: User, category: int):
    random_value = await get_random_number()

    prize_list = prizes[category]
    total_chance = sum(p["chance"] for p in prize_list)
    random_scaled = random_value * total_chance

    cumulative = 0.0
    selected_prize = None
    for prize in prize_list:
        cumulative += prize["chance"]
        if random_scaled <= cumulative:
            selected_prize = prize
            break

    user.spent_units += category
    if category == 25:
        user.spins_25 += 1
        if selected_prize["is_jackpot"]:
            user.jackpots_25 += 1
    elif category == 50:
        user.spins_50 += 1
        if selected_prize["is_jackpot"]:
            user.jackpots_50 += 1
    elif category == 100:
        user.spins_100 += 1
        if selected_prize["is_jackpot"]:
            user.jackpots_100 += 1

    db.add(user)

    spin = SpinHistory(
        user_id=user.id,
        category=category,
        prize=selected_prize["name"],
        is_jackpot=selected_prize["is_jackpot"]
    )
    db.add(spin)

    await db.commit()
    await db.refresh(spin)

    # Ограничение истории до 50 записей
    result = await db.execute(
        select(SpinHistory).where(SpinHistory.user_id == user.id).order_by(desc(SpinHistory.id))
    )
    spins = result.scalars().all()
    if len(spins) > 50:
        for old_spin in spins[50:]:
            await db.delete(old_spin)
        await db.commit()

    return spin

async def get_leaderboard(db: AsyncSession, category: int):
    order_by_field = {
        25: User.spins_25,
        50: User.spins_50,
        100: User.spins_100
    }[category]

    result = await db.execute(select(User).where(order_by_field > 0).order_by(order_by_field.desc()))
    return result.scalars().all()

async def get_spin_history(db: AsyncSession, telegram_name: str):
    result = await db.execute(select(User).where(User.telegram_name == telegram_name))
    user = result.scalars().first()
    if not user:
        return None

    spins_result = await db.execute(
        select(SpinHistory).where(SpinHistory.user_id == user.id).order_by(desc(SpinHistory.id)).limit(50)
    )
    spins = spins_result.scalars().all()
    return spins

async def get_prizes(category: int):
    prize_list = prizes.get(category, [])
    return[
        {
            "name": prize["name"],
            "chance_percent": round(prize["chance"], 3),
            "price": prize["price"]
        }
        for prize in prize_list
    ]
