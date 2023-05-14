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
        red: "#FF5959",
        orange: "#FFA439",
        green: "#36CE1B",
        information: "#97C3FF",
        lightError: "#FFC2AE",
        anomaly: "#AEACFF",
        lightGrey: "#DFDFDF",
        darkGrey: "#424242",

        surface: "#C7CADA",

        bkgGrey: "#e5e5e5",
        highlight: "#E6EDFE",

        // accent: "#8c9eff",
        // error: "#b71c1c",
      },
      dark: {
        primary: "#006BFF",
      },
    },
  },
});
