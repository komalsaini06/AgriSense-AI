from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.scheme import Scheme
from app.schemas.scheme_schema import SchemeRequest

router = APIRouter()


def load_default_schemes(db: Session):

    schemes = [

        {
            "scheme_name": "PM-KISAN Samman Nidhi",
            "benefit": "₹6,000 per year financial assistance",
            "eligibility": "Small and Marginal Farmers",
            "documents": "Aadhaar Card, Bank Account, Land Records",
            "official_link": "https://pmkisan.gov.in"
        },

        {
            "scheme_name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            "benefit": "Crop Insurance against natural disasters",
            "eligibility": "All Farmers",
            "documents": "Aadhaar Card, Bank Passbook, Land Records",
            "official_link": "https://pmfby.gov.in"
        },

        {
            "scheme_name": "Kisan Credit Card (KCC)",
            "benefit": "Low-interest agricultural loans",
            "eligibility": "Eligible Farmers",
            "documents": "Identity Proof, Address Proof, Land Records",
            "official_link": "https://www.myscheme.gov.in"
        },

        {
            "scheme_name": "Soil Health Card Scheme",
            "benefit": "Free soil testing and fertilizer recommendations",
            "eligibility": "All Farmers",
            "documents": "Land Details",
            "official_link": "https://soilhealth.dac.gov.in"
        },

        {
            "scheme_name": "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
            "benefit": "Support for irrigation facilities",
            "eligibility": "Eligible Farmers",
            "documents": "Aadhaar Card, Land Records",
            "official_link": "https://pmksy.gov.in"
        },

        {
            "scheme_name": "e-NAM",
            "benefit": "Online agricultural market platform",
            "eligibility": "Registered Farmers",
            "documents": "Aadhaar Card, Bank Account",
            "official_link": "https://enam.gov.in"
        },

        {
            "scheme_name": "Paramparagat Krishi Vikas Yojana (PKVY)",
            "benefit": "Support for organic farming",
            "eligibility": "Farmer Groups",
            "documents": "Land Records",
            "official_link": "https://pgsindia-ncof.gov.in"
        },

        {
            "scheme_name": "Agriculture Infrastructure Fund (AIF)",
            "benefit": "Financial support for agriculture infrastructure",
            "eligibility": "Farmers and FPOs",
            "documents": "Project Proposal",
            "official_link": "https://agriinfra.dac.gov.in"
        },

        {
            "scheme_name": "National Mission for Sustainable Agriculture (NMSA)",
            "benefit": "Climate-resilient farming support",
            "eligibility": "Eligible Farmers",
            "documents": "Identity Proof",
            "official_link": "https://nmsa.dac.gov.in"
        },

        {
            "scheme_name": "Rashtriya Krishi Vikas Yojana (RKVY)",
            "benefit": "Support for agricultural development projects",
            "eligibility": "State Farmers",
            "documents": "Land Records",
            "official_link": "https://rkvy.nic.in"
        }

    ]

    for item in schemes:

        existing_scheme = db.query(Scheme).filter(
            Scheme.scheme_name == item["scheme_name"]
        ).first()

        if not existing_scheme:

            db.add(
                Scheme(
                    scheme_name=item["scheme_name"],
                    benefit=item["benefit"],
                    eligibility=item["eligibility"],
                    documents=item["documents"],
                    official_link=item["official_link"]
                )
            )

    db.commit()


@router.get("/schemes")
def get_schemes(db: Session = Depends(get_db)):

    load_default_schemes(db)

    return db.query(Scheme).all()


@router.post("/schemes")
def add_scheme(
    request: SchemeRequest,
    db: Session = Depends(get_db)
):

    existing_scheme = db.query(Scheme).filter(
        Scheme.scheme_name == request.scheme_name
    ).first()

    if existing_scheme:

        return {
            "message": "Scheme already exists"
        }

    new_scheme = Scheme(
        scheme_name=request.scheme_name,
        benefit=request.benefit,
        eligibility=request.eligibility,
        documents=request.documents,
        official_link=request.official_link
    )

    db.add(new_scheme)
    db.commit()
    db.refresh(new_scheme)

    return {
        "message": "Scheme added successfully"
    }