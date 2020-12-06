<template>
  <v-app>
    <router-view></router-view>
    <AppSnackbars />
  </v-app>
</template>

<script>
import AppSnackbars from '@/components/snackbars'
export default {
  name: "App",
  components: {
    AppSnackbars
  }
};
</script>
