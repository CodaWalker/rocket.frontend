<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img
                    id="profile-img"
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    class="profile-img-card"
            />
            <v-card-text>
                <v-container grid-list-md>
                    <v-form  v-model="getValid" ref="form" validation>
                            <v-text-field
                                    required
                                    :counter="3"
                                    v-model="getUser.login"
                                    label="Ник"
                                    name="name"
                                    prepend-icon=""
                                    :rules="getLoginRules"
                            ></v-text-field>
                            <v-text-field
                                    required
                                    v-model="getUser.email"
                                    label="Емайл"
                                    prepend-icon="email"
                                    name="email"
                                    type="email"
                                    :rules="getEmailRules"
                            ></v-text-field>
                            <v-text-field
                                    required
                                    :counter="6"
                                    v-model="getUser.password"
                                    label="Пароль"
                                    prepend-icon="lock"
                                    name="password"
                                    type="password"
                                    :rules="getPasswordRules"
                            ></v-text-field>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="primary"
                                    @click.native="register()"
                                    :disabled="!getValid"
                            >Сохранить</v-btn>
                        </v-card-actions>
                    </v-form>


                </v-container>
            </v-card-text>
        </div>
    </div>
</template>

<script>

    export default {
        data () {
            return {

            }
        },
        computed:{
            getEmailRules:{
                set(val){this.$store.commit('SET_EMAIL_RULES', val)
                },get(){return  this.$store.getters.getEmailRules; }
            },
            getLoginRules:{
                set(val){this.$store.commit('SET_LOGIN_RULES', val) },
                get(){return  this.$store.getters.getLoginRules; }
            },
            getIsEmail:{
                set(val){this.$store.commit('SET_IS_EMAIL',val)},
                get(){return this.$store.getters.getIsEmail;}
            },
            getPasswordRules:{
                set(val){this.$store.commit('SET_PASSWORD_RULES',val)},
                get(){return this.$store.getters.getPasswordRules;}
            },
            getConfirmPasswordRules:{
                set(val){this.$store.commit('SET_CONFIRM_PASSWORD_RULES',val)},
                get(){return this.$store.getters.getConfirmPasswordRules;}
            },
            getValid:{
                set(val){this.$store.commit('SET_VALID',val)},
                get(){return this.$store.getters.getValid;}
            },
            getLoading:{
                set(val){this.$store.commit('SET_LOADING',val)},
                get(){return this.$store.getters.getLoading;}
            },
            getUser: {
                set(val){this.$store.commit('SET_USER',val)},
                get(){return this.$store.getters.getUser;}
            },
        },

        methods: {
            register: function () {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch("register", this.getUser)
                        .then(() => this.$router.push("/login"))
                        .catch(err => console.log(err))
                }
            },
        }
    }
</script>

<style scoped>
    label {
        display: block;
        margin-top: 10px;
    }
    .card-container.card {
        max-width: 350px !important;
        padding: 40px 40px;
    }
    .card {
        background-color: #f7f7f7;
        /* just in case there no content*/
        padding: 20px 25px 30px;
        margin: 0 auto 25px;
        margin-top: 50px;
        /* shadows and rounded borders */
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    }
    .profile-img-card {
        width: 96px;
        height: 96px;
        margin: 0 auto 10px;
        display: block;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
    }
</style>