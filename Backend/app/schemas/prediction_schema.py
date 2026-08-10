from pydantic import BaseModel


class PredictionRequest(BaseModel):
    farmer_name: str

    nitrogen: float
    phosphorus: float
    potassium: float

    temperature: float
    humidity: float
    ph: float
    rainfall: float