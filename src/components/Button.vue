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
  background-color: #495259;
  border: none;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  font-size: 12px;
  border-radius: 5px;
  font-weight: bold;
}
</style>
