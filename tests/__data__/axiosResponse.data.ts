import { AxiosResponse, AxiosHeaders, AxiosError } from "axios";

function getAxiosResponse(data: any, status: number): AxiosResponse<any> {
  return {
    data: data,
    status: status,
    request: null,
    config: { headers: new AxiosHeaders() },
    headers: new AxiosHeaders(),
    statusText: "",
  };
}

function getAxiosErrorResponse(code: string, message: string): AxiosError<any> {
  return new AxiosError(
    message,
    code,
    { headers: new AxiosHeaders() },
    {},
    {
      data: { errors: [{ detail: "a" }] },
      status: parseInt(code),
      statusText: message,
      headers: {},
      config: { headers: new AxiosHeaders() },
    }
  );
}

export { getAxiosResponse, getAxiosErrorResponse };
