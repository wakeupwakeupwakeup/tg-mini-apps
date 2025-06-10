export const useUserStore = defineStore("User", () => {
	const username = ref("unknown");
	const balance = ref(0);
	const accessToken = ref<string | null>(null);
	const refreshToken = ref<string | null>(null);

	function setUsername(name: string) {
		username.value = name;
	}

	const { $api } = useNuxtApp();

	async function fetchBalance() {
		balance.value = await $api<number>("/user/balance");
	}

	async function authenticate(newAccessToken: string, newRefreshToken: string) {
		accessToken.value = newAccessToken;
		refreshToken.value = newRefreshToken;
	}

	return {
		username,
		balance,
		setUsername,
		fetchBalance,
		accessToken,
		refreshToken,
		authenticate,
	};
});
