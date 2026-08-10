from pydantic import BaseModel


class SchemeRequest(BaseModel):

    scheme_name: str

    benefit: str

    eligibility: str

    documents: str

    official_link: str