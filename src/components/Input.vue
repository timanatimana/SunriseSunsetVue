<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import dayJs from "@/libs/dayjs";
import useLocation from "@/composables/useLocation";
import useSunriseSunset from "@/composables/useSunriseSunset";

const {
  getLocation,
  isLoading: isLoadingLocation,
  locations,
  dd_locations,
  error: locationError,
} = useLocation();

const { getSunriseSunset, isLoading: isLoadingSunriseSunset } =
  useSunriseSunset();

const pickedLocationId = ref(1);
const pickedLocation = computed(() =>
  locations.value.find((l) => l.id == pickedLocationId.value)
);
const pickedDate = ref<Date>(dayJs().toDate());

const location = ref("");

const locationValid = computed(() => {
  if (location.value.length === 0) return null;
  if (location.value.length > 3) return true;
  return false;
});

const coordinatesValid = computed(() => dd_locations.value.length > 0);

const format = () => {
  const day = pickedDate.value.getDate();
  const month = pickedDate.value.getMonth() + 1;
  const year = pickedDate.value.getFullYear();

  return `Selected date is ${day}/${month}/${year}`;
};
</script>

<template>
  <div class="row">
    <div class="card has-background-light">
      <div class="card-content">
        <div class="field columns is-tablet">
          <div class="column is-three-quarters">
            <span class="icon is-small is-left">
              <font-awesome-icon :icon="['fas', 'globe']" />
              <label class="label is-expanded pl-2">Location</label>
            </span>
            <div class="field is-grouped">
              <p class="control is-expanded has-icons-right">
                <input
                  v-model="location"
                  class="input"
                  :class="
                    locationValid === null
                      ? ''
                      : !locationValid
                      ? 'is-danger'
                      : 'is-success'
                  "
                  type="text"
                  placeholder="Text input"
                />
                <span
                  v-if="locationValid !== null && !locationValid"
                  class="icon is-small is-right has-text-danger-dark"
                >
                  <font-awesome-icon :icon="['fas', 'xmark']" />
                </span>
                <span
                  v-else-if="locationValid === null"
                  class="icon is-small is-right"
                >
                </span>
                <span
                  v-else
                  class="icon is-small is-right has-text-success-dark"
                >
                  <font-awesome-icon :icon="['fas', 'check']" />
                </span>
              </p>
            </div>
            <p
              v-if="locationValid !== null && !locationValid"
              class="help is-danger"
            >
              Please enter a valid location (min 3 letters)"
            </p>
            <p v-else-if="locationError !== null" class="help is-danger">
              {{ locationError }}
            </p>
            <p v-else>&nbsp</p>
          </div>
          <div class="column is-align-self-center mb-2">
            <p class="control">
              <button
                @click="getLocation(location)"
                :disabled="!locationValid || locationValid == null"
                class="button is-small is-success mt-1"
                :class="isLoadingLocation ? 'is-loading' : ''"
              >
                Find location
              </button>
            </p>
          </div>
        </div>

        <div class="field">
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="['fas', 'hand-point-right']" />
            <label class="label label-lg pl-2">Pick location: </label>
          </span>
          <div class="control">
            <div class="select is-small">
              <select v-model="pickedLocationId">
                <option v-for="location in dd_locations" :value="location.id">
                  {{
                    Object.values(location)
                      .filter(
                        (v) => v != null && typeof v == "string" && v.length > 0
                      )
                      .join(", ")
                  }}
                </option>
              </select>
            </div>
          </div>
          <div class="field mt-5">
            <span class="icon is-small is-left">
              <font-awesome-icon :icon="['fas', 'hand-point-right']" />
              <label class="label label-lg pl-2">Pick date: </label>
            </span>
            <VueDatePicker
              v-model="pickedDate"
              :enable-time-picker="false"
              :format="format"
              required
            ></VueDatePicker>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button
              @click="getSunriseSunset(pickedLocation, pickedDate)"
              :disabled="!coordinatesValid"
              class="button is-link is-purple"
              :class="isLoadingSunriseSunset ? 'is-loading' : ''"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
