<script setup>
import { onMounted, ref } from "vue";
import SuperPost from "@/components/SuperPost.vue";
import SpinnerCircle from "@/components/SpinnerCircle.vue";
const delay = 100;
const quantity = ref(1);
const Cquantity = ref(clear());
const fin = ref(quantity.value);
const inicio = ref(0);
const loaded = ref(false);
const opacity = ref(0);
const opacityN = ref(0);
const disabled = ref(false);
let overflow = false;
function clear() {
  return `repeat( ${Math.floor(Math.sqrt(quantity.value))}, 1fr)`;
}
const change = (val) => {
  fin.value += parseInt(val) - quantity.value;
  quantity.value = parseInt(val);
  update();
  Cquantity.value = clear();
};
const methods = {
  next() {
    inicio.value += quantity.value;
    fin.value += quantity.value;
  },
  prev() {
    inicio.value -= quantity.value;
    if (inicio.value === 0) {
      fin.value = quantity.value;
    } else {
      fin.value -= quantity.value - overflow;
    }
    overflow = 0;
    if (inicio.value < 0) inicio.value = 0;
  },
};
const { prev, next } = Object.fromEntries(
  Object.keys(methods).map((a) => [
    a,
    function (l) {
      l.call(methods);
      update();
    }.bind(undefined, methods[a]),
  ])
);

const data = ref([]);

const update = async () => {
  try {
    if (quantity.value) {
      disabled.value = true;
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_start=${inicio.value}${
          fin.value ? "&_end=" + fin.value : ""
        }`
      );
      data.value = await res.json();
      if (data.value.length < quantity.value) {
        overflow = quantity.value - data.value.length;
        fin.value -= quantity.value;
        fin.value += data.value.length;
      }
      disabled.value = false;
    } else {
      data.value = Array(0);
    }
  } catch {
  } finally {
    opacity.value = 0;
    setTimeout(() => {
      loaded.value = true;
      setTimeout(() => {
        opacityN.value = 1;
      }, delay);
    }, 0);
  }
};

onMounted(() => {
  setTimeout((_) => {
    opacity.value = 1;
    update();
    window.addEventListener("resize", update);
  }, 0);
});
</script>
<template>
  <div class="container py-4 d-flex gap-2 flex-column appear h-100">
    <div class="d-flex justify-content-around">
      <div class="d-flex align-items-center gap-2">
        <span class="fw-bold">{{ inicio }}</span>
        <button
          class="btn btn-outline-primary h-auto d-block my-2"
          @click="prev"
          :disabled="inicio <= 0 || disabled"
        >
          &langle; Prev
        </button>
      </div>
      <h1 class="text-center d-flex flex-column">
        APP Gallery <small class="h6">by Albert</small>
      </h1>
      <div class="d-flex align-items-center gap-2">
        <button
          class="btn btn-outline-primary h-auto d-block my-2"
          @click="next"
          :disabled="data.length < quantity || disabled"
        >
          Next &rangle;
        </button>
        <span class="fw-bold">{{ fin }}</span>
      </div>
    </div>
    <h2 class="w-100 text-center">{{ quantity }}</h2>
    <input
      type="range"
      class="form-range"
      max="100"
      @change="change($event.target.value)"
      :value="quantity"
    />
    <SpinnerCircle
      v-if="!loaded"
      class="mt-2 appear"
      :style="'opacity:' + opacity"
    />
    <div
      v-else
      class="grid justify-content-between align-items-center mx-2 my-2 h-100 w-100"
      :style="'grid-template-columns: ' + Cquantity + `;opacity: ${opacityN}`"
    >
      <SuperPost
        v-for="{ id, title, thumbnailUrl, albumId } in data"
        :key="id"
        :title="title"
        :thumbnail="thumbnailUrl"
        :albumId="albumId"
        :no="id"
      />
    </div>
  </div>
</template>
<style>
.grid {
  display: grid;
  gap: 2.25rem;
}
.appear {
  transition: opacity 0.5s ease-in;
}
html {
  width: 100vw;
  height: 100vh;
}
body {
  width: 100%;
  height: 100%;
}
</style>
