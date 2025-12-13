import axios from 'axios';

const getAxiosInstance = (baseURL?: string) => {
  return axios.create({
    baseURL,
    timeout: 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

/**
 * Server-side axios instance
 */
export const serverAxios = getAxiosInstance(process.env.API_BASE_URL);

/**
 * Client-side axios instance
 * @requires full URL in requests
 */
export const clientAxios = getAxiosInstance();
