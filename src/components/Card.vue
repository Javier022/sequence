<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <div class="card">
    <div class="card__header">
      <slot name="header"></slot>
    </div>
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
  justify-content: center;
  padding: 20px 50px;
  width: 350px;
  height: 260px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}

.card__header {
  display: flex;
  justify-content: center;
}

.card__footer {
  display: flex;
  justify-content: center;
}
</style>
