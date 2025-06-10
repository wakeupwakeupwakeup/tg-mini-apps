<script setup lang="ts">
import {
	init,
	isTMA,
	mountViewport,
	requestFullscreen,
	retrieveLaunchParams,
	swipeBehavior,
	unmountSwipeBehavior,
	unmountViewport,
	viewportMountError,
} from "@telegram-apps/sdk-vue";

tryOnMounted(async () => {
	if (!isTMA()) navigateTo("/wrong-environment");
	init({
		acceptCustomStyles: false,
	});
	const { tgWebAppData } = retrieveLaunchParams();
	const userStore = useUserStore();

	if (tgWebAppData && tgWebAppData.user) {
		userStore.setUsername(tgWebAppData.user.username);
		userStore.setAvatar(tgWebAppData.user.photo_url);
	}
	await userStore.fetchBalance();

	if (mountViewport.isAvailable()) {
		try {
			await mountViewport();
			await requestFullscreen();
		} catch {
			viewportMountError();
		}
	}

	if (swipeBehavior.isSupported()) {
		swipeBehavior.mount();
		swipeBehavior.disableVertical();
	}
});
tryOnUnmounted(() => {
	unmountViewport();
	unmountSwipeBehavior();
});
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
