import { recallingGetRequest } from './api'

export default{
    loadAllTeachers(){
        //return Promise.resolve({data:{value:['Kochna', 'Myaso', 'Test0', 'Test1']}});
        return recallingGetRequest('ruzservice.svc/lecturers', {chairoid: 0});
    },
}