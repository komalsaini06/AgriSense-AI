from sqlalchemy import Column, Integer, String
from app.database import Base


class Scheme(Base):

    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)

    scheme_name = Column(String)

    benefit = Column(String)

    eligibility = Column(String)

    documents = Column(String)

    official_link = Column(String)