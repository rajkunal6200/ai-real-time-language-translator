import { useState } from "react"
import "./TranslationResult.css"

function TranslationResult({ translatedText }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(translatedText)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <section>
      <h2>Translation Result</h2>
      <textarea readOnly value={translatedText} />
      <button type="button" onClick={handleCopy} disabled={!translatedText}>{copied ? "Copied!" : "Copy"}</button>
      <button type="button" onClick={handleSpeak} disabled={!translatedText}>Speak</button>
    </section>
  )
}

export default TranslationResult
