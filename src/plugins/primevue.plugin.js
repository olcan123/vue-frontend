import PrimeVue from "primevue/config";
import Lara from "@primeuix/themes/lara";

export default {
    install(app) {
        app.use(PrimeVue, {
            theme: {
                preset: Lara,
                options: {
                    cssLayer: {
                        name: "primevue",
                        order: "theme, base, primevue",
                    },
                },
            },
        });
    },
};