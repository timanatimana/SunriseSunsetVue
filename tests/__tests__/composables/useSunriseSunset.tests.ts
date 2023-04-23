import useSunriseSunset from "@/composables/useSunriseSunset";
import { ILocationData, ISunsetSunriseData } from "@/interfaces/api.interfaces";
import HttpService from "@/services/http-common.service";
import {
  getAxiosErrorResponse,
  getAxiosResponse,
} from "@tests/__data__/axiosResponse.data";
import axiosMock from "@tests/__mocks__/axios.mock";
import { nextTick } from "vue";

const pickedLocation: ILocationData = {
  id: 1,
  latitude: 0.0,
  longitude: 0.0,
  name: "zyx",
  region: "",
  country: "aaa",
  continent: "",
  label: "",
  timezoneString: "xyz",
};

const pickedDate: Date = new Date(2020, 3, 1);

describe("useSunsetSunrise", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should load sunriseSunsetData", async () => {
    // arrange
    const resData: ISunsetSunriseData = {
      sunrise: "123",
      sunset: "321",
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

    const response: ISunsetSunriseData = {
      ...resData,
      locationName: `${pickedLocation.name} (${pickedLocation.country})`,
      timezoneString: pickedLocation.timezoneString,
    };

    const axiosResponse = getAxiosResponse(resData, 200);

    const spyGetClient = jest
      .spyOn(HttpService, "getClient")
      .mockReturnValue(axiosMock);
    axiosMock.post.mockImplementationOnce(() => Promise.resolve(axiosResponse));

    // act and assert
    const { getSunriseSunset, sunriseSunsetData } = useSunriseSunset();
    await getSunriseSunset(pickedLocation, pickedDate);
    nextTick();

    // assert
    expect(spyGetClient).toHaveBeenCalledTimes(1);
    expect(sunriseSunsetData.value).toStrictEqual(response);
  });

  it("should show errormessage for 404", async () => {
    // arrange
    const axiosErrorResponse = getAxiosErrorResponse("404", "");

    const spyGetClient = jest
      .spyOn(HttpService, "getClient")
      .mockReturnValue(axiosMock);
    axiosMock.post.mockRejectedValueOnce(axiosErrorResponse);

    // act and assert
    const { getSunriseSunset, error } = useSunriseSunset();
    await getSunriseSunset(pickedLocation, pickedDate);
    nextTick();

    // assert
    expect(spyGetClient).toHaveBeenCalledTimes(1);
    expect(error.value).toStrictEqual(
      "Unfortunately, your request rendered no results. Please try again! errorcode: 404"
    );
  });

  it("should show errormessage for 400", async () => {
    // arrange
    const axiosErrorResponse = getAxiosErrorResponse(
      "400",
      "something went wrong"
    );

    const spyGetClient = jest
      .spyOn(HttpService, "getClient")
      .mockReturnValue(axiosMock);
    axiosMock.post.mockRejectedValueOnce(axiosErrorResponse);

    // act and assert
    const { getSunriseSunset, error } = useSunriseSunset();
    await getSunriseSunset(pickedLocation, pickedDate);
    nextTick();

    // assert
    expect(spyGetClient).toHaveBeenCalledTimes(1);
    expect(error.value).toStrictEqual(
      "Unfortunately, there occured an error while attempting to process your request. Please try again! errormessage: 400 - something went wrong"
    );
  });
});
