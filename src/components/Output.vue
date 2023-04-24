<script setup lang="ts">
import { computed, ref } from "vue";
import dayJs from "@/libs/dayjs";
import useLocation from "@/composables/useLocation";
import useSunriseSunset from "@/composables/useSunriseSunset";

const { locations, error: locationError } = useLocation();

const { sunriseSunsetData, error: sunriseSunsetError } = useSunriseSunset();

const pickedLocationId = ref(1);
const pickedLocation = computed(() =>
  locations.value.find((l) => l.id == pickedLocationId.value)
);
</script>

<template>
  <div class="card has-background-warning mb-5">
    <header class="card-header">
      <div className="column">
        <div className="row has-background-dark has-text-light">
          <img className="ml-1 mr-2" alt="Vue logo" src="@/assets/vue.svg" />
          <img className="mr-2" alt="Vite logo" src="@/assets/vite.svg" />
          <img alt="TS logo" src="@/assets/ts_logo.svg" />
          <div>Vue 3 - Vite - Typescript</div>
        </div>
        <p v-if="pickedLocation && sunriseSunsetData" class="card-header-title">
          {{ sunriseSunsetData.locationName }} - on
          {{ dayJs(sunriseSunsetData.dateString).format("dddd, MMM D, YYYY") }}
        </p>
        <p v-else>&nbsp;</p>
      </div>
    </header>
    <div class="card-content">
      <div v-if="sunriseSunsetData" class="columns is-mobile">
        <div class="column">
          <div class="field is-align-items-center is-grouped">
            <div class="field no-margin-bottom">
              <label class="label is-small">Sunrise: </label>
              <div>
                <span class="icon is-small is-left">
                  <font-awesome-icon :icon="['fas', 'sun']" />
                  <label class="label label-lg mt-5 pl-2">{{
                    dayJs
                      .utc(
                        dayJs(sunriseSunsetData.dateString).format(
                          "dd/MM/YY "
                        ) + sunriseSunsetData.sunrise,
                        "dd/MM/YY HH:mm:ss"
                      )
                      .tz(sunriseSunsetData.timezoneString)
                      .format("h:mm:ss A")
                  }}</label>
                </span>
              </div>
              <div>
                <span class="icon is-small is-left">
                  <font-awesome-icon :icon="['fas', 'arrows-up-to-line']" />
                </span>
              </div>
            </div>
          </div>
          <div class="field is-align-items-center is-grouped">
            <div class="field no-margin-bottom">
              <label class="label is-small">Sunset: </label>
              <div>
                <span class="icon is-small is-left">
                  <font-awesome-icon :icon="['fas', 'arrows-down-to-line']" />

                  <label class="label label-lg mt-5 pl-2">{{
                    dayJs
                      .utc(
                        dayJs(sunriseSunsetData.dateString).format(
                          "dd/MM/YY "
                        ) + sunriseSunsetData.sunset,
                        "dd/MM/YY HH:mm:ss"
                      )
                      .tz(sunriseSunsetData.timezoneString)
                      .format("h:mm:ss A")
                  }}</label>
                </span>
              </div>
              <div>
                <span class="icon is-small is-left">
                  <font-awesome-icon :icon="['fas', 'sun']" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-align-items-center is-grouped">
            <div class="field no-margin-bottom">
              <label class="label is-small">Day length: </label>
              <div>
                <span class="icon is-small is-left">
                  <font-awesome-icon :icon="['fas', 'sun']" />
                  <label class="label label-lg mt-5 pl-2">{{
                    dayJs(sunriseSunsetData.dayLength, "HH:mm:ss").format(
                      "H:mm:ss"
                    )
                  }}</label>
                </span>
              </div>
              <div>
                <span class="icon is-small is-left">
                  <font-awesome-icon :icon="['fas', 'ruler']" />
                </span>
              </div>
            </div>
          </div>
          <div class="field is-align-items-center is-grouped">
            <div class="field no-margin-bottom">
              <label class="label is-small">Solar noon: </label>
              <div>
                <span
                  data-tooltip="Solar noon is defined as when the sun is at the local meridian and is highest in the sky."
                  class="icon label-lg is-small is-left has-tooltip-multiline"
                >
                  <font-awesome-icon :icon="['fas', 'sun']" />
                  <label class="label label-lg mt-5 pl-2">{{
                    dayJs
                      .utc(
                        dayJs(sunriseSunsetData.dateString).format(
                          "dd/MM/YY "
                        ) + sunriseSunsetData.solarNoon,
                        "dd/MM/YY HH:mm:ss"
                      )
                      .tz(sunriseSunsetData.timezoneString)
                      .format("h:mm:ss A")
                  }}</label>
                </span>
              </div>
              <div>
                <span class="icon is-small is-left">
                  <font-awesome-icon :icon="['fas', 'pizza-slice']" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="locationError !== null || sunriseSunsetError !== null"
        class="notification is-mobile has-background-dark has-text-danger has-text-centered mt-5"
      >
        <font-awesome-icon :icon="['fas', 'xmark']" />
        <font-awesome-icon :icon="['fas', 'xmark']" />
        <font-awesome-icon :icon="['fas', 'xmark']" />
        <p>{{ locationError ?? "" }} {{ sunriseSunsetError ?? "" }}</p>

        <font-awesome-icon :icon="['fas', 'xmark']" />
        <font-awesome-icon :icon="['fas', 'xmark']" />
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </div>
      <div
        v-else
        class="notification is-mobile has-background-dark has-text-warning has-text-centered mt-5"
      >
        <font-awesome-icon :icon="['fas', 'sun']" />
        <font-awesome-icon :icon="['fas', 'sun']" />
        <font-awesome-icon :icon="['fas', 'sun']" />
        <p>Hello! Please pick a location and date to get information about</p>
        <p>sunrise, sunset, day's length, and solar noon.</p>
        <font-awesome-icon :icon="['fas', 'sun']" /><font-awesome-icon
          :icon="['fas', 'sun']"
        /><font-awesome-icon :icon="['fas', 'sun']" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
