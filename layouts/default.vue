<template>
	<div class="relative flex flex-col h-full max-h-screen">
		<VHeader />
		<main class="flex flex-col gap-6 mt-6 pb-2 h-full overflow-y-auto">
			<slot />
		</main>
	</div>
</template>

<style scoped>
body {
	@apply bg-[#282C34] text-[#CEDCFF];
}
</style>
