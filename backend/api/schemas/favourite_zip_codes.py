from pydantic import BaseModel


class FavouriteZipCodeCreateSchema(BaseModel):
    name: str
    code: str
    user_cookie: str

    class Config:
        orm_mode = True


class FavouriteZipCodeSchema(FavouriteZipCodeCreateSchema):
    id: int

    class Config:
        orm_mode = True
