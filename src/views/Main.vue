<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <AppSidebar />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      {{ name }}
      <v-spacer></v-spacer>
      <v-btn depressed color="error" @click="logoutHandler">
        <v-icon> mdi-exit-to-app </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
  </div>
</template>

<script>
import AppSidebar from "@/components/sidebar";

export default {
  components: {
    AppSidebar,
  },
  data: () => ({ drawer: null }),
  computed: {
    name() {
      return this.$store.getters["user/user"].name
    }
  },
  methods: {
    logoutHandler() {
      this.$store.dispatch("user/logout")
    }
  }
};
</script>
