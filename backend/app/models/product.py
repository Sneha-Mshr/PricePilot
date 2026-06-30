from sqlalchemy import Column, Integer, String, Float

from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    brand = Column(String)
    price = Column(Float)
    currency = Column(String)
    source = Column(String)
    url = Column(String)