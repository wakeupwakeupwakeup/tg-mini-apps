import { retrieveRawInitData } from "@telegram-apps/sdk-vue";

export const useAuth = async () => {
	const userStore = useUserStore();
	const { $api } = useNuxtApp();

	if (!userStore.accessToken) {
		const initDataRaw = retrieveRawInitData();
		try {
			const { accessToken, refreshToken } = await $api<{
				accessToken: string;
				refreshToken: string;
			}>("/auth", {
				method: "POST",
				body: { initData: initDataRaw },
			});
			userStore.authenticate(accessToken, refreshToken);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
};
