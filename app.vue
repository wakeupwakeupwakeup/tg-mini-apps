<script setup lang="ts">
import {
	mountViewport,
	requestFullscreen,
	unmountViewport,
	viewportMountError,
} from "@telegram-apps/sdk-vue";

// import { init } from "@telegram-apps/sdk-vue";

// tryOnMounted(() => {
//   try {
//     init({
//       acceptCustomStyles: false,
//     });
//     const {hash} = useRoute()
//     const launchParams = new URLSearchParams(hash.slice(1))
//     if (!launchParams.get("tgWebAppPlatform")) {
//       return navigateTo("/wrong-environment");
//     }
//   } catch (error) {
//     console.error(error);
//     return navigateTo("/wrong-environment");
//   }
// })
tryOnMounted(async () => {
	if (mountViewport.isAvailable()) {
		try {
			await mountViewport();
			await requestFullscreen();
		} catch {
			viewportMountError();
		}
	}
});
tryOnUnmounted(() => {
	unmountViewport();
});
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
