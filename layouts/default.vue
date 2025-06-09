<script lang="ts" setup>
const { top, bottom } = useScreenSafeArea();
</script>

<template>
	<div class="relative flex flex-col h-full max-h-screen">
		<header
			class="flex justify-center items-center"
			:style="{ paddingTop: `calc(${top} + 16px)` }"
		>
			<NuxtImg src="/images/logo.svg" alt="logo" width="96" height="28" />
		</header>
		<main class="flex flex-col gap-6 mt-6 h-full overflow-y-auto">
			<UICard class="flex gap-4">
				<NuxtImg
					src="/images/avatar.jpg"
					width="64"
					height="64"
					class="rounded-md"
				/>
				<div class="flex flex-col flex-1 justify-between">
					<div class="flex justify-between items-center">
						<span>John Doe</span>
						<span class="inline-flex items-center gap-1.5"
							><SvgoTgStar />Stars: 150</span
						>
					</div>
					<div class="flex justify-between items-center">
						<span>Total games: 24</span>
						<span>Wins: 12</span>
					</div>
				</div>
			</UICard>
			<slot />
		</main>
		<nav
			class="z-20 flex justify-between"
			:style="{
				paddingBottom: `calc(${bottom} + 24px)`,
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
