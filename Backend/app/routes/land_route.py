from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.land import Land
from app.schemas.land_schema import LandRequest

router = APIRouter()


# Save Land Information
@router.post("/land")
def save_land(
    request: LandRequest,
    db: Session = Depends(get_db)
):

    new_land = Land(
        land_name=request.land_name,
        location=request.location,
        area=request.area,
        soil_type=request.soil_type,
        current_crop=request.current_crop
    )

    db.add(new_land)
    db.commit()
    db.refresh(new_land)

    return {
        "message": "Land saved successfully",
        "land_id": new_land.id
    }


# Get All Lands
@router.get("/land")
def get_all_lands(
    db: Session = Depends(get_db)
):

    lands = db.query(Land).all()

    return lands