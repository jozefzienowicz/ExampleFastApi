from sqlalchemy import Column, String, Integer

from backend.api.db.db import Base, engine


class FavouriteZipCode(Base):
    __tablename__ = "FavouriteZipCode"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String)
    name = Column(String)
    user_cookie = Column(String)


Base.metadata.create_all(bind=engine)
