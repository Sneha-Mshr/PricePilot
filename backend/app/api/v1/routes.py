from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.product import ProductCreate, ProductResponse
from app.services import create_product

router = APIRouter()


@router.post(
    "/products",
    response_model=ProductResponse,
    status_code=201,
)
def add_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
):
    return create_product(db, product)