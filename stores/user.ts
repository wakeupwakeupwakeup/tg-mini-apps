export const useUserStore = defineStore("User", () => {
	const username = ref("unknown");
	const accessToken = ref<string | null>(null);
	const refreshToken = ref<string | null>(null);

	function setUsername(name: string) {
		username.value = name;
	}

	async function authenticate(newAccessToken: string, newRefreshToken: string) {
		accessToken.value = newAccessToken;
		refreshToken.value = newRefreshToken;
	}

	return {
		username,
		setUsername,
		accessToken,
		refreshToken,
		authenticate,
	};
});
