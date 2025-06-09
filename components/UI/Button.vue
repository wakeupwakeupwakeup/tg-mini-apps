<script lang="ts" setup>
const {variant = "default"} = defineProps<{
  label: string;
  variant?: "violet" | "orange" | "green" | "pink" | "default";
}>();

const classes = computed(() => [
  " p-1.5 rounded-md font-medium transition-colors duration-200",
  {
    "bg-[#CEDCFF]/25 hover:bg-[#CEDCFF] active:bg-[#CEDCFF] hover:text-[#282C34]": variant === "default",
    "green-gradient active:outline active:outline-[#49ad25]": variant === "green",
    "violet-gradient active:outline active:outline-[#9b26ef]": variant === "violet",
    "orange-gradient active:outline active:outline-[#f22626]": variant === "orange",
    "pink-gradient active:outline active:outline-[#f22835]": variant === "pink",
  }
])
</script>

<template>
  <button
    :class="classes"
  >
    {{ label }}
  </button>
</template>
