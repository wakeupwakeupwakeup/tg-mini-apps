<script setup lang="ts">
import {
	init,
	isTMA,
	mountViewport,
	retrieveRawInitData,
	requestFullscreen,
	retrieveLaunchParams,
	swipeBehavior,
	unmountSwipeBehavior,
	unmountViewport,
	viewportMountError,
} from "@telegram-apps/sdk-vue";

tryOnMounted(async () => {
	if (!isTMA()) navigateTo("/wrong-environment");
	try {
		init({
			acceptCustomStyles: false,
		});
		console.log("SDK initialized");
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			statusMessage: "Error initializing SDK",
		});
	}

	const { tgWebAppData } = retrieveLaunchParams();
	const userStore = useUserStore();

	const initDataRaw = retrieveRawInitData();

	if (initDataRaw) {
		try {
			await useAuth(initDataRaw);
		} catch (error) {
			console.error(error);
			throw createError({
				statusCode: 401,
				statusMessage: "Unauthorized",
			});
		}
	} else {
		throw createError({
			statusCode: 401,
			statusMessage: "Unauthorized",
		});
	}
	if (tgWebAppData && tgWebAppData.user) {
		userStore.setUsername(tgWebAppData.user.username);
		userStore.setAvatar(tgWebAppData.user.photo_url);
	}
	await userStore.fetchBalance();
	await userStore.fetchGamesStats();

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
