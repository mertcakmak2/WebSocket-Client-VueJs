import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#4CAF50',
        secondary: '#ee44aa',
        accent: '#424242',
        success: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        warning: '#FFC107'
      },
    },
  },
});
