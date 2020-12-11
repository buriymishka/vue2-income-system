<template>
  <div>
    <v-container>
      <router-link :to="{ name: 'recordsCreate' }">
        <v-btn class="mb-4" color="primary">{{ 'CreateRecord' | loc }}</v-btn>
      </router-link>
      <AppLoader v-if="loader" />
      <div v-else>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="loc('Search')"
          class="mb-4"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table :headers="headers" :items="records" :search="search">
          <template v-slot:item.income="{ item }">
            <v-chip :class="{ success: item.income, red: !item.income }">
              <div v-if="item.income">{{ 'Income' | loc }}</div>
              <div v-else>{{ 'Outcome'  | loc }}</div>
            </v-chip>
          </template>
          <template v-slot:item.amount="{ item }">
            {{ item.amount | currency }}
          </template>
          <template v-slot:item.categoryId="{ item }">
            {{ categoryTitle(item.categoryId) }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="icon-edit mr-4" @click.stop="editHandler(item.id)">
              mdi-playlist-edit
            </v-icon>
            <v-icon class="icon-trash" @click.stop="deleteHandler(item.id)">
              mdi-trash-can-outline
            </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppLoader from "@/components/loader";
import loc from '@/filters/localize'
export default {
  components: {
    AppLoader,
  },
  data() {
    return {
      loc,
      loader: true,
      search: "",
      headers: [
        { text: loc('Title'), value: "title" },
        { text: loc('Category'), value: "categoryId" },
        { text: loc('Type'), value: "income" },
        { text: loc('Amount'), value: "amount" },
        { text: loc('Actions'), value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters("records", ["records"]),
    ...mapGetters("categories", ["categories"]),
    categoryTitle() {
      return (id) => {
        let cat = this.categories.find((category) => category.id == id);
        return cat ? cat.title : loc('NoCategory');
      };
    },
  },
  methods: {
    ...mapActions("records", ["load", "remove"]),
    ...mapActions("categories", { categoriesLoad: "load" }),
    editHandler(id) {
      this.$router.push({ name: "recordsEdit", params: { id } });
    },
    async deleteHandler(id) {
      const res = await this.$confirm("Do you really want to delete record?", {
        title: "Warning",
      });
      if (res) {
        this.remove(id);
      }
    },
  },
  async mounted() {
    if (!this.records) {
      await this.load();
    }
    if (!this.categories) {
      await this.categoriesLoad();
    }
    this.loader = false;
  },
};
</script>

