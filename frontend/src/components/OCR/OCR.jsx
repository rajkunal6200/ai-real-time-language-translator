import { useEffect, useRef, useState } from "react"
import Tesseract from "tesseract.js"

function OCR({ onExtractedText }) {
  const fileInputRef = useRef(null)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [extractedText, setExtractedText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [imagePreview, setImagePreview] = useState("")

  useEffect(() => {
    if (!selectedImage) {
      setImagePreview("")
      return
    }

    const objectUrl = URL.createObjectURL(selectedImage)
    setImagePreview(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [selectedImage])

  const handleImageSelect = async (event) => {
    setError("")
    const file = event.target.files[0]
    if (!file) {
      setError("Please select an image.")
      return
    }
    setSelectedImage(file)
    setExtractedText("")
    setIsProcessing(true)
    try {
      const result = await Tesseract.recognize(file, "eng")
      setExtractedText(result.data.text)
      onExtractedText(result.data.text)
    } catch {
      setError("Failed to process image. Please try another image.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div>
      <button type="button" onClick={() => fileInputRef.current.click()} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Upload Image"}
      </button>
      {error && <p>{error}</p>}
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageSelect} hidden />
      {selectedImage && <img src={imagePreview} alt="Selected image" />}
    </div>
  )
}

export default OCR
