from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime
from app.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    farmer_name = Column(String, nullable=False)

    nitrogen = Column(Float)
    phosphorus = Column(Float)
    potassium = Column(Float)

    temperature = Column(Float)
    humidity = Column(Float)
    ph = Column(Float)
    rainfall = Column(Float)

    predicted_crop = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)