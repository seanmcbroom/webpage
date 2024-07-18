<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="footer-disclaimer">
    <p id="copyright-disclaimer">&copy; {{ currentYear }}.<br />All rights reserved.</p>
  </div>
</template>

<style scoped>
.footer-disclaimer {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}

.footer-disclaimer > .logo {
  height: 25%;
  margin-right: 15px;
}

@media (min-width: 1024px) {
}
</style>
