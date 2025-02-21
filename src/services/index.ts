import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Function to refresh the access token
const refreshAccessToken = async (refreshToken: string) => {
  const url = `${process.env.API_BASE_URL}/auth/refresh-token`
  const body = { refresh_token: refreshToken }
  const { data } = await axios.post(url, body)
  localStorage.setItem("@Auth:accessToken", data.access_token)
  localStorage.setItem("@Auth:refreshToken", data.refresh_token)
  return data.access_token
}

// Request Interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const token = localStorage.getItem("@Auth:accessToken")
    console.log(token, "token from access token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers["x-timezone"] = timezone
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("@Auth:refreshToken")
      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken)
          error.response.config.headers["Authorization"] =
            `Bearer ${newAccessToken}`
          return axios(error.response.config)
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError)
        }
      }
    }
    return Promise.reject(error)
  },
)

export default api
