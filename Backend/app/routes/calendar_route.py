from fastapi import APIRouter


router = APIRouter()



@router.post("/calendar/recommend")
def calendar_recommend(data: dict):


    crop = data.get("crop", "").lower()



    if crop == "rice":

        return {

            "crop": "Rice",

            "sowing": "June - July",

            "fertilizer": "30-45 days after sowing",

            "irrigation": "Maintain water level regularly",

            "harvesting": "October - November"

        }



    elif crop == "wheat":

        return {

            "crop": "Wheat",

            "sowing": "November - December",

            "fertilizer": "25-30 days after sowing",

            "irrigation": "Every 20-25 days",

            "harvesting": "March - April"

        }



    elif crop == "potato":

        return {

            "crop": "Potato",

            "sowing": "October - November",

            "fertilizer": "20-30 days after planting",

            "irrigation": "Every 7-10 days",

            "harvesting": "January - February"

        }



    elif crop == "sugarcane":

        return {

            "crop": "Sugarcane",

            "sowing": "February - March",

            "fertilizer": "Every growth stage",

            "irrigation": "Regular irrigation required",

            "harvesting": "10-12 months after planting"

        }
    elif crop == "cotton":

        return {

            "crop": "Cotton",

            "sowing": "April - May",

            "fertilizer": "Apply nitrogen fertilizer in stages during crop growth",

            "irrigation": "Provide irrigation during flowering and boll formation",

            "harvesting": "October - December"

        }


    else:

        return {

            "crop": crop.title(),

            "sowing": "According to crop season",

            "fertilizer": "Apply balanced nutrients",

            "irrigation": "According to soil moisture",

            "harvesting": "Depends on crop duration"

        }