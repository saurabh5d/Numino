from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import crud, schemas
from .. import models


router = APIRouter(tags=["Borrowing"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/borrow", response_model=schemas.BorrowResponse)
def borrow(request: schemas.BorrowRequest, db: Session = Depends(get_db)):
    return crud.borrow_book(db, request.book_id, request.member_id)


@router.post("/return", response_model=schemas.BorrowResponse)
def return_book(request: schemas.BorrowRequest, db: Session = Depends(get_db)):
    return crud.return_book(db, request.book_id, request.member_id)

@router.get("/members/{member_id}/borrowed")
def borrowed_books(member_id: int, db: Session = Depends(get_db)):
    return db.query(models.BorrowRecord).filter(
        models.BorrowRecord.member_id == member_id,
        models.BorrowRecord.returned_at == None
    ).all()