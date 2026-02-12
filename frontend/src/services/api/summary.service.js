import axios from "axios"

const API_URL = "http://127.0.0.1:8000/api/summarize"

// Get all summaries
export const getAllSummaries = () => {
  return axios.get(API_URL)
}

// Create a new summary (send data)
export const createSummary = (data) => {
  return axios.post(API_URL, data)
}

// Get summary by ID
export const getSummaryById = (id) => {
  return axios.get(`${API_URL}/${id}`)
}
