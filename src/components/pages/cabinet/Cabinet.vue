<template>
  <div>
    <v-container>
      <AppLoader v-if="loader" />
      <div v-else>
        <h2 class="text-center">{{ 'Income' | loc }}</h2>
        <AppChart :data="dataIncome" />
        <v-divider class="my-8"></v-divider>
        <h2 class="text-center">{{ 'Outcome' | loc }}</h2>
        <AppChart :data="dataOutcome" />
      </div>
    </v-container>
  </div>
</template>

<script>
import AppChart from "@/components/chart";
import AppLoader from "@/components/loader";
export default {
  components: {
    AppChart,
    AppLoader
  },
  data: () => ({
    dataIncome: {},
    dataOutcome: {},
    loader: true,
  }),
  async mounted() {
    this.dataIncome = await this.$store.dispatch('user/loadIncome')
    this.dataOutcome = await this.$store.dispatch('user/loadOutcome')
    this.loader = false
  }
};
</script>
