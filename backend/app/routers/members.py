from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import crud, schemas, models

router = APIRouter(prefix="/members", tags=["Members"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.MemberResponse)
def create_member(member: schemas.MemberCreate, db: Session = Depends(get_db)):
    return crud.create_member(db, member)


@router.get("/", response_model=list[schemas.MemberResponse])
def list_members(db: Session = Depends(get_db)):
    return db.query(models.Member).all()
