import { handleFormSubmission } from '../server/formHandler.js'

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }

  try {
    const result = await handleFormSubmission(req)
    if (result.headers) {
      for (const [key, val] of Object.entries(result.headers)) {
        res.setHeader(key, val)
      }
    }
    return res.status(result.status).json(result.body)
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred. Please try again.',
    })
  }
}
