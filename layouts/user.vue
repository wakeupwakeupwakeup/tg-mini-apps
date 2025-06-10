<script lang="ts" setup>
const { top, bottom } = useScreenSafeArea();
</script>

<template>
	<div class="relative flex flex-col gap-6 h-full max-h-screen">
		<header
			class="z-20 flex justify-center items-center"
			:style="{ paddingTop: `calc(${top} + 16px)` }"
		>
			<NuxtImg src="/images/logo.svg" alt="logo" width="96" height="28" />
		</header>
		<UserProfile />
		<main class="flex flex-col gap-6 pb-2 h-full overflow-y-auto">
			<slot />
		</main>
		<nav
			class="z-20 flex justify-between px-8 pt-4 glance-border-top"
			:style="{
				paddingBottom: `calc(${bottom} + 16px)`,
			}"
		>
			<UINavButton to="/" />
			<UINavButton to="/" />
			<UINavButton to="/" />
			<UINavButton to="/" />
			<DonationModal />
		</nav>
	</div>
</template>

<style>
body {
	@apply bg-[#282C34] text-[#CEDCFF];
}
</style>
