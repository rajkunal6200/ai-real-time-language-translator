from pydantic import BaseModel
from typing import Optional

class TranslationRequest(BaseModel):
    text: str
    source: Optional[str] = "auto"
    target: str

class TranslationResponse(BaseModel):
    success: bool
    translated_text: str


