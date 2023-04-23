import useLocation from "@/composables/useLocation";
import { ILocationDatas } from "@/interfaces/api.interfaces";
import HttpService from "@/services/http-common.service";
import {
  getAxiosErrorResponse,
  getAxiosResponse,
} from "@tests/__data__/axiosResponse.data";
import axiosMock from "@tests/__mocks__/axios.mock";
import { nextTick } from "vue";

describe("useLocation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should load locations and dd_locations", async () => {
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
    const location = "TestLocation";

    const spyGetClient = jest
      .spyOn(HttpService, "getClient")
      .mockReturnValue(axiosMock);
    axiosMock.post.mockImplementationOnce(() => Promise.resolve(axiosResponse));

    // act and assert
    const { getLocation, locations, dd_locations } = useLocation();
    await getLocation(location);
    nextTick();

    // assert
    expect(spyGetClient).toHaveBeenCalledTimes(1);
    expect(locations.value).toStrictEqual(resData);
    expect(dd_locations.value.length).toBe(2);
  });

  it("should show errormessage 204", async () => {
    // arrange
    const axiosResponse = getAxiosResponse({}, 204);
    const location = "TestLocation";

    const spyGetClient = jest
      .spyOn(HttpService, "getClient")
      .mockReturnValue(axiosMock);
    axiosMock.post.mockImplementationOnce(() => Promise.resolve(axiosResponse));

    // act and assert
    const { getLocation, error } = useLocation();
    await getLocation(location);
    nextTick();

    // assert
    expect(spyGetClient).toHaveBeenCalledTimes(1);
    expect(error.value).toStrictEqual(
      "The location you entered rendered no results. Please change!"
    );
  });

  it("should show errormessage for 404", async () => {
    // arrange
    const axiosErrorResponse = getAxiosErrorResponse("404", "");
    const location = "TestLocation";

    const spyGetClient = jest
      .spyOn(HttpService, "getClient")
      .mockReturnValue(axiosMock);
    axiosMock.post.mockRejectedValueOnce(axiosErrorResponse);

    // act and assert
    const { getLocation, error } = useLocation();
    await getLocation(location);
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
    const location = "TestLocation";

    const spyGetClient = jest
      .spyOn(HttpService, "getClient")
      .mockReturnValue(axiosMock);
    axiosMock.post.mockRejectedValueOnce(axiosErrorResponse);

    // act and assert
    const { getLocation, error } = useLocation();
    await getLocation(location);
    nextTick();

    // assert
    expect(spyGetClient).toHaveBeenCalledTimes(1);
    expect(error.value).toStrictEqual(
      "Unfortunately, there occured an error while attempting to process your request. Please try again! errormessage: 400 - something went wrong"
    );
  });
});
