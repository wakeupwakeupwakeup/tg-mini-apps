export const useUserStore = defineStore("User", () => {
	const username = ref("unknown");
	const balance = ref(0);
	const accessToken = ref<string | null>(null);
	const refreshToken = ref<string | null>(null);

	function setUsername(name: string) {
		username.value = name;
	}

	function setBalance(newBalance: number) {
		balance.value = newBalance;
	}

	async function authenticate(newAccessToken: string, newRefreshToken: string) {
		accessToken.value = newAccessToken;
		refreshToken.value = newRefreshToken;
	}

	return {
		username,
		balance,
		setUsername,
		setBalance,
		accessToken,
		refreshToken,
		authenticate,
	};
});
