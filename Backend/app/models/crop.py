from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base


class CropRecommendation(Base):
    __tablename__ = "crop_recommendations"

    id = Column(Integer, primary_key=True, index=True)

    land_name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    soil_type = Column(String, nullable=False)

    season = Column(String, nullable=False)
    irrigation = Column(String, nullable=False)

    recommended_crop = Column(String, nullable=False)
    reason = Column(String)
    expected_yield = Column(String)
    water_requirement = Column(String)
    crop_duration = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)