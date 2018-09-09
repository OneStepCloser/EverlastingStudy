<template>
    <div class="cover">
        <div v-if="loading">
            Не, ну я загружаю как-бы
        </div>
        <div v-else-if="!loaded" style="display: flex; flex-direction: column">
            Чет не грузит(
            <el-button @click="refresh" style="margin-top: 16px;">
                Refresh
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "loading",
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            loaded: {
                type: Boolean,
                default: true,
            },
            refresh:{
                type: Function,
                default: ()=>{console.log('refresh')},
            }
        }
    }
</script>

<style scoped>
    .cover {
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2;
        position: absolute;
        top: 0;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>