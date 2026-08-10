from sqlalchemy import Column, Integer, String

from app.database import Base


class History(Base):

    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)

    module = Column(String)

    farmer_name = Column(String)

    result = Column(String)