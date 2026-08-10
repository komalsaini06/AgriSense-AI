from pydantic import BaseModel


class LandRequest(BaseModel):
    land_name: str
    location: str
    area: float
    soil_type: str
    current_crop: str


class LandResponse(BaseModel):
    id: int
    land_name: str
    location: str
    area: float
    soil_type: str
    current_crop: str

    class Config:
        from_attributes = True