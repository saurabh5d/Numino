from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class BookCreate(BaseModel):
    title: str
    author: str
    isbn: Optional[str]
    total_copies: int


class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    isbn: Optional[str]
    total_copies: int
    available_copies: int

    class Config:
        orm_mode = True


class MemberCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str]


class MemberResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]

    class Config:
        orm_mode = True


class BorrowRequest(BaseModel):
    book_id: int
    member_id: int


class BorrowResponse(BaseModel):
    id: int
    book_id: int
    member_id: int
    borrowed_at: datetime
    due_date: datetime
    returned_at: Optional[datetime]

    class Config:
        orm_mode = True
