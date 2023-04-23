import axios, { AxiosInstance } from "axios";

class HttpService {
  private port = process.env.SERVER_PORT || 7043;
  private x_api_key = process.env.X_API_KEY || "1234Test";
  private baseUrl_LocalHost = `https://localhost:${this.port}/`;
  private baseUrl = process.env.SERVER_API_BASE_URL || this.baseUrl_LocalHost;

  getBaseUrl = () => {
    return this.baseUrl;
  };

  getClient = () => {
    const apiClient: AxiosInstance = axios.create({
      baseURL: this.getBaseUrl(),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.x_api_key,
      },
    });

    return apiClient;
  };
}

export default new HttpService();
