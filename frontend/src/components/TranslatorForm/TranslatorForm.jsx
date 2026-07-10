import { useState } from "react"
import LanguageSelector from "../LanguageSelector/LanguageSelector"
import { languages } from "../../data/languages"
import { translateText } from "../../services/api"
import TranslationResult from "../TranslationResult/TranslationResult"

function TranslatorForm() {
  const [sourceLanguage, setSourceLanguage] = useState("auto")
  const [targetLanguage, setTargetLanguage] = useState("en")
  const [text, setText] = useState("")
  const [translatedText, setTranslatedText] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await translateText(text, sourceLanguage, targetLanguage)
    setTranslatedText(result.translated_text)
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
          <LanguageSelector
            label="Target Language"
            name="target"
            options={languages}
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
        </section>
        <section id="actions">
          <button type="submit">Translate</button>
        </section>
      </form>
      <TranslationResult translatedText={translatedText} />
    </>
  )
}

export default TranslatorForm
