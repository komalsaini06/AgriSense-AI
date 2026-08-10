from pydantic import BaseModel


class FinanceRequest(BaseModel):

    crop_name: str

    land_area: float

    production: float

    investment: float

    selling_price: float