from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.land import Land
from app.models.prediction import Prediction
from app.models.finance import Finance
from app.models.scheme import Scheme


router = APIRouter()


@router.get("/dashboard")
def dashboard_stats(db: Session = Depends(get_db)):

    return {

        "total_lands": db.query(Land).count(),

        "total_predictions": db.query(Prediction).count(),

        "total_finance": db.query(Finance).count(),

        "total_schemes": db.query(Scheme).count()

    }