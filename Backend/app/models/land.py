from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database import Base


class Land(Base):
    __tablename__ = "lands"

    id = Column(Integer, primary_key=True, index=True)

    land_name = Column(String, nullable=False)

    location = Column(String, nullable=False)

    area = Column(Float, nullable=False)

    soil_type = Column(String, nullable=False)

    current_crop = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)