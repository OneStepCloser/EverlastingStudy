import Api from './../../api/api'

const state = {
    buildings: []
};
const getters = {
    getBuildings: state => state.buildings,

};
const mutations = {
    buildingsLoaded(state, buildings){
        state.buildings = buildings
    }
};
const actions = {
    loadBuildings({commit}){
        return new Promise((resolve, reject)=>{
            Api.Buildings.loadAllBuildings()
                .then(response => {
                    //TODO: axios response?
                    commit('buildingsLoaded', response.data.value);
                    resolve()
                })
                .catch(er => {
                    reject(er);
                })
        })
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
};
