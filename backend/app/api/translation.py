from fastapi import APIRouter
from app.services.translator import translate_text
from app.schemas.translation import TranslationRequest, TranslationResponse

router = APIRouter()

@router.post("/translate", response_model=TranslationResponse)
async def translate(request: TranslationRequest):
    translated_text = translate_text(request.text, request.source, request.target)
    return TranslationResponse(success=True, translated_text=translated_text)
