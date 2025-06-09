<script lang="ts" setup>
const { top } = useScreenSafeArea();
</script>

<template>
	<div class="relative flex flex-col h-full max-h-screen">
		<header
			class="z-20 flex justify-center items-center"
			:style="{ paddingTop: `calc(${top} + 16px)` }"
		>
			<NuxtImg src="/images/logo.svg" alt="logo" width="96" height="28" />
		</header>
		<main class="flex flex-col gap-6 mt-6 pb-2 h-full overflow-y-auto">
			<slot />
		</main>
	</div>
</template>
