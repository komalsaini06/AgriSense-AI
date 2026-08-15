from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

# ==============================
# Import Models
# ==============================

from app.models.prediction import Prediction
from app.models.land import Land
from app.models.crop import CropRecommendation
from app.models.finance import Finance
from app.models.history import History
from app.models.scheme import Scheme


# ==============================
# Import Routes
# ==============================

from app.routes.prediction_route import router as prediction_router
from app.routes.land_route import router as land_router
from app.routes.crop_route import router as crop_router
from app.routes.fertilizer_route import router as fertilizer_router
from app.routes.disease_route import router as disease_router
from app.routes.preparation_route import router as preparation_router
from app.routes.rotation_route import router as rotation_router
from app.routes.calendar_route import router as calendar_router
from app.routes.scheme_route import router as scheme_router
from app.routes.finance_route import router as finance_router
#from app.routes.history_route import router as history_router
from app.routes.dashboard_route import router as dashboard_router


# ==============================
# Create Database Tables
# ==============================

Base.metadata.create_all(bind=engine)


# ==============================
# FastAPI Application
# ==============================

app = FastAPI(
    title="AgriSense AI API",
    description="AI Powered Smart Agriculture System",
    version="2.0.0"
)


# ==============================
# CORS
# ==============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==============================
# Register Routes
# ==============================

app.include_router(prediction_router)
app.include_router(land_router)
app.include_router(crop_router)
app.include_router(fertilizer_router)
app.include_router(disease_router)
app.include_router(preparation_router)
app.include_router(rotation_router)
app.include_router(calendar_router)
app.include_router(scheme_router)
app.include_router(finance_router)
#app.include_router(history_router)
app.include_router(dashboard_router)


# ==============================
# Home
# ==============================

@app.get("/")
def home():

    return {
        "project": "AgriSense AI",
        "status": "Running",
        "version": "2.0.0"
    }


# ==============================
# Health Check
# ==============================

@app.get("/health")
def health():

    return {
        "status": "Healthy"
    }
