from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.land import Land
from app.models.prediction import Prediction
from app.models.finance import Finance


router = APIRouter()


@router.get("/history")
def get_history(db: Session = Depends(get_db)):

    land_history = db.query(Land).all()

    prediction_history = db.query(Prediction).all()

    finance_history = db.query(Finance).all()


    return {

        "land_history": land_history,

        "prediction_history": prediction_history,

        "finance_history": finance_history

    }