<script setup lang="ts">
import { requestFullscreen } from "@telegram-apps/sdk-vue";

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
await requestFullscreen();
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
