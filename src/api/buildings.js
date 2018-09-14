import { recallingGetRequest } from './api'

export default{
    loadAllBuildings(){
        return recallingGetRequest('buildings');
    },
}
