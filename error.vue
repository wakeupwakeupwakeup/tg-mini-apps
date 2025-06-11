<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
	error: Object as () => NuxtError,
});
</script>

<template>
	<div class="flex flex-col justify-between h-full">
		<VHeader />
		<div class="text-center">
			<p class="font-medium">Oops... Something went wrong</p>
			<p>{{ error.statusMessage }}</p>
		</div>
		<NuxtImg src="/images/error.png" width="375" height="365" />
	</div>
</template>

<style scoped>
body {
	@apply bg-[#BEC1C7] text-[#462D28];
}
</style>
