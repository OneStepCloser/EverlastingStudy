<template>
  <div>
    <Loading :loading="loading" :loaded="loaded" :refresh="()=>loadBuildings()"/>
    <yandex-map
      :coords="[55.751244, 37.618423]"
      zoom="10"
      style="width: 100%; height: 100%;"
      :controls="['geolocationControl', 'typeSelector', 'zoomControl', 'fullscreenControl']"
    >
      <ymap-marker v-for="(building, ind) in buildings"
                   :key="ind"
                   :marker-id="ind"
                   :coords="building.location"
                   :balloon="{header: building.name, body: building.address}"
                   marker-type="placemark" />
    </yandex-map>
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
      Loading,
    },
    mounted() {
      this.loadBuildings()
    },
    methods: {
      loadBuildings() {
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
      buildings() {
        return this.$store.getters.getBuildings;
      }
    }
  }
</script>

<style scoped>

</style>
