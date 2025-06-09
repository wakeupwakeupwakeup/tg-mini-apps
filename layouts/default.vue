<script lang="ts" setup>
const { top } = useScreenSafeArea();
</script>

<template>
	<div class="flex flex-col h-full">
		<header
			class="flex justify-center items-center"
			:style="{ paddingTop: top + 'px' }"
		>
			<NuxtImg src="/images/logo.svg" alt="logo" width="96" height="28" />
		</header>
		<main class="h-full">
			<slot />
		</main>
	</div>
</template>
