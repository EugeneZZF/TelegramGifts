# main.py

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database import async_session, engine, Base
import crud
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Telegram Roulette App")

# В origins добавляешь все ссылки на свой фронт
origins = [
    "https://t.me",             
    "https://web.telegram.org", 
    "http://localhost:3000", 
    "http://127.0.0.1:8000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            
    allow_credentials=True,
    allow_methods=["*"],            
    allow_headers=["*"],         
)

class SpinRequest(BaseModel):
    telegram_name: str
    category: int  # 25, 50, 100

async def get_db():
    async with async_session() as session:
        yield session

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.post("/spin")
async def spin(request: SpinRequest, db: AsyncSession = Depends(get_db)):
    if request.category not in [25, 50, 100]:
        raise HTTPException(status_code=400, detail="Invalid spin category")
    user = await crud.get_or_create_user(db, request.telegram_name)
    spin = await crud.perform_spin(db, user, request.category)
    return {
        "telegram_name": user.telegram_name,
        "category": spin.category,
        "prize": spin.prize,
        "is_jackpot": spin.is_jackpot
    }

@app.get("/leaderboard/{category}")
async def leaderboard(category: int, db: AsyncSession = Depends(get_db)):
    if category not in [25, 50, 100]:
        raise HTTPException(status_code=400, detail="Invalid leaderboard category")
    users = await crud.get_leaderboard(db, category)
    return [
        {
            "telegram_name": user.telegram_name,
            "spins": getattr(user, f"spins_{category}"),
            "jackpots": getattr(user, f"jackpots_{category}"),
            "spent_units": getattr(user, f"spins_{category}")*category
        }
        for user in users
    ]

@app.get("/prizes/{category}")
async def prizes(category: int):
    prize_list = await crud.get_prizes(category)
    if not prize_list:
        raise HTTPException(status_code=404, detail="No prizes for this category")
    return prize_list

@app.get("/spin-history/{telegram_name}")
async def spin_history(telegram_name: str, db: AsyncSession = Depends(get_db)):
    spins = await crud.get_spin_history(db, telegram_name)
    if spins is None:
        raise HTTPException(status_code=404, detail="User not found")
    return [
        {
            "category": spin.category,
            "prize": spin.prize,
            "is_jackpot": spin.is_jackpot
        }
        for spin in spins
    ]
