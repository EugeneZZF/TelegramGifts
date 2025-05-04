import asyncio
from aiogram import Bot, Dispatcher, types, F
from aiogram.enums import ParseMode
from aiogram.types import Message, WebAppInfo
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.client.default import DefaultBotProperties
from aiogram.filters import Command

# Вставь свой токен
TOKEN = "7768545527:AAGBJ36wSr4Hi08PffwMbuuMGWV15EjRWX8"

# Инициализация бота
bot = Bot(
    token=TOKEN,
    default=DefaultBotProperties(parse_mode=ParseMode.HTML)
)
dp = Dispatcher(storage=MemoryStorage())

# Хендлер для команды /start
@dp.message(Command("start"))
async def start_handler(message: Message):
    await message.answer(
        "🎲 Привет! Жми на кнопку ниже, чтобы открыть рулетку:",
        reply_markup=types.ReplyKeyboardMarkup(
            keyboard=[
                [
                    types.KeyboardButton(
                        text="🎰 Открыть рулетку",
                        web_app=WebAppInfo(url="https://your-mini-app-url.com")  # сюда вставь ссылку на Mini App
                    )
                ]
            ],
            resize_keyboard=True
        )
    )

# Запуск бота
async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
