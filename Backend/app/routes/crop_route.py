from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.crop import CropRecommendation
from app.models.land import Land
from app.schemas.crop_schema import CropRecommendationRequest


router = APIRouter()


# =========================================================
# GET ALL SAVED LANDS
# =========================================================

@router.get("/crop/lands")
def get_lands(db: Session = Depends(get_db)):

    lands = db.query(Land).all()

    return lands


# =========================================================
# CROP RECOMMENDATION
# =========================================================

@router.post("/crop/recommend")
def recommend_crop(
    request: CropRecommendationRequest,
    db: Session = Depends(get_db)
):

    # Convert input to lowercase
    soil = request.soil_type.strip().lower()
    season = request.season.strip().lower()
    irrigation = request.irrigation.strip().lower()


    # =====================================================
    # RECOMMENDATION LOGIC
    # =====================================================

    # -----------------------------------------------------
    # KHARIF SEASON
    # -----------------------------------------------------

    if season == "kharif":

        # Good irrigation
        if irrigation == "good":

            if soil in ["clay", "clayey"]:

                crop = "Rice"
                reason = (
                    "Kharif season, clay soil and good irrigation "
                    "provide suitable conditions for rice."
                )
                water = "High"
                duration = "120 days"
                yield_value = "25 quintal/acre"


            elif soil in ["loamy", "loam"]:

                crop = "Maize"
                reason = (
                    "Loamy soil with good irrigation during Kharif "
                    "is suitable for maize cultivation."
                )
                water = "Medium"
                duration = "100 days"
                yield_value = "22 quintal/acre"


            elif soil in ["sandy"]:

                crop = "Cotton"
                reason = (
                    "Sandy soil with good irrigation can support "
                    "cotton cultivation during Kharif."
                )
                water = "Medium"
                duration = "160 days"
                yield_value = "18 quintal/acre"


            else:

                crop = "Maize"
                reason = (
                    "Maize is adaptable to different soil conditions "
                    "during the Kharif season."
                )
                water = "Medium"
                duration = "100 days"
                yield_value = "18 quintal/acre"


        # Medium irrigation
        elif irrigation == "medium":

            if soil in ["loamy", "loam"]:

                crop = "Maize"
                reason = (
                    "Maize is suitable for loamy soil with "
                    "moderate irrigation during Kharif."
                )
                water = "Medium"
                duration = "100 days"
                yield_value = "22 quintal/acre"


            elif soil in ["sandy"]:

                crop = "Millet"
                reason = (
                    "Millet requires comparatively less water "
                    "and performs well in sandy soil."
                )
                water = "Low"
                duration = "90 days"
                yield_value = "15 quintal/acre"


            else:

                crop = "Maize"
                reason = (
                    "Maize can adapt to moderate irrigation "
                    "conditions during Kharif."
                )
                water = "Medium"
                duration = "100 days"
                yield_value = "18 quintal/acre"


        # Low irrigation
        else:

            if soil in ["sandy"]:

                crop = "Millet"
                reason = (
                    "Millet is a low-water crop and is suitable "
                    "for sandy soil with limited irrigation."
                )
                water = "Low"
                duration = "90 days"
                yield_value = "15 quintal/acre"


            elif soil in ["loamy", "loam"]:

                crop = "Millet"
                reason = (
                    "Millet can tolerate lower water availability "
                    "and can grow in loamy soil."
                )
                water = "Low"
                duration = "90 days"
                yield_value = "15 quintal/acre"


            else:

                crop = "Millet"
                reason = (
                    "Millet is recommended because it requires "
                    "less irrigation during Kharif."
                )
                water = "Low"
                duration = "90 days"
                yield_value = "14 quintal/acre"


    # -----------------------------------------------------
    # RABI SEASON
    # -----------------------------------------------------

    elif season == "rabi":

        # Good irrigation
        if irrigation == "good":

            if soil in ["loamy", "loam"]:

                crop = "Wheat"
                reason = (
                    "Loamy soil with good irrigation during Rabi "
                    "is highly suitable for wheat."
                )
                water = "Medium"
                duration = "140 days"
                yield_value = "20 quintal/acre"


            elif soil in ["clay", "clayey"]:

                crop = "Wheat"
                reason = (
                    "Wheat can perform well in clay soil when "
                    "adequate irrigation is available."
                )
                water = "Medium"
                duration = "140 days"
                yield_value = "19 quintal/acre"


            elif soil in ["sandy"]:

                crop = "Potato"
                reason = (
                    "Sandy soil with good irrigation is suitable "
                    "for potato cultivation during Rabi."
                )
                water = "Medium"
                duration = "100 days"
                yield_value = "18 quintal/acre"


            else:

                crop = "Wheat"
                reason = (
                    "Wheat is a suitable Rabi crop under "
                    "adequate irrigation."
                )
                water = "Medium"
                duration = "140 days"
                yield_value = "18 quintal/acre"


        # Medium irrigation
        elif irrigation == "medium":

            if soil in ["loamy", "loam"]:

                crop = "Wheat"
                reason = (
                    "Loamy soil with moderate irrigation provides "
                    "suitable conditions for wheat."
                )
                water = "Medium"
                duration = "140 days"
                yield_value = "20 quintal/acre"


            elif soil in ["sandy"]:

                crop = "Potato"
                reason = (
                    "Potato can grow well in sandy soil with "
                    "moderate irrigation."
                )
                water = "Medium"
                duration = "100 days"
                yield_value = "17 quintal/acre"


            else:

                crop = "Mustard"
                reason = (
                    "Mustard is comparatively suitable for "
                    "moderate irrigation during Rabi."
                )
                water = "Low"
                duration = "120 days"
                yield_value = "15 quintal/acre"


        # Low irrigation
        else:

            if soil in ["sandy", "loamy", "loam"]:

                crop = "Mustard"
                reason = (
                    "Mustard requires relatively less water "
                    "and is suitable for Rabi with limited irrigation."
                )
                water = "Low"
                duration = "120 days"
                yield_value = "14 quintal/acre"


            else:

                crop = "Mustard"
                reason = (
                    "Mustard is recommended because it has "
                    "relatively low irrigation requirements."
                )
                water = "Low"
                duration = "120 days"
                yield_value = "13 quintal/acre"


    # -----------------------------------------------------
    # UNKNOWN SEASON
    # -----------------------------------------------------

    else:

        crop = "Maize"

        reason = (
            "Maize is a versatile crop and can adapt to "
            "different soil and irrigation conditions."
        )

        water = "Medium"

        duration = "100 days"

        yield_value = "18 quintal/acre"


    # =====================================================
    # SAVE RECOMMENDATION HISTORY
    # =====================================================

    new_crop = CropRecommendation(

        land_name=request.land_name,

        location=request.location,

        soil_type=request.soil_type,

        season=request.season,

        irrigation=request.irrigation,

        recommended_crop=crop,

        reason=reason,

        expected_yield=yield_value,

        water_requirement=water,

        crop_duration=duration

    )


    db.add(new_crop)

    db.commit()

    db.refresh(new_crop)


    # =====================================================
    # RETURN RESULT
    # =====================================================

    return {

        "recommended_crop": crop,

        "reason": reason,

        "expected_yield": yield_value,

        "water_requirement": water,

        "crop_duration": duration

    }