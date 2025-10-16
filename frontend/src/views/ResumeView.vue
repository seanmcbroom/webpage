<template>
  <div class="w-full h-screen p-4 flex justify-center items-center">
    <embed
      :src="resume"
      class="w-full h-full max-w-[1000px] max-h-[1500px]"
      type="application/pdf"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import resume from "@/assets/files/Sean McBroom Resume 2025Q3.pdf";
import { useMeta } from "@/composables/useMeta";

const { t } = useI18n();

useMeta({
  title: t("resume"),
  description: t("resume-meta-description"),
});
</script>
