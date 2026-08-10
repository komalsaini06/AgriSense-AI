from fastapi import APIRouter


router = APIRouter()



@router.post("/preparation/recommend")
def preparation_recommend(data: dict):


    crop = data.get("crop", "").lower()



    if crop == "rice":

        return {

            "crop": "Rice",

            "steps": [
                "Plough the field properly",
                "Level the soil for equal water distribution",
                "Maintain proper water management",
                "Add organic manure before transplanting"
            ],

            "soil_improvement":
            "Add compost and maintain soil fertility"

        }



    elif crop == "wheat":

        return {

            "crop": "Wheat",

            "steps": [
                "Prepare fine soil bed",
                "Remove weeds from field",
                "Apply fertilizer before sowing",
                "Maintain proper irrigation"
            ],

            "soil_improvement":
            "Add nitrogen-rich fertilizer"

        }



    elif crop == "maize":

        return {

            "crop": "Maize",

            "steps": [
                "Deep ploughing of land",
                "Prepare seed beds",
                "Maintain proper spacing",
                "Ensure drainage facility"
            ],

            "soil_improvement":
            "Use organic compost"

        }



    elif crop == "sugarcane":

        return {

            "crop": "Sugarcane",

            "steps": [
                "Deep ploughing of soil",
                "Prepare ridges and furrows",
                "Use healthy sugarcane setts",
                "Maintain regular irrigation"
            ],

            "soil_improvement":
            "Add farmyard manure and potassium fertilizer"

        }



    elif crop == "potato":

        return {

            "crop": "Potato",

            "steps": [
                "Prepare loose and well-drained soil",
                "Remove weeds before planting",
                "Plant certified potato seeds",
                "Maintain proper moisture"
            ],

            "soil_improvement":
            "Add organic manure and balanced fertilizer"

        }



    elif crop == "cotton":

        return {

            "crop": "Cotton",

            "steps": [
                "Prepare deep soil bed",
                "Maintain proper plant spacing",
                "Control weeds regularly",
                "Provide irrigation during critical stages"
            ],

            "soil_improvement":
            "Maintain nitrogen and phosphorus levels"

        }



    elif crop == "tomato":

        return {

            "crop": "Tomato",

            "steps": [
                "Prepare nursery beds",
                "Transplant healthy seedlings",
                "Provide support to plants",
                "Maintain irrigation schedule"
            ],

            "soil_improvement":
            "Use compost and organic nutrients"

        }



    else:

        return {

            "crop": crop.title(),

            "steps": [
                "Clean the field",
                "Prepare soil properly",
                "Remove weeds",
                "Apply required nutrients"
            ],

            "soil_improvement":
            "Maintain soil health using organic manure"

        }