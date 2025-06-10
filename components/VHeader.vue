<script lang="ts" setup>
const { top } = useScreenSafeArea();
</script>

<template>
	<header
		class="z-20 flex justify-center items-center"
		:style="{ paddingTop: `calc(${top} + 16px)` }"
	>
		<NuxtImg src="/images/logo.svg" alt="logo" width="96" height="28" />
	</header>
</template>
