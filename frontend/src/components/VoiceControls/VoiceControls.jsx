import { useState } from "react"

function VoiceControls({ onTranscript, language }) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const isSupported = Boolean(SpeechRecognition)

  const [error, setError] = useState("")
  const [isListening, setIsListening] = useState(false)

  if (!isSupported) {
    return <p>Voice input is not supported in this browser.</p>
  }

  const handleStartListening = () => {
    if (isListening) return
    setError("")
    const recognition = new SpeechRecognition()
    recognition.lang = language
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onTranscript(transcript)
    }
    recognition.onerror = () => {
      setError("Voice recognition failed. Please try again.")
    }
    recognition.onend = () => {
      setIsListening(false)
    }
    setIsListening(true)
    recognition.start()
  }

  return (
    <div>
      <button type="button" onClick={handleStartListening} disabled={isListening}>{isListening ? "Listening..." : "Start Listening"}</button>
      {error && <p>{error}</p>}
    </div>
  )
}

export default VoiceControls
