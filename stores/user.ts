export const useUserStore = defineStore("User", () => {
	const username = ref("unknown");
	const balance = ref(0);
	const avatar = ref<string | null>(null);
	const gamesStats = ref<{
		totalGames: number;
		totalWins: number;
	}>({
		totalGames: 0,
		totalWins: 0,
	});

	function setUsername(name?: string) {
		if (name) username.value = name;
	}

	function setAvatar(url?: string) {
		if (url) avatar.value = url;
	}

	const { $api } = useNuxtApp();

	async function fetchBalance() {
		balance.value = await $api<number>("/user/balance");
	}

	async function fetchGamesStats() {
		gamesStats.value = await $api<{
			totalGames: number;
			totalWins: number;
		}>("/user/games-stats");
	}

	return {
		username,
		balance,
		avatar,
		gamesStats,
		setUsername,
		setAvatar,
		fetchBalance,
		fetchGamesStats,
	};
});
