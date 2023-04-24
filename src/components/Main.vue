<script setup lang="ts">
import Input from "@/components/Input.vue";
import Output from "@/components/Output.vue";
</script>

<template>
  <div class="container">
    <div class="grid">
      <div class="row">
        <Output></Output>
      </div>
      <div class="row">
        <Input></Input>
      </div>
      <footer class="footer has-background-dark has-text-warning mt-5">
        <div class="content has-text-right">
          <p>
            <strong class="has-text-warning"> Powered by </strong>
            <a href="https://sunrisesunset.io">SunriseSunset.io</a> and
            <a href="https://positionstack.com/"> positionstack</a>.
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
.card {
  text-align: start;
  min-height: 320px;
  min-width: 620px;
}

label.label-lg {
  min-width: 150px;
}

.icon {
  justify-content: start;
}

.no-margin-bottom {
  margin-bottom: 0px;
}

footer {
  padding-bottom: 1.5rem;
}

.is-purple {
  background-color: #646cff;
}

@media only screen and (max-width: 700px) {
  .card {
    min-width: 100%;
  }

  #app {
    max-width: -webkit-fill-available;
  }
}
</style>
