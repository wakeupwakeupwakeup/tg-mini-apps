export const useAuth = async (initDataRaw: string) => {
	const { $api } = useNuxtApp();

	await $api<{
		accessToken: string;
		refreshToken: string;
	}>("/auth", {
		method: "POST",
		body: { initData: initDataRaw },
	});
};
