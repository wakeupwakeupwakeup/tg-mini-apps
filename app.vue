<script setup lang="ts">
import {
	emitEvent,
	init,
	isTMA,
	mockTelegramEnv,
	mountViewport,
	requestFullscreen,
	retrieveLaunchParams,
	swipeBehavior,
	unmountSwipeBehavior,
	unmountViewport,
	viewportMountError,
} from "@telegram-apps/sdk-vue";

const noInsets = {
	left: 0,
	top: 0,
	bottom: 0,
	right: 0,
} as const;
const themeParams = {
	accent_text_color: "#6ab2f2",
	bg_color: "#17212b",
	button_color: "#5288c1",
	button_text_color: "#ffffff",
	destructive_text_color: "#ec3942",
	header_bg_color: "#17212b",
	hint_color: "#708499",
	link_color: "#6ab3f3",
	secondary_bg_color: "#232e3c",
	section_bg_color: "#17212b",
	section_header_text_color: "#6ab3f3",
	subtitle_text_color: "#708499",
	text_color: "#f5f5f5",
} as const;

const {
	public: { env },
} = useRuntimeConfig();
tryOnMounted(async () => {
	if (env === "dev") {
		mockTelegramEnv({
			launchParams: {
				tgWebAppThemeParams: themeParams,
				tgWebAppData: new URLSearchParams([
					[
						"user",
						JSON.stringify({
							allows_write_to_pm: true,
							first_name: "Visa",
							id: 847390667,
							last_name: "",
							language_code: "ru",
							photo_url:
								"https://t.me/i/userpic/320/WUANByYGvTFrH7KzzOs1q4e8_RR7dxZmuhvZZtTSVCc.svg",
							username: "visaviceversa",
						}),
					],
					[
						"hash",
						"f6446118b5adae119725ee086dff07947277ae2387ce76f4a2c4bdd0b0750514",
					],
					[
						"signature",
						"32v8OnZKIAodp8zUge8XzU3pkTmh06qq6s9vJyBCuP0eZuZGVJtzMvMtQm45hPJitP4F-DnfGfiKZjLUh7afBA",
					],
					["auth_date", "2025-06-10T14:54:43.000Z"],
					["chat_type", "private"],
					["chat_instance", "8938812829086932503"],
				]),
				tgWebAppStartParam: "debug",
				tgWebAppVersion: "8",
				tgWebAppPlatform: "tdesktop",
			},
			onEvent(e) {
				if (e[0] === "web_app_request_theme") {
					return emitEvent("theme_changed", { theme_params: themeParams });
				}
				if (e[0] === "web_app_request_viewport") {
					return emitEvent("viewport_changed", {
						height: window.innerHeight,
						width: window.innerWidth,
						is_expanded: true,
						is_state_stable: true,
					});
				}
				if (e[0] === "web_app_request_content_safe_area") {
					return emitEvent("content_safe_area_changed", noInsets);
				}
				if (e[0] === "web_app_request_safe_area") {
					return emitEvent("safe_area_changed", noInsets);
				}
			},
		});
	}

	if (!isTMA()) navigateTo("/wrong-environment");
	try {
		init({
			acceptCustomStyles: false,
		});
		const { tgWebAppData } = retrieveLaunchParams();
		console.log(tgWebAppData);

		if (tgWebAppData && tgWebAppData.user && tgWebAppData.user.username) {
			useUserStore().setUsername(tgWebAppData.user.username);
		}
	} catch (error) {
		console.error(error);
		return navigateTo("/wrong-environment");
	}
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
