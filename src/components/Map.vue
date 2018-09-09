<template>
    <div>
        <div >{{buildings}} </div>
        <Loading  :loading="loading" :loaded="loaded" :refresh="()=>loadBuildings()">

        </Loading>

    </div>
</template>

<script>
    import Loading from './Universal/Loading'

    export default {
        name: "map",
        data() {
            return {
                loading: false,
                loaded: true,
            };
        },
        components: {
            Loading
        },
        mounted() {
            this.loadBuildings()
        },
        methods:{
            loadBuildings(){
                this.loading = true;
                this.$store.dispatch('loadBuildings')
                    .then(() => {
                        this.loading = false;
                        this.loaded = true;
                    })
                    .catch((er) => {
                        this.$store.dispatch('showErrorToastWithMessage', er);
                        this.loading = false;
                        this.loaded = false;
                    })

            }
        },
        computed: {
            buildings(){
                return this.$store.getters.getBuildings;
            }
        }
    }
</script>

<style scoped>

</style>