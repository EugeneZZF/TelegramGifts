# schemas.py

from pydantic import BaseModel
from typing import List

class UserCreate(BaseModel):
    telegram_name: str

class SpinResult(BaseModel):
    prize: str
    is_jackpot: bool

class UserProfile(BaseModel):
    telegram_name: str
    spent_units: int
    spins_25: int
    spins_50: int
    spins_100: int
    jackpots_25: int
    jackpots_50: int
    jackpots_100: int

