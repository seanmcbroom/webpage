<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="psa-banner">
    <a>{{ message }}</a>
  </div>
</template>

<style scoped>
.psa-banner {
  background-color: var(--color-accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 35px;
  text-align: center;
  padding: 5px 0px;
}

@media (max-width: 900px) {
  .psa-banner {
    padding: 10px 10px;
  }
}
</style>
