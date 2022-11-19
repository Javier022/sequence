<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <div class="card">
    <h1 class="card__title">{{ title }}</h1>
    <div class="card__body">
      <slot></slot>
    </div>
    <div class="card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
}

.card__footer {
  display: flex;
  justify-content: center;
}
</style>
