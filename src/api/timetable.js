import {recallingGetRequest} from './api'

export default{
    loadTimetable(startDate, finishDate){
        return recallingGetRequest('kek lol shit', {startDate: startDate, finishDate: finishDate})
    }
}