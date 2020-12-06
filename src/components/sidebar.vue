<template>
  <div>
    <v-list subheader flat>
      <v-list-item-group>
        <router-link class="nav-link" to="/cabinet" tag="div">
          <v-list-item>
            <v-list-item-content class="list-item">
              <v-list-item-title v-text="loc('Analytics')"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon class="icon">mdi-home-analytics</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </router-link>

        <router-link class="nav-link" :to="{ name: 'recordsList' }" tag="div">
          <v-list-item>
            <v-list-item-content class="list-item">
              <v-list-item-title v-text="loc('Records')"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon class="icon">mdi-notebook-check-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </router-link>

        <router-link class="nav-link" :to="{ name: 'recordsCreate' }" tag="div">
          <v-list-item>
            <v-list-item-content class="list-item">
              <v-list-item-title v-text="loc('NewRecord')"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon class="icon">mdi-notebook-edit-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </router-link>

        <router-link class="nav-link" :to="{ name: 'categoriesList' }" tag="div">
          <v-list-item>
            <v-list-item-content class="list-item">
              <v-list-item-title v-text="loc('Categories')"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon class="icon">mdi-view-list</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </router-link>

        <router-link class="nav-link" :to="{ name: 'settings' }" tag="div">
          <v-list-item>
            <v-list-item-content class="list-item">
              <v-list-item-title v-text="loc('Settings')"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon class="icon">mdi-account-settings-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </router-link>

      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import loc from '@/filters/localize'
export default {
  data: () => ({
    loc
  })
}
</script>

<style scoped>
.router-link-exact-active {
  background-color: #666666;
}
.nav-link {
  transition: background-color .25s ease;
}
.nav-link:hover {
  background-color: #666666;
}
</style>
