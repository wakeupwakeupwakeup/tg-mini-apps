import {
	backButton,
	mountBackButton,
	showBackButton,
	hideBackButton,
	onBackButtonClick,
} from "@telegram-apps/sdk-vue";

export function useBackButton(onClick: () => void) {
	if (!mountBackButton.isAvailable() || !backButton.isSupported()) {
		return;
	}

	mountBackButton();
	showBackButton();

	const offClick = onBackButtonClick(onClick);

	tryOnUnmounted(() => {
		if (backButton.isMounted()) {
			hideBackButton();
		}
	});

	return {
		offClick,
	};
}
