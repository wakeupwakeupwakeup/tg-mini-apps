import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/eslint",
		"@nuxt/image",
		"@pinia/nuxt",
		"@vueuse/nuxt",
		"nuxt-svgo",
	],
	ssr: false,
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
	compatibilityDate: "2025-05-15",
	app: {
		head: {
			meta: [
				{
					name: "viewport",
					content: "initial-scale=1, viewport-fit=cover",
				},
			],
		},
	},
	runtimeConfig: {
		public: {
			env: process.env.env,
			botUrl: process.env.BOT_URL,
		},
	},
	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: ["igra.top"],
		},
	},
	svgo: {
		defaultImport: "component",
		svgoConfig: {
			plugins: [
				{
					name: "preset-default",
					params: {
						overrides: {
							removeViewBox: false,
						},
					},
				},
			],
		},
	},
	image: {
		dir: "public",
	},
});
