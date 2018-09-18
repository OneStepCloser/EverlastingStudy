import {recallingGetRequest} from './api'
import axios from 'axios'

export default {
  loadAllBuildings() {
    return recallingGetRequest('buildings');
  },
  geocode(address){
    return axios.get('https://geocode-maps.yandex.ru/1.x/?format=json&results=1&geocode=' + address )
  }
}
