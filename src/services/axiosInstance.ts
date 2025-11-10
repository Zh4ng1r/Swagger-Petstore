import axios from 'axios';

type AxiosInstanceType = ReturnType<typeof axios.create>;

class ApiClient {
  private instance: AxiosInstanceType;

  constructor(baseURL: string = process.env.BASE_URL || 'https://petstore.swagger.io/v2') {
    this.instance = axios.create({
      baseURL,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      timeout: 10000,
    });
  }

  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const response = await this.instance.get<T>(path, { params });
    return response.data;
  }

  async post<T>(path: string, data: any): Promise<T> {
    const response = await this.instance.post<T>(path, data);
    return response.data;
  }
}

export default new ApiClient();
