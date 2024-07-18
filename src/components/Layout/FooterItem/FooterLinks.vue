<script setup lang="ts">
interface Link {
  id: number
  text: string
  url: string
}

defineProps({
  title: String,
  links: Array<Link>
})
</script>

<template>
  <div class="footer-list">
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="link in links" :key="link.id">
        <a :href="link.url" target="_blank">{{ link.text }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.footer-list {
  font-weight: 600;
}

.footer-list h3 {
  font-weight: 700;
}

.footer-list ul {
  list-style-type: none;
  margin-top: 5px;
  margin-bottom: 0;
  padding: 0;
}

.footer-list li {
  margin-bottom: 5px;
}

.footer-list li:hover {
  filter: brightness(2);
}
</style>
