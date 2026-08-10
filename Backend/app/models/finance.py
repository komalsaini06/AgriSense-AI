from sqlalchemy import Column, Integer, String, Float

from app.database import Base


class Finance(Base):

    __tablename__ = "finance"

    id = Column(Integer, primary_key=True, index=True)

    crop_name = Column(String)

    land_area = Column(Float)

    investment = Column(Float)

    selling_price = Column(Float)

    estimated_production = Column(Float)

    estimated_income = Column(Float)

    estimated_profit = Column(Float)

    profit_percentage = Column(Float)

    status = Column(String)