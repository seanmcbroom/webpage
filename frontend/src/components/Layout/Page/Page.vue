<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col min-h-[calc(100vh)]">
    <main
      class="flex flex-col items-center h-[100%] min-h-[calc(100vh)] bg-[var(--color-background)]"
    >
      <slot></slot>
    </main>
  </div>
</template>