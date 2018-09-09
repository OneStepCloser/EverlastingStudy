import timetable from './modules/timetable'
import mail from './modules/mail'
import buildings from './modules/buildings'
import Vuex from 'vuex';
import Vue from 'vue';
import { Notification } from 'element-ui';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    getters: {},
    modules: {
        timetable,
        mail,
        buildings
    },
    mutations: {},
    actions: {
        showToast(state, { type, message, title }) {
            Notification({
                title,
                message,
                type,
                offset: 60,
            });
        },
        showConfirmDialog(state, { title, text, data }) {
            return Vue.$confirm(text, title, data);
        },
        showSuccessToast(state, message) {
            state.dispatch('showToast', { message, type: 'success' });
        },
        showErrorToastWithMessage(state, message) {
            state.dispatch('showToast', { message, type: 'error' });
        },
        showErrorToast({ dispatch }, error) {
            console.log('Show error toast:', error);
            if ((error.response) && (!error.response.data || typeof error.response.data === 'string')) {
                const errStr = `Ошибка: ${error.response.status}`;
                dispatch('showErrorToastWithMessage', errStr);
            } else if (typeof error.response !== 'undefined') {
                console.log('WILL SHOW ERRR', error.response.data.reason);
                if (typeof error.response.data.reason === 'string') {
                    dispatch('showErrorToastWithMessage', `Ошибка: ${error.response.data.reason}`);
                } else {
                    Object.keys(error.response.data.errors)
                        .forEach((err) => {
                            dispatch('showErrorToastWithMessage', `Ошибка: ${error.response.data.errors[err]}`);
                        });
                }
            } else if (typeof error.reason === 'string') {
                dispatch('showErrorToastWithMessage', error.reason);
            }
        },
    },
});
