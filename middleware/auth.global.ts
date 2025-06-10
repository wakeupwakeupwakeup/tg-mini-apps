import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async () => {
	const auth = await useAuth();

	const {
		public: { env },
	} = useRuntimeConfig();

	if (env === "dev") return;

	if (!auth) {
		throw createError({
			statusCode: 401,
			statusMessage: "Error while authenticating",
		});
	}
});
