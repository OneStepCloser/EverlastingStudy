import Api from './../../api/api'

const state = {
  buildings: []
};
const getters = {
  getBuildings: state => state.buildings,

};
const mutations = {
  buildingsLoaded(state, buildings) {
    state.buildings = buildings;
  }
};
const actions = {
  loadBuildings({state, commit}) {
    if(state.buildings.length !== 0)
      return Promise.resolve();
    return new Promise((resolve, reject) => {
      Api.Buildings.loadAllBuildings()
        .then(response => {
          let buildings = response.data.query.results.json.json;
          commit('buildingsLoaded', mapBuildings(buildings, resolve));
        })
        .catch(reject)
    })
  }
};

function mapBuildings(buildings, resolve) {
  let temp = [];
  let counter = buildings.length;
  buildings.forEach(e => {
    if (e.address && e.address !== '')
      Api.Buildings.geocode(e.address)
        .then(result => {
          if (result.data.response.GeoObjectCollection.featureMember.length > 0) {
            let loc = result.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
              .split(' ')
              .reverse();
            temp.push({
              location: loc,
              name: e.name,
              address: e.address,
            });
          }
          counter-=1;
          if(counter === 0)
            resolve();
        })
        .catch(()=>{
          counter-=1;
          if(counter === 0)
            resolve();
        });
    else
      counter-=1;
    if(counter === 0)
      resolve();
  });

  return temp
}

export default {
  state,
  actions,
  mutations,
  getters,
};
