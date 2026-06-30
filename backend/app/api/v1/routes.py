from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.services import (
   create_product,
    get_all_products,
    get_product_by_id,
    update_product,
    delete_product,
)

from app.schemas.product import (
    ProductCreate,
    ProductResponse,
    ProductUpdate,
)

from app.services import create_product, get_all_products

from app.core.database import get_db
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

@router.get(
    "/products",
    response_model=list[ProductResponse],
)
def get_products(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
):
    return get_all_products(
    db,
    page,
    limit,
)

@router.get(
    "/products/{product_id}",
    response_model=ProductResponse,
)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = get_product_by_id(db, product_id)

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


@router.put(
    "/products/{product_id}",
    response_model=ProductResponse,
)
def edit_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
):
    updated_product = update_product(
        db,
        product_id,
        product,
    )

    if not updated_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return updated_product

@router.delete(
    "/products/{product_id}",
    response_model=ProductResponse,
)
def remove_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    deleted_product = delete_product(
        db,
        product_id,
    )

    if not deleted_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return deleted_product