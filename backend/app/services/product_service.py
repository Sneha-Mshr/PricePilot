from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate


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