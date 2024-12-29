import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

function getSessionCookie() {
  const cookies = document.cookie.split(';');
  const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('__session='));
  if (sessionCookie) {
      return sessionCookie.split('=')[1];
  }
  return null;
}

// Thêm interceptor để tự động gắn token vào header
axiosInstance.interceptors.request.use(
    (config) => {
      const token = getSessionCookie();
      console.log(token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance 