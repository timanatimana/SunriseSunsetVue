import {
  ILocationDatas,
  ISunsetSunriseData,
  ISunsetSunriseReqData,
} from "@/interfaces/api.interfaces";
import ApiService from "@/services/api.service";
import HttpService from "@/services/http-common.service";
import { getAxiosResponse } from "@tests/__data__/axiosResponse.data";
import axiosMock from "@tests/__mocks__/axios.mock";

describe("ApiService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should load location data from api", async () => {
    // arrange
    const resData: ILocationDatas = [
      {
        id: 1,
        latitude: 0.0,
        longitude: 0.0,
        name: "",
        region: "",
        country: "",
        continent: "",
        label: "",
        timezoneString: "",
      },
      {
        id: 2,
        latitude: 0.0,
        longitude: 0.0,
        name: "",
        region: "",
        country: "",
        continent: "",
        label: "",
        timezoneString: "",
      },
    ];

    const axiosResponse = getAxiosResponse(resData, 200);

    const location: string = "Testlocation";

    const spyGetClient = jest
      .spyOn(HttpService, "getClient")
      .mockReturnValue(axiosMock);
    axiosMock.post.mockImplementationOnce(() => Promise.resolve(axiosResponse));

    // act and assert
    await expect(ApiService.getLocationData(location)).resolves.toEqual(
      axiosResponse
    );

    // assert
    expect(spyGetClient).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(
      `/Positionstack?location=${location}`
    );
  });

  it("should load sunrise sunset data from api", async () => {
    // arrange
    const resData: ISunsetSunriseData = {
      sunrise: "",
      sunset: "",
      firstLight: "",
      lastLight: "",
      dawn: "",
      dusk: "",
      solarNoon: "",
      goldenHour: "",
      dayLength: "",
      timezone: 1,
      timezoneString: "",
      dateString: "",
      locationName: "",
    };

    const axiosResponse = getAxiosResponse(resData, 200);

    const payload: ISunsetSunriseReqData = {
      coordinates: { latitude: 0.0, longitude: 0.0 },
      timezone: 1,
      dateString: "",
    };

    const spyGetClient = jest
      .spyOn(HttpService, "getClient")
      .mockReturnValue(axiosMock);
    axiosMock.post.mockImplementationOnce(() => Promise.resolve(axiosResponse));

    // act and assert
    await expect(ApiService.getSunriseSunsetData(payload)).resolves.toEqual(
      axiosResponse
    );

    // assert
    expect(spyGetClient).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith("/SunriseSunset", payload);
  });
});
