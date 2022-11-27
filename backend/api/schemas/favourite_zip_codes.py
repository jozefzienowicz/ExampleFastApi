from pydantic import BaseModel


class FavouriteZipCodeSchema(BaseModel):
    id: int
    name: str
    code: str
    user_cookie: str

    class Config:
        orm_mode = True
