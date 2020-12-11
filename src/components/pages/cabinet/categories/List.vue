<template>
  <div>
    <v-container>
      <router-link :to="{ name: 'categoriesCreate' }">
        <v-btn class="mb-4" color="primary">{{ "CreateCategory" | loc }}</v-btn>
      </router-link>
      <AppLoader v-if="loader" />

      <v-list-item-group color="primary" v-else>
        <v-list-item
          v-for="category in categories"
          :key="category.id"
          @click="editHandler(category.id)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="category.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon class="icon-edit"> mdi-playlist-edit </v-icon>
          </v-list-item-icon>
          <v-list-item-icon>
            <v-icon class="icon-trash" @click.stop="deleteHandler(category.id)">
              mdi-trash-can-outline
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppLoader from "@/components/loader";
export default {
  components: {
    AppLoader,
  },
  data: () => ({
    loader: true,
  }),
  computed: {
    ...mapGetters("categories", ["categories"]),
  },
  methods: {
    ...mapActions("categories", ["remove", "load"]),
    editHandler(id) {
      this.$router.push({ name: "categoriesEdit", params: { id } });
    },
    async deleteHandler(id) {
      const res = await this.$confirm(
        "Do you really want to delete category?",
        { title: "Warning" }
      );
      if (res) {
        this.remove(id);
      }
    },
  },
  async mounted() {
    if (!this.categories) {
      await this.load();
    }
    this.loader = false;
  },
};
</script>

