from pydantic import BaseModel


class CropRecommendationRequest(BaseModel):
    land_name: str
    location: str
    soil_type: str

    season: str
    irrigation: str


class CropRecommendationResponse(BaseModel):
    recommended_crop: str
    reason: str
    expected_yield: str
    water_requirement: str
    crop_duration: str