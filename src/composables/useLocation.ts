import { Ref, reactive, toRef } from "vue";
import { IDDLocationDatas, ILocationDatas } from "@/interfaces/api.interfaces";
import ApiService from "@/services/api.service";
import { Nullable } from "@/types/common.types";
import { AxiosError } from "axios";

interface LocationState {
  isLoading: boolean;
  locations: ILocationDatas;
  dd_locations: IDDLocationDatas;
  error: Nullable<string>;
}

const globalState = reactive<LocationState>({
  isLoading: false,
  locations: [],
  dd_locations: [],
  error: null,
});

export default function useLocation(): {
  getLocation: (location: string) => Promise<void>;
  isLoading: Ref<boolean>;
  locations: Ref<ILocationDatas>;
  dd_locations: Ref<IDDLocationDatas>;
  error: Ref<Nullable<string>>;
} {
  const getLocation = async (location: string) => {
    globalState.isLoading = true;
    globalState.error = null;

    try {
      const res = await ApiService.getLocationData(location);
      switch (res.status) {
        case 200:
          globalState.locations = res.data.filter(
            (d) => d.latitude != null && d.longitude != null
          );
          globalState.dd_locations = globalState.locations.map((l) => ({
            id: l.id,
            name: l.name,
            region: l.region,
            continent: l.continent,
            country: l.country,
          }));
          break;
        case 204:
          globalState.error =
            "The location you entered rendered no results. Please change!";
          break;
      }
    } catch (error) {
      const axiosError = (error as AxiosError).response;

      console.log("ERROR", error, axiosError);
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
        console.error(`Error in useLocation - getLocationData: ${error}`);
      }
    }

    globalState.isLoading = false;
  };

  return {
    getLocation,
    isLoading: toRef(globalState, "isLoading"),
    locations: toRef(globalState, "locations"),
    dd_locations: toRef(globalState, "dd_locations"),
    error: toRef(globalState, "error"),
  };
}
