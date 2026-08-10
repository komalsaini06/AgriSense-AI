from fastapi import APIRouter


router = APIRouter()



@router.post("/rotation/recommend")
def rotation_recommend(data: dict):


    crop = data.get("crop", "").lower()



    if crop == "rice":

        return {

            "current_crop": "Rice",

            "recommended_next_crops": [

                {
                    "crop": "Potato",
                    "benefit": "Good winter crop after rice and gives good market value"
                },

                {
                    "crop": "Wheat",
                    "benefit": "Maintains soil nutrients and is commonly grown after rice"
                },

                {
                    "crop": "Mustard",
                    "benefit": "Requires less water and improves crop diversity"
                },

                {
                    "crop": "Pulses",
                    "benefit": "Adds nitrogen naturally to soil"
                }

            ]

        }



    elif crop == "wheat":

        return {

            "current_crop": "Wheat",

            "recommended_next_crops": [

                {
                    "crop": "Maize",
                    "benefit": "Improves soil structure"
                },

                {
                    "crop": "Cotton",
                    "benefit": "Suitable for crop diversification"
                },

                {
                    "crop": "Pulses",
                    "benefit": "Improves nitrogen content"
                }

            ]

        }



    elif crop == "potato":

        return {

            "current_crop": "Potato",

            "recommended_next_crops": [

                {
                    "crop": "Rice",
                    "benefit": "Helps break potato disease cycle"
                },

                {
                    "crop": "Maize",
                    "benefit": "Maintains soil balance"
                },

                {
                    "crop": "Pulses",
                    "benefit": "Improves soil fertility"
                }

            ]

        }



    elif crop == "sugarcane":

        return {

            "current_crop": "Sugarcane",

            "recommended_next_crops": [

                {
                    "crop": "Pulses",
                    "benefit": "Restores soil nutrients"
                },

                {
                    "crop": "Vegetables",
                    "benefit": "Provides additional income"
                }

            ]

        }



    else:

        return {

            "current_crop": crop.title(),

            "recommended_next_crops": [

                {
                    "crop": "Pulses",
                    "benefit": "Improves overall soil health"
                },

                {
                    "crop": "Vegetables",
                    "benefit": "Good economic return"
                }

            ]

        }