import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState(``)
  const [error, setError] = useState(null)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setError(null)
    setReview('')
    try {
      const response = await axios.post('/api/ai/get-review', { code })
      console.log('API Response:', response.data)

      let reviewText = ''

      // Handle different response formats
      if (response.data?.review) {
        reviewText = response.data.review
      } else if (typeof response.data === 'string') {
        reviewText = response.data
      } else if (response.data?.message) {
        reviewText = response.data.message
      } else {
        reviewText = response.data
      }

      // Filter out known AI model error lines
      if (typeof reviewText === 'string') {
        reviewText = reviewText
          .replace(/ERROR: Cannot read.*/gi, '')
          .replace(/this model does not support image input.*/gi, '')
          .trim()
      }

      if (!reviewText) {
        setError("The AI model encountered an issue processing your code. Please remove any images or non-text elements.")
      } else {
        setReview(reviewText)
      }
    } catch (err) {
      console.error('Review error:', err)
      let errorMsg = err.response?.data?.error || err.response?.data || err.message
      if (typeof errorMsg === 'string' && (errorMsg.includes('Cannot read') || errorMsg.includes('model does not support image input'))) {
        errorMsg = "The AI model does not support image input. Please remove any image references."
      }
      setError(errorMsg || 'An unknown error occurred')
    }
  }

  return (
    <>
      <main>
         <div className="left">
           <div className="code">
             <Editor
               value={code}
               onValueChange={code => setCode(code)}
               highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
               padding={10}
               style={{
                 fontFamily: '"Fira code", "Fira Mono", monospace',
                 fontSize: 16,
                 borderRadius: "5px",
                 minHeight: "300px",
                 width: "100%",
                 outline: 'none'
               }}
             />
           </div>
           <div
             onClick={reviewCode}
             className="review">Review</div>
         </div>
        <div className="right">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  )
}



export default App