# models.py

from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    telegram_name = Column(String, unique=True, index=True)
    spent_units = Column(Integer, default=0)
    spins_25 = Column(Integer, default=0)
    spins_50 = Column(Integer, default=0)
    spins_100 = Column(Integer, default=0)
    jackpots_25 = Column(Integer, default=0)
    jackpots_50 = Column(Integer, default=0)
    jackpots_100 = Column(Integer, default=0)
    spins = relationship("SpinHistory", back_populates="user")


class SpinHistory(Base):
    __tablename__ = "spin_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    category = Column(Integer)  # 25, 50, 100
    prize = Column(String)
    is_jackpot = Column(Boolean)

    user = relationship("User", back_populates="spins")
