import Api from './../../api/api'
const state = {
  lessons: [],
  starts: ['09:00', '10:30', '12:10', '13:40', '15:10', '16:40', '18:10', '19:40']
};
const getters = {
  getAllLessons: state => state.lessons,
  getAllStarts: state=> state.starts
};
const mutations ={
  loadedLessons(state, lessons){
    state.lessons = lessons;
  }
};
const actions = {
  loadLessons({commit, rootState, state}, {fromDate, toDate}){
    return new Promise((resolve,reject)=>{
      Api.Timetable.loadTimetable(fromDate, toDate, rootState.mail.mail)
        .then(res => {
          let byStart = _.groupBy(res.data.query.results.json.json, 'beginLesson');
          let timetable = {};
          state.starts.forEach(start => {
            timetable[start] = {};
            if (byStart[start]) {
              byStart[start].forEach(e=>{
                timetable[start][convertNumToDay(e.dayOfWeek)] = {
                  auditorium: e.auditorium,
                  lecturer: e.lecturer,
                  kindOfWork: e.kindOfWork,
                  discipline: e.discipline,
                  dayOfWeek: e.dayOfWeek
                };
                timetable[start].start = start
              });
            }
          });
          console.log(Object.values(timetable));
          commit('loadedLessons', Object.values(timetable));
          resolve()
        })
        .catch(reject)
    })
  }
};
function convertNumToDay(num) {
  switch(num){
    case 1:
      return "MON";
    case 2:
      return "TUE";
    case 3:
      return "WED";
    case 4:
      return "THU";
    case 5:
      return "FRI";
    case 6:
      return "SAT"
  }
}
export default {
    state,
    actions,
    mutations,
    getters,
};
