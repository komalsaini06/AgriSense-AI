from fastapi import APIRouter


router = APIRouter()



@router.post("/fertilizer/recommend")
def fertilizer_recommend(data: dict):


    crop = data.get("crop","").lower()



    if crop == "rice":

        return {

            "crop":"Rice",

            "seed":"Pusa Basmati 1121",

            "nitrogen":"Urea - 50 kg/acre",

            "phosphorus":"DAP - 40 kg/acre",

            "potassium":"MOP - 20 kg/acre",

            "organic":"Vermicompost recommended"

        }



    elif crop == "wheat":

        return {

            "crop":"Wheat",

            "seed":"HD 2967",

            "nitrogen":"Urea - 45 kg/acre",

            "phosphorus":"DAP - 35 kg/acre",

            "potassium":"MOP - 20 kg/acre",

            "organic":"Farmyard manure recommended"

        }



    elif crop == "maize":

        return {

            "crop":"Maize",

            "seed":"Pioneer Hybrid Maize",

            "nitrogen":"Urea - 60 kg/acre",

            "phosphorus":"DAP - 45 kg/acre",

            "potassium":"MOP - 25 kg/acre",

            "organic":"Compost recommended"

        }



    else:

        return {

            "crop":crop,

            "seed":"General improved variety",

            "nitrogen":"Balanced fertilizer",

            "phosphorus":"DAP",

            "potassium":"MOP",

            "organic":"Organic manure"

        }