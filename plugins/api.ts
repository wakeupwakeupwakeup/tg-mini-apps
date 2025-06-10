export default defineNuxtPlugin(() => {
	const {
		public: { env },
	} = useRuntimeConfig();

	const api = $fetch.create({
		baseURL: env === "dev" ? "http://localhost:8080" : "/api",
		credentials: "include",
		onResponse({ response }) {
			if (response?.status === 401) {
				throw createError({
					statusCode: 401,
					statusMessage: "Unauthorized",
					fatal: true,
				});
			}
		},
	});

	return {
		provide: {
			api,
		},
	};
});
