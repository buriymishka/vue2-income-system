<template>
  <div>
    <v-container>
      <router-link :to="{ name: 'categoriesList' }">
        <v-btn class="mb-4">{{ "CategoriesList" | loc }}</v-btn>
      </router-link>
      <AppLoader v-if="loader" />
      <v-form
        v-else
        @submit.prevent="formHandler"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="title"
          :rules="titleRules"
          name="title"
          :label="loc('Title')"
          :hint="loc('AtLeast2Characters')"
          required
        ></v-text-field>

        <v-btn
          type="submit"
          color="primary"
          :loading="btnLoading"
          class="mr-4 mt-4"
          >{{ "Update" | loc }}</v-btn
        >
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import mixinParser from "@/mixins/parser";
import AppLoader from "@/components/loader";
import loc from "@/filters/localize";
export default {
  mixins: [mixinParser],
  components: {
    AppLoader,
  },
  data() {
    return {
      loc,
      valid: true,
      loader: true,
      title: "",
      titleRules: [(v) => v.length >= 2 || loc("AtLeast2Characters")],
      btnLoading: false,
    };
  },
  computed: {
    ...mapGetters("categories", ["currentCategory", "categories"]),
  },

  methods: {
    ...mapActions("categories", ["load", "loadById", "update"]),
    async formHandler() {
      this.title = this.MixinParser(this.title);
      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          this.btnLoading = true;

          let res = await this.update({
            id: this.$route.params.id,
            title: this.title,
          });

          this.btnLoading = false;
        }
      });
    },
  },
  async mounted() {
    await this.loadById(this.$route.params.id);
    if (this.currentCategory) {
      this.title = this.currentCategory.title;
    }
    if (!this.categories) {
      await this.load();
    }
    this.loader = false;
  },
};
</script>

