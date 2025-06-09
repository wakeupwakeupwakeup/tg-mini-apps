export const useUserStore = defineStore("User", () => {
	const username = ref("unknown");

	function setUsername(name: string) {
		username.value = name;
	}

	return {
		username,
		setUsername,
	};
});
