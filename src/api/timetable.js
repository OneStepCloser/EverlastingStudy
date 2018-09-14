import {recallingGetRequest} from './api'

export default{
    loadTimetable(fromDate, toDate, email){
        return recallingGetRequest('personlessons', {fromdate: fromDate, todate: toDate, email: email})
    }
}
