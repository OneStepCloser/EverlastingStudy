import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Timetable from '@/components/Timetable/Timetable'
import Teachers from '@/components/Teachers'
import Map from '@/components/Map'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/timetable',
            name: 'Timetable',
            component: Timetable
        },
        {
            path: '/teachers',
            name: 'Teachers',
            component: Teachers
        },
        {
            path: '/map',
            name: 'Buildings',
            component: Map
        },
    ]
})
