<template>
  <div
    class="flex flex-col my-auto max-w-[700px] items-center space-y-3 mx-5 md:space-x-5"
  >
    <div class="flex flex-col items-center md:space-x-5 md:flex-row space-y-3">
      <ResponsiveImage
        :srcWebp="pfpWebp"
        :srcFallback="pfpFallback"
        alt="Profile Picture"
        :breakpoints="[
          { maxWidth: 640, size: 100 },
          { maxWidth: 768, size: 150 },
          { maxWidth: 1024, size: 200 },
        ]"
        styles="w-auto max-w-[200px] rounded-[10%]"
        loading="eager"
      />

      <span class="flex-1">
        {{ t("about-description") }}
      </span>
    </div>

    <span class="text-left w-[100%]">
      <span
        >{{ t("birthday") }}: {{ birthday.toLocaleDateString(locale) }}</span
      >
      <br />
      <span>{{ t("age") }}: {{ getYearsSince(birthday) }} </span>
    </span>

    <a href="/">{{ t("home") }}</a>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import pfpFallback from "@/assets/images/pfp.jpg?w=150&as=url";
import pfpWebp from "@/assets/images/pfp.jpg?w=250;200;150&format=webp&as=srcset";
import { useMeta } from "@/composables/useMeta";

const { t, locale } = useI18n();

const birthday = new Date("7/11/2004");

useMeta({
  title: () => t("about"),
  description: () => t("about-meta-description"),
});

const getYearsSince = (dateOfBirth: Date, dateToCalculate = new Date()) => {
  const dob = new Date(dateOfBirth).getTime();
  const dateToCompare = new Date(dateToCalculate).getTime();
  const age = (dateToCompare - dob) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.floor(age);
};
</script>
