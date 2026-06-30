from pydantic import BaseModel


class ProductCreate(BaseModel):
    title: str
    brand: str
    price: float
    currency: str
    source: str
    url: str

class ProductUpdate(BaseModel):
    title: str
    brand: str
    price: float
    currency: str
    source: str
    url: str

class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True


