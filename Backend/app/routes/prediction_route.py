from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.prediction import Prediction
from app.schemas.prediction_schema import PredictionRequest

router = APIRouter()


@router.post("/prediction")
def create_prediction(
    request: PredictionRequest,
    db: Session = Depends(get_db)
):

    # Temporary prediction logic
    if request.rainfall > 100 and request.humidity > 60:
        crop = "Rice"

    elif request.temperature > 25 and request.rainfall < 100:
        crop = "Wheat"

    else:
        crop = "Maize"


    new_prediction = Prediction(
        farmer_name=request.farmer_name,
        nitrogen=request.nitrogen,
        phosphorus=request.phosphorus,
        potassium=request.potassium,
        temperature=request.temperature,
        humidity=request.humidity,
        ph=request.ph,
        rainfall=request.rainfall,
        predicted_crop=crop
    )

    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)

    return {
        "farmer_name": request.farmer_name,
        "predicted_crop": crop,
        "message": "Prediction saved successfully"
    }