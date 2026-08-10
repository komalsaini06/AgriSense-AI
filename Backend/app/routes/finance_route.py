from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.finance import Finance

from app.schemas.finance_schema import FinanceRequest


router = APIRouter()


@router.post("/finance")
def calculate_finance(
    request: FinanceRequest,
    db: Session = Depends(get_db)
):

    # ==========================================
    # GET FARMER INPUT
    # ==========================================

    crop_name = request.crop_name

    land_area = request.land_area

    production = request.production

    investment = request.investment

    selling_price = request.selling_price


    # ==========================================
    # VALIDATION
    # ==========================================

    if land_area <= 0:

        return {
            "message": "Land area must be greater than zero."
        }


    if production <= 0:

        return {
            "message": "Production must be greater than zero."
        }


    if investment < 0:

        return {
            "message": "Investment cannot be negative."
        }


    if selling_price < 0:

        return {
            "message": "Selling price cannot be negative."
        }


    # ==========================================
    # INCOME CALCULATION
    # ==========================================

    estimated_income = (
        production * selling_price
    )


    # ==========================================
    # PROFIT CALCULATION
    # ==========================================

    estimated_profit = (
        estimated_income - investment
    )


    # ==========================================
    # PROFIT PERCENTAGE
    # ==========================================

    if investment > 0:

        profit_percentage = (
            estimated_profit
            / investment
        ) * 100

    else:

        profit_percentage = 0


    # ==========================================
    # STATUS
    # ==========================================

    if estimated_profit > 0:

        status = "Profitable"

    elif estimated_profit < 0:

        status = "Loss"

    else:

        status = "Break-even"


    # ==========================================
    # SAVE TO DATABASE
    # ==========================================

    new_finance = Finance(

        crop_name=crop_name,

        land_area=land_area,

        investment=investment,

        selling_price=selling_price,

        estimated_production=production,

        estimated_income=estimated_income,

        estimated_profit=estimated_profit,

        profit_percentage=profit_percentage,

        status=status

    )


    db.add(new_finance)

    db.commit()

    db.refresh(new_finance)


    # ==========================================
    # RESPONSE
    # ==========================================

    return {

        "id": new_finance.id,

        "crop_name": crop_name,

        "land_area": land_area,

        "estimated_production":
            production,

        "investment":
            investment,

        "selling_price":
            selling_price,

        "estimated_income":
            estimated_income,

        "estimated_profit":
            estimated_profit,

        "profit_percentage":
            profit_percentage,

        "status":
            status

    }