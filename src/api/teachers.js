import { recallingGetRequest } from './api'

export default{
    loadAllTeachers(){
        return recallingGetRequest('lecturers', {chairoid: 0});
    },
}
