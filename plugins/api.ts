export default defineNuxtPlugin(() => {
	const accessToken = useCookie("accessToken");
	const {
		public: { env },
	} = useRuntimeConfig();
	const api = $fetch.create({
		baseURL: env === "dev" ? "https://igra.top/api" : "/api",
		onRequest({ options }) {
			if (accessToken) {
				options.headers.set("Authorization", `Bearer ${accessToken.value}`);
			}
		},
		// async onResponseError({ response }) {
		// 	if (response.status === 401) {
		// 		await nuxtApp.runWithContext(() => navigateTo("/login"));
		// 	}
		// },
	});

	return {
		provide: {
			api,
		},
	};
});
