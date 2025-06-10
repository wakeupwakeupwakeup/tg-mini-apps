export default defineNuxtPlugin(() => {
	const accessToken = useCookie("accessToken");

	const api = $fetch.create({
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
