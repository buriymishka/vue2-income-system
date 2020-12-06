<template>
  <v-container>
    <AppLoader v-if="loader" />
    <v-form
      v-else
      @submit.prevent="formHandler"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :rules="nameRules"
        name="name"
        :label="loc('Name')"
        :hint="loc('AtLeast2Characters')"
        required
      ></v-text-field>

      <v-text-field
        v-model.trim="email"
        :rules="emailRules"
        name="email"
        :label="loc('Email')"
        required
      ></v-text-field>

      <v-select
        v-model="locale"
        :items="locales"
        item-text="title"
        item-value="id"
        :label="loc('Language')"
      ></v-select>

      <v-text-field
        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="show3 ? 'text' : 'password'"
        v-model="password"
        :label="loc('NewPassword')"
        :hint="loc('AtLeast2Characters')"
        class="input-group--focused"
        @click:append="show3 = !show3"
      ></v-text-field>

      <v-text-field
        :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[comparePasswords]"
        :type="show4 ? 'text' : 'password'"
        v-model="rePassword"
        :label="loc('ReEnterNewPassword')"
        :hint="loc('AtLeast2Characters')"
        class="input-group--focused"
        @click:append="show4 = !show4"
      ></v-text-field>

      <v-btn
        type="submit"
        color="primary"
        :loading="btnLoading"
        class="mr-4 mt-4"
        >{{ 'Update' | loc }}</v-btn
      >
    </v-form>
  </v-container>
</template>
<script>
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
      loader: true,
      valid: true,
      email: "",
      emailRules: [
        (v) => /.+@.+\..+/.test(v) || loc('EmailMustBeValid'),
        (v) => (v || "").indexOf(" ") < 0 || loc('NoSpacesAreAllowed'),
      ],
      name: "",
      nameRules: [(v) => v.length >= 2 || loc('AtLeast2Characters')],
      locales: [
        { id: "en-US", title: "English" },
        { id: "ru-RU", title: "Русский" },
      ],
      locale: null,
      password: "",
      show3: false,
      passwordRules: [
        (v) => v.length >= 2 || !v.length || loc('AtLeast2Characters'),
        (v) => (v || "").indexOf(" ") < 0 || loc('NoSpacesAreAllowed'),
      ],
      rePassword: "",
      show4: false,
      rePasswordRules: {},
      userImage: "",
      image: null,
      btnLoading: false,
    };
  },
  computed: {
    comparePasswords() {
      return () => this.password === this.rePassword || loc('PasswordMustMatch');
    },
  },

  methods: {
    setupForm() {
      this.name = this.$store.getters["user/user"].name;
      this.email = this.$store.getters["user/user"].email;
      this.locale = this.$store.getters["user/user"].locale;
    },
    async formHandler() {
      this.name = this.MixinParser(this.name);
      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          this.btnLoading = true;

          let res = await this.$store.dispatch("user/update", {
            name: this.name,
            email: this.email,
            locale: this.locale,
            newPassword: this.password,
          });
          if (res) {
            this.setupForm();
          }
          this.btnLoading = false;
        }
      });
    },
  },
  async mounted() {
    if (!this.$store.getters["user/user"]) {
      await this.$store.dispatch("user/load");
    }
    this.setupForm();
    this.loader = false;
  },
};
</script>
