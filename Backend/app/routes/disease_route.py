from fastapi import APIRouter, UploadFile, File


router = APIRouter()



@router.post("/disease/detect")
async def detect_disease(
    image: UploadFile = File(...)
):


    filename = image.filename.lower()



    # Temporary AI logic
    # Later we will connect ML model


    if "tomato" in filename:


        disease = "Tomato Early Blight"

        symptoms = "Brown spots and yellowing of leaves"

        treatment = "Use suitable fungicide and remove infected leaves"

        prevention = "Maintain plant spacing and avoid excess moisture"



    elif "potato" in filename:


        disease = "Potato Late Blight"

        symptoms = "Dark lesions on leaves"

        treatment = "Apply recommended fungicide"

        prevention = "Use disease-free seeds"



    else:


        disease = "Healthy Leaf"

        symptoms = "No visible disease detected"

        treatment = "No treatment required"

        prevention = "Continue proper crop management"




    return {


        "filename": image.filename,

        "disease": disease,

        "symptoms": symptoms,

        "treatment": treatment,

        "prevention": prevention

    }