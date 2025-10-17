<script setup lang="ts">
import { computed } from "vue";

type Breakpoint = { maxWidth: number; size: number | string };

const props = defineProps<{
  srcAvif?: string;
  srcWebp?: string;
  srcFallback: string;
  alt: string;
  breakpoints?: Breakpoint[];
  styles?: string;
  loading?: "lazy" | "eager";
}>();

const sizes = computed(() => {
  if (!props.breakpoints || props.breakpoints.length === 0) return undefined;
  return props.breakpoints
    .map((bp) => `(max-width: ${bp.maxWidth}px) ${bp.size}px`)
    .join(", ");
});
</script>

<template>
  <picture>
    <source v-if="srcAvif" :srcset="srcAvif" type="image/avif" :sizes="sizes" />
    <source v-if="srcWebp" :srcset="srcWebp" type="image/webp" :sizes="sizes" />
    <img
      :src="srcFallback"
      :sizes="sizes"
      :alt="alt"
      :loading="loading || 'lazy'"
      :class="styles"
    />
  </picture>
</template>

<style scoped>
picture {
  display: block;
  max-width: 100%;
}
img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
