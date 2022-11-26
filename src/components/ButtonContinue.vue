<script setup>
defineProps({
  text: String,
  click: Function,
});
</script>

<template>
  <button class="button" @click="click">{{ text }}</button>
</template>

<style scoped>
.button {
  background-color: #ed2a2f;
  border: none;
  color: white;
  padding: 15px 25px;
  text-decoration: none;
  font-size: 13px;
  border-radius: 40px;
  font-weight: bold;
}
</style>
