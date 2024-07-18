<template>
  <Suspense>
    <template #default>
      <slot></slot>
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>
