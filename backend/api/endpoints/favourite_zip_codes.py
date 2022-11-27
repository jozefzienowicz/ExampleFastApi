from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from typing import List

from backend.api.db.db import get_db
from backend.api.models.favourite_zip_codes import FavouriteZipCode
from backend.api.schemas.favourite_zip_codes import FavouriteZipCodeSchema

router = APIRouter(
    prefix="/api/favourite_zip_code",
    tags=["favourite_zip_code"],
)


@router.get("/{user_cookie}", response_model=List[FavouriteZipCodeSchema])
async def get_codes_by_user_list(
    user_cookie: str,
    db: Session = Depends(get_db)
):
    zip_code_qs = db.query(FavouriteZipCode).filter_by(user_cookie=user_cookie).all()
    return zip_code_qs


@router.post("/", response_model=FavouriteZipCodeSchema)
async def create_code(
    zip_code_data: FavouriteZipCodeSchema,
    db: Session = Depends(get_db)
):
    zip_code = FavouriteZipCode(**zip_code_data.dict())
    db.add(zip_code)
    db.commit()
    return zip_code


@router.delete("/{zip_code_id}")
async def delete_code(zip_code_id: int, db: Session = Depends(get_db)):
    zip_code_qs = db.query(FavouriteZipCode).filter_by(id=zip_code_id)
    zip_code_qs.delete()
    db.commit()
    return {"ok": True}
