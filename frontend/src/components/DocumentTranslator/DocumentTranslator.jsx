import { useRef, useState } from "react"
import * as pdfjsLib from "pdfjs-dist"
import mammoth from "mammoth"

pdfjsLib.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString()

function DocumentTranslator({ onExtractedText }) {
  const fileInputRef = useRef(null)
  const [error, setError] = useState("")
  const handleDocumentSelect = async (event) => {
    setError("")
    const file = event.target.files[0]
    if (!file) {
      setError("Please select a document.")
      return
    }

    if (file.type === "text/plain") {
      try {
        const text = await file.text()
        onExtractedText(text)
      } catch {
        setError("Failed to read the document.")
      }
    }

    if (file.type === "application/pdf") {
      try {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        let text = ""
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber)
          const content = await page.getTextContent()
          text += content.items.map((item) => item.str).join(" ") + "\n"
        }
        onExtractedText(text)
      } catch {
        setError("Failed to read the PDF document.")
      }
    }

    if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      try {
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.extractRawText({
          arrayBuffer
        })
        onExtractedText(result.value)
      } catch {
        setError("Failed to read the DOCX document.")
      }
    }
  }

  return (
    <div>
      <button type="button" onClick={() => fileInputRef.current.click()}>Upload Document</button>
      {error && <p>{error}</p>}
      <input type="file" accept=".pdf,.docx,.txt" ref={fileInputRef} onChange={handleDocumentSelect} hidden />
    </div>
  )
}

export default DocumentTranslator
