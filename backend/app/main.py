from fastapi import FastAPI
from app.core.config import settings
from app.api.health import router as health_router
from app.api.translation import router as translation_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION
)

app.include_router(health_router)
app.include_router(translation_router)


@app.get("/")
async def root():
    return {
        "success": True,
        "message": "AI Real-Time Language Translator API is running.",
        "version": settings.VERSION
    }
