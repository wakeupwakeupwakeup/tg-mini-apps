<script lang="ts" setup>
defineProps<{
  name: string;
  photo: string;
}>();
</script>

<template>
  <div>
    <NuxtImg :src="photo" class="rounded-md w-14 h-14" />
    <span class="text-sm">{{ name }}</span>
  </div>
</template>
