<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ board.title }}</div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
const board = ref({});

onBeforeMount(() => {
  fetch(`/api/board`)
    .then((res) => res.json())
    .then((data) => (board.value = data));
}); // 운영모드에서는 동작하지 않기 때문에 404 에러가 뜨는거임.
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
