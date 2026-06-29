from pydantic import BaseModel, Field, HttpUrl


class ProductCreate(BaseModel):
    title: str = Field(min_length=3, max_length=100)
    price: float = Field(gt=0)
    website: HttpUrl


class ProductResponse(BaseModel):
    id: int
    title: str
    price: float
    website: HttpUrl