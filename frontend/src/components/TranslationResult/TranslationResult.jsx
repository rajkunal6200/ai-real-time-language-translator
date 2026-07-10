function TranslationResult({ translatedText }) {
  return (
    <section>
      <h2>Translation Result</h2>
      <textarea readOnly value={translatedText} />
    </section>
  )
}

export default TranslationResult
