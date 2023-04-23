import {
  ILocationDatas,
  ISunsetSunriseData,
  ISunsetSunriseReqData,
} from "@/interfaces/api.interfaces";
import HttpService from "@/services/http-common.service";
import { AxiosRequestConfig } from "axios";

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

class ApiService {
  getLocationData(location: string): Promise<AxiosResponse<ILocationDatas>> {
    return HttpService.getClient().post<ILocationDatas>(
      `/Positionstack?location=${location}`
    );
  }

  getSunriseSunsetData(
    payload: ISunsetSunriseReqData
  ): Promise<AxiosResponse<ISunsetSunriseData>> {
    return HttpService.getClient().post<ISunsetSunriseData>(
      "/SunriseSunset",
      payload
    );
  }
}

export default new ApiService();
