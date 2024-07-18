<script setup lang="ts">
defineProps<{
  thickness?: number
  padding?: number
}>()
</script>

<template>
  <div
    class="divider"
    :style="{
      borderWidth: `${thickness}px`,
      padding: `${padding}px 0px`
    }"
  ></div>
</template>

<style scoped>
.divider {
  border-color: var(--color-border);
  border-top-style: solid;
  width: 100%;
}
</style>
