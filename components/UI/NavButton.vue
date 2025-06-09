<script lang="ts" setup>
const { to } = defineProps<{
	to: string;
}>();

// const iconComponent = computed(() => `svgo-${icon}`);
</script>

<template>
	<NuxtLink
		:to
		class="flex justify-center items-center bg-white rounded-md w-9 h-9"
	>
		{{ to }}
	</NuxtLink>
</template>
