import Api from './../../api/api'
import Vue from 'vue'
const state = {
  lessons: []
};
const getters = {
  getAllLessons: state => state.lessons
};
const mutations ={
  loadedLessons(state, lessons){
    state.lessons = lessons;
  }
};
const actions = {
  loadLessons({commit, rootState}, {fromDate, toDate}){
    return new Promise((resolve,reject)=>{
      Api.Timetable.loadTimetable(fromDate, toDate, rootState.mail.mail)
        .then(res => {
          commit('loadedLessons', res.data.query.results.json.json);
        })
        .catch(reject)
    })
  }
};

export default {
    state,
    actions,
    mutations,
    getters,
};
