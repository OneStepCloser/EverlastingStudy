import Api from './../../api/api'

const state = {
    teachers: []
};
const getters = {
    getAllTeachers: state => state.teachers,
    getTeachersByCafedra: (state, oid) => {
        //TODO filtration
    }
};
const mutations = {
    loadedTeachers(state, teachers) {
        state.teachers = teachers
    }
};
const actions = {
    loadTeachers({commit}) {
        return new Promise((resolve, reject) => {
            Api.Teachers.loadAllTeachers()
                .then(response => {
                        commit('loadedTeachers', response.data.value);
                        resolve(response)
                    }
                )
                .catch(er => reject(er))
        })
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
};
