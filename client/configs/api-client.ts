import { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import queryString from "query-string";
import axiosInstance from "./axios.config";

export default class ApiClient {
  static async get<T>(url: string, params?: object): Promise<AxiosResponse<T>> {
    const requestUrl = params ? `${url}?${queryString.stringify(params)}` : url;
    const response = await axiosInstance.get(requestUrl, {
      headers: await this.getHeaders(),
    });
    return response;
  }

  static async post<T>(
    url: string,
    data: object,
    params?: object,
  ): Promise<AxiosResponse<T>> {
    const requestUrl = params ? `${url}?${queryString.stringify(params)}` : url;
    const response = axiosInstance.post(requestUrl, data, {
      headers: await this.getHeaders(),
    });
    return response;
  }

  static async put(
    url: string,
    data: object,
    params?: object,
  ): Promise<AxiosResponse> {
    const requestUrl = params ? `${url}?${queryString.stringify(params)}` : url;
    const response = axiosInstance.put(requestUrl, data, {
      headers: await this.getHeaders(),
    });
    return response;
  }

  static async patch(
    url: string,
    data: object,
    params?: object,
  ): Promise<AxiosResponse> {
    const requestUrl = params ? `${url}?${queryString.stringify(params)}` : url;
    const response = axiosInstance.patch(requestUrl, data, {
      headers: await this.getHeaders(),
    });
    return response;
  }

  static async delete(url: string, params?: object): Promise<AxiosResponse> {
    const requestUrl = params ? `${url}?${queryString.stringify(params)}` : url;
    const response = axiosInstance.delete(requestUrl, {
      headers: await this.getHeaders(),
    });
    return response;
  }

  static async postFile(
    url: string,
    fileKey: string,
    file: File,
  ): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append(fileKey, file);
    const response = axiosInstance.post(url, formData, {
      headers: await this.getHeaders("multipart/form-data"),
    });
    return response;
  }

  private static async getHeaders(contentType: string = "application/json") {
    return {
      "Content-Type": contentType,
      accept: "application/json",
      authorization: await this.getToken(),
      "ngrok-skip-browser-warning": "69420",
    };
  }

  private static async getToken() {
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.token) {
        return (
          `Bearer ` + JSON.stringify(session?.token).replaceAll(/[",\\]/g, "")
        );
      } else {
        return [];
      }
    }
  }
}
