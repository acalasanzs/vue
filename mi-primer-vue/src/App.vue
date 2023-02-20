<script setup>
import { ref, computed } from "vue";

const count = ref(0);
const favoritos = ref([]);
const change = (step) => {
  count.value += step;
};
const reset = () => {
  const res = 0;
  count.value = res;
};
const reglas = computed(() => {
  if (count.value < 0) {
    return "negative";
  } else if (count.value > 0) {
    return "positive";
  } else {
    return "reset";
  }
});
const exists = computed(() => {
  return favoritos.value.some((e) => e === count.value);
});
const add = () => {
  favoritos.value.push(count.value);
  console.log(favoritos);
};
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <h2 :class="reglas">{{ count }}</h2>
      <div class="container2">
        <button @click="change(-1)">-1</button>
        <button @click="change(+1)">+1</button>
        <button @click="reset">X</button>
        <button @click="add" :disabled="exists">❤️</button>
      </div>
    </div>
    <ul>
      <li v-for="(fav, index) in favoritos" :key="index">
        {{ fav }}
      </li>
    </ul>
  </div>
</template>
<style>
body > div {
  width: 100%;
  height: 100%;
}
h2 {
  display: block;
}
ul {
  font-size: 1rem;
  position: absolute;
  top: 2rem;
  left: 2rem;
}
.container {
  width: 25%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 5rem;
}
.container2 {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: center;
}
button {
  font-size: 1.5rem;
  background: none;
  outline: none;
  color: aquamarine;
  border: none;
  cursor: pointer;
}
button[disabled] {
  opacity: 0.1;
}
.reset {
  color: antiquewhite;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>
