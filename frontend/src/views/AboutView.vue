<template>
  <div
    class="flex flex-col my-auto max-w-[700px] items-center space-y-3 mx-5 md:space-x-5"
  >
    <div class="flex flex-col items-center md:space-x-5 md:flex-row">
      <img
        :src="pfp.src"
        :srcset="pfp.srcset"
        sizes="(max-width: 150px) 100, 50px"
        class="md:w-[150px] rounded-[10%]"
        alt="Profile Picture"
      />

      <span>
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

import pfp from "@/assets/images/pfp.jpg?w=150;100;50&format=webp";
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
