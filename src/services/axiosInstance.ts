import axios from 'axios';

type AxiosInstanceType = ReturnType<typeof axios.create>;
const baseURL = process.env.BASE_URL || 'https://petstore.swagger.io/v2';

const axiosInstance: AxiosInstanceType = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});

export default axiosInstance;
