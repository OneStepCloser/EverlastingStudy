<template>
    <div class="el-menu-vertical-demo">
        <el-menu :router=true
                 class="custom-menu"
                 :collapse="isCollapse">
            <el-menu-item class="custom-inner" index="timetable">
                <i class="el-icon-date"></i>
                <span slot="title">Расписание</span>
            </el-menu-item>

            <el-menu-item class="custom-inner" index="teachers">
                <i class="el-icon-star-off"></i>
                <span slot="title">Преподаватели</span>
            </el-menu-item>
            <el-menu-item class="custom-inner" index="map">
                <i class="el-icon-location-outline"></i>
                <span slot="title">Карта</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "side-menu",
        data() {
            return {
                isCollapse: true
            };
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    }

    .custom-inner {
        .el-menu-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
        }
    }

    .custom-menu {
        height: 100%
    }
</style>