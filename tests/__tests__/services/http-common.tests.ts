import HttpService from "@/services/http-common.service";

describe("HttpService", () => {
  it("should get correct base url", () => {
    // arrange
    const port = process.env.SERVER_PORT || 7043;

    // act
    const result = HttpService.getBaseUrl();

    // assert
    expect(result).toBe("https://localhost:7043/");
  });

  it("should get client with correct base url", () => {
    // arrange
    const spyGetBaseUrl = jest.spyOn(HttpService, "getBaseUrl");

    // act
    const result = HttpService.getClient().defaults.baseURL;

    // assert
    const expectedResult = "https://localhost:7043/";

    expect(spyGetBaseUrl).toHaveBeenCalledTimes(1);
    expect(result).toBe(expectedResult);

    // rest
    spyGetBaseUrl.mockClear();
  });
});
