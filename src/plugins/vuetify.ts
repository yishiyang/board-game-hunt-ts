import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#353B69",
        surface: "#C7CADA",
        brown: "#69402D",
        accent: "#F4D147",
      },
      dark: {
        primary: "#006BFF",
      },
    },
  },
});
