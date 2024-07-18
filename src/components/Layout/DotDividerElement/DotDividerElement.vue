<template>
  <div class="dot-divider">
    <span class="dot" :style="{ width: size, height: size }"></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  size?: number
}>()
</script>

<style scoped>
.dot-divider {
  display: flex;
  align-items: center;
}

.dot {
  width: 3px;
  height: 3px;
  background-color: var(--color-text);
  border-radius: 50%;
  margin: 0 4px;
}
</style>
