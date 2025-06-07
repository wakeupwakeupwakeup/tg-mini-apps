<script lang="ts" setup>
defineProps<{
  label: string;
}>();
</script>

<template>
  <button
    class="bg-[#CEDCFF]/25 hover:bg-[#CEDCFF] p-1.5 rounded-md font-medium hover:text-[#282C34] transition-colors duration-200"
  >
    {{ label }}
  </button>
</template>
