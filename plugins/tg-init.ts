import { init } from "@telegram-apps/sdk-vue";

export default defineNuxtPlugin(async () => {
  try {
    init({
      acceptCustomStyles: false,
    });
  } catch (error) {
    console.error(error);
    createError({
      cause: error,
      message: "Failed to initialize Telegram SDK",
      fatal: true
    })
  }
});
