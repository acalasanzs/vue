<script setup>
defineProps(["title", "thumbnail", "albumId", "no"]);
</script>
<template>
  <div
    class="container rounded rounded-2 bg-light shadow-sm position-relative w-100 h-100"
  >
    <div
      class="rounded rounded-2 border border-1 position-absolute top-50 start-50 translate-middle w-75 h-75 pic"
      :style="'background-image: url(' + thumbnail + ')'"
    ></div>
    <div
      class="shadow-sm rounded-circle bg-primary d-flex justify-content-center align-items-center text-light indicator"
    >
      {{ albumId }}
    </div>
    <div
      class="shadow-sm rounded-circle bg-success d-flex justify-content-center align-items-center text-light indicator2"
    >
      {{ no }}
    </div>
  </div>
</template>

<style>
.pic {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  object-fit: cover;
}
.indicator,
.indicator2 {
  position: absolute;
  left: -0.875rem;
  top: -0.875rem;
  font-size: 1rem;
  width: 1.75rem;
  height: 1.75rem;
  font-size: 0.875rem;
  line-height: 1.75rem;
  vertical-align: middle;
}
.indicator2 {
  right: -0.875rem;
  left: auto;
}
</style>
