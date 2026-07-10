import { useState } from "react"
import LanguageSelector from "../LanguageSelector/LanguageSelector"
import { languages } from "../../data/languages"
import { translateText } from "../../services/api"
import TranslationResult from "../TranslationResult/TranslationResult"
import VoiceControls from "../VoiceControls/VoiceControls"
import OCR from "../OCR/OCR"

function TranslatorForm() {
  const targetLanguages = languages.filter((lang) => lang.value !== "auto")

  const [sourceLanguage, setSourceLanguage] = useState("auto")
  const [targetLanguage, setTargetLanguage] = useState("en")
  const [text, setText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!text.trim()) {
      setError("Please enter text to translate.")
      return
    }
    if (sourceLanguage !== "auto" && sourceLanguage === targetLanguage) {
      setError("Source and target languages must be different.")
      return
    }
    setError("")
    setIsLoading(true)
    try {
      const result = await translateText(text, sourceLanguage, targetLanguage)
      setTranslatedText(result.translated_text)
    } catch {
      setError("Translation failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwapLanguages = () => {
    if (sourceLanguage === "auto") return
    const temp = sourceLanguage
    setSourceLanguage(targetLanguage)
    setTargetLanguage(temp)
    if (translatedText) {
      const tempText = text
      setText(translatedText)
      setTranslatedText(tempText)
    } else {
      setText("")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section id="language-selection">
          <LanguageSelector
            label="Source Language"
            name="source"
            options={languages}
            value={sourceLanguage}
            onChange={(event) => setSourceLanguage(event.target.value)}
          />
          <button type="button" onClick={handleSwapLanguages} disabled={sourceLanguage === "auto"}>Swap</button>
          <LanguageSelector
            label="Target Language"
            name="target"
            options={targetLanguages}
            value={targetLanguage}
            onChange={(event) => setTargetLanguage(event.target.value)}
          />
        </section>
        <section id="text-input">
          <label htmlFor="source-text">Text to Translate</label>
          <textarea
            id="source-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <VoiceControls onTranscript={setText} language={sourceLanguage === "auto" ? "en-US" : sourceLanguage} />
          <OCR onExtractedText={setText} />
        </section>
        <section id="actions">
          <button type="submit" disabled={isLoading}>{isLoading ? "Translating..." : "Translate"}</button>
          {error && <p>{error}</p>}
        </section>
      </form>
      <TranslationResult translatedText={translatedText} />
    </>
  )
}

export default TranslatorForm
