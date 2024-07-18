<script setup lang="ts">
import FooterDisclaimer from './FooterDisclaimer.vue'
import FooterLinks from './FooterLinks.vue'
</script>

<template>
  <div class="footer breakpoints">
    <div class="breakpoints">
      <FooterDisclaimer></FooterDisclaimer>
      <FooterLinks
        :title="`Socials`"
        :links="[
          { id: 1, text: 'Instagram', url: 'https://www.instagram.com/kirakirafox/' },
          { id: 2, text: 'Twitter', url: 'https://twitter.com/kirakirafox' },
          { id: 3, text: 'Github', url: 'https://github.com/seanmcbroom' }
        ]"
      ></FooterLinks>
    </div>
  </div>
</template>

<style scoped>
.footer {
  height: 200px;
  width: 100%;
  margin-top: auto;
  user-select: none;
  background-color: var(--color-background-soft);
}

.footer > .breakpoints {
  height: 100%;

  gap: 50px;
}

.footer > .breakpoints > .footer-list {
  margin-left: auto;
}
</style>
