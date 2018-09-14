import Api from './../../api/api'
import geocoder from 'geocoder'

const state = {
  buildings: []
};
const getters = {
  getBuildings: state => state.buildings,

};
const mutations = {
  buildingsLoaded(state, buildings) {
    state.buildings = buildings
  }
};
const actions = {
  loadBuildings({commit}) {
    return new Promise((resolve, reject) => {
      Api.Buildings.loadAllBuildings()
        .then(response => {
          let buildings = response.data.query.results.json.json;
          commit('buildingsLoaded', mapBuildings(buildings));
          resolve()
        })
        .catch(reject)
    })
  }
};

function mapBuildings(buildings) {
  let temp = [];
  buildings.forEach(e => {
    geocoder.geocode(e.address, (err, data)=>{
      if(data && data.results[0])
        temp.push({
          location : [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng],
          name: e.name,
          address: e.address,
        })
    })
  });
  return temp
}

export default {
  state,
  actions,
  mutations,
  getters,
};
