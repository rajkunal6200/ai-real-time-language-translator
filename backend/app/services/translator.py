from deep_translator import GoogleTranslator


def translate_text(text: str, source: str, target: str):
    try:
        effective_source = "auto" if not source or source == "auto" else source
        translator = GoogleTranslator(
            source=effective_source,
            target=target
        )
        translated_text = translator.translate(text)
        return translated_text
    except Exception as e:
        raise ValueError(str(e))
