import { recallingGetRequest } from './api'

export default{
    loadAllBuildings(){
        //return Promise.resolve({data:{value:['Kochna', 'Myaso', 'Test0', 'Test1']}});
        return recallingGetRequest('ruzservice.svc/buildings');
    },
}