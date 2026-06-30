from sqlalchemy.orm import Session

from sqlalchemy import asc, desc

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


def create_product(db: Session, product: ProductCreate):
    db_product = Product(
        title=product.title,
        brand=product.brand,
        price=product.price,
        currency=product.currency,
        source=product.source,
        url=product.url,
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product

def get_all_products(
    db: Session,
    page: int = 1,
    limit: int = 10,
):
    offset = (page - 1) * limit

    return (
        db.query(Product)
        .offset(offset)
        .limit(limit)
        .all()
    )

def get_product_by_id(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def update_product(
    db: Session,
    product_id: int,
    product: ProductUpdate,
):
    db_product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not db_product:
        return None

    db_product.title = product.title
    db_product.brand = product.brand
    db_product.price = product.price
    db_product.currency = product.currency
    db_product.source = product.source
    db_product.url = product.url

    db.commit()
    db.refresh(db_product)

    return db_product

def delete_product(
    db: Session,
    product_id: int,
):
    db_product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not db_product:
        return None

    db.delete(db_product)
    db.commit()

    return db_product