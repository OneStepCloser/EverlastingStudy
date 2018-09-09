import Vue from 'vue';

const state = {
    mail: null,
};
const getters = {
    getCurrentMail: state => state.mail,
};
const mutations = {
    currentMailLoaded(state, mail) {
        state.mail = mail;
    },
};
const actions = {
    loadCurrentMail({ commit }) {
        let mail = Vue.cookies.get('mail');
        if (mail)
            commit('currentMailLoaded', mail);
    },
    addCurrentMail({ commit }, mail){
        Vue.cookies.set("mail",mail,"24d");
        commit('currentMailLoaded', mail);
    },
    removeCurrentMail({ commit }){
        Vue.cookies.remove('mail');
        commit('currentMailLoaded', null);
    },
};

export default {
    state,
    actions,
    mutations,
    getters,
};
