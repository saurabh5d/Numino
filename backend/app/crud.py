from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime, timedelta
from . import models


def create_book(db: Session, book):
    db_book = models.Book(
        title=book.title,
        author=book.author,
        isbn=book.isbn,
        total_copies=book.total_copies,
        available_copies=book.total_copies
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


def create_member(db: Session, member):
    db_member = models.Member(**member.dict())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member


def borrow_book(db: Session, book_id: int, member_id: int):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    if book.available_copies <= 0:
        raise HTTPException(status_code=400, detail="No copies available")

    record = models.BorrowRecord(
        book_id=book_id,
        member_id=member_id,
        due_date=datetime.utcnow() + timedelta(days=14)
    )

    book.available_copies -= 1

    db.add(record)
    db.commit()
    db.refresh(record)

    return record


def return_book(db: Session, book_id: int, member_id: int):
    record = db.query(models.BorrowRecord).filter(
        models.BorrowRecord.book_id == book_id,
        models.BorrowRecord.member_id == member_id,
        models.BorrowRecord.returned_at == None
    ).first()

    if not record:
        raise HTTPException(status_code=404, detail="Borrow record not found")

    record.returned_at = datetime.utcnow()

    book = db.query(models.Book).filter(models.Book.id == book_id).first()
    book.available_copies += 1

    db.commit()
    db.refresh(record)

    return record
