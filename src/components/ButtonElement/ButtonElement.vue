<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  text?: string
  href?: string
  onClick?: () => void
}>()
</script>

<template>
  <a class="button" :href="props.href" @click="props.onClick"> {{ props.text }} </a>
</template>

<style scoped>
.button {
  display: inline-block;
  background-color: var(--color-button);
  color: var(--color-button-text);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}

.button:hover {
  background-color: var(--color-button-hover);
}
</style>
