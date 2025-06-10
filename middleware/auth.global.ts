import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
	const auth = await useAuth();

	const {
		public: { env },
	} = useRuntimeConfig();

	if (env === "dev") return;

	if (auth && to.path === "/unathorized") {
		return navigateTo("/");
	}

	if (!auth && to.path !== "/unathorized") {
		return navigateTo("/unathorized");
	}
});
