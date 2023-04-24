import { Ref, reactive, toRef } from "vue";
import {
  ICoordinates,
  ILocationData,
  ISunsetSunriseData,
  ISunsetSunriseReqData,
  Timezone,
} from "@/interfaces/api.interfaces";
import ApiService from "@/services/api.service";
import { Nullable } from "@/types/common.types";
import cloneDeep from "lodash.clonedeep";
import dayJs from "@/libs/dayjs";
import { AxiosError } from "axios";

interface SunriseSunsetState {
  isLoading: boolean;
  sunriseSunsetData: Nullable<ISunsetSunriseData>;
  error: Nullable<string>;
}

const globalState = reactive<SunriseSunsetState>({
  isLoading: false,
  sunriseSunsetData: null,
  error: null,
});

export default function useSunriseSunset(): {
  getSunriseSunset: (
    pickedLocation: ILocationData | undefined,
    pickedDate: Nullable<Date>
  ) => Promise<void>;
  isLoading: Ref<boolean>;
  error: Ref<Nullable<string>>;
  sunriseSunsetData: Ref<Nullable<ISunsetSunriseData>>;
} {
  const getSunriseSunset = async (
    pickedLocation: ILocationData | undefined,
    pickedDate: Nullable<Date>
  ) => {
    if (pickedLocation === undefined) return;

    if (pickedDate === null) pickedDate = dayJs().toDate();

    globalState.isLoading = true;
    globalState.error = null;

    if (pickedLocation) {
      const pickedLocationClone = cloneDeep(pickedLocation);
      const locationName = pickedLocationClone
        ? `${pickedLocationClone.name} (${pickedLocationClone.country})`
        : "undefined";
      const coordinates: ICoordinates = {
        latitude: pickedLocation.latitude,
        longitude: pickedLocation.longitude,
      };

      const reqDate = dayJs(pickedDate);
      const reqData: ISunsetSunriseReqData = {
        coordinates: coordinates,
        dateString: reqDate.toISOString(),
        timezone: Timezone.UTC,
      };

      try {
        const res = await ApiService.getSunriseSunsetData(reqData);
        switch (res.status) {
          case 200:
            globalState.sunriseSunsetData = {
              ...res.data,
              locationName: locationName,
              timezoneString: pickedLocationClone.timezoneString,
            };
            break;
        }
      } catch (error) {
        const axiosError = (error as AxiosError).response;
        if (axiosError) {
          switch (axiosError.status) {
            case 404:
              globalState.error = `Unfortunately, your request rendered no results. Please try again! errorcode: ${axiosError.status}`;
              break;
            case 400:
              globalState.error = `Unfortunately, there occured an error while attempting to process your request. Please try again! errormessage: ${axiosError.status} - ${axiosError.statusText}`;
              break;
          }
        } else {
          console.error(
            `Error in useSunriseSunset - getSunriseSunset: ${error}`
          );
        }
      }

      globalState.isLoading = false;
    }
  };

  return {
    getSunriseSunset,
    isLoading: toRef(globalState, "isLoading"),
    error: toRef(globalState, "error"),
    sunriseSunsetData: toRef(globalState, "sunriseSunsetData"),
  };
}
