<script setup lang="ts">
defineProps<{
  message?: string;
}>();
</script>

<template>
  <div
    class="text-white flex items-center justify-center min-h-[40px] min-w-[100%] bg-[var(--color-accent)] px-4"
  >
    <a>{{ message }}</a>
  </div>
</template>
