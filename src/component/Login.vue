<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>

                    </v-toolbar>
                    <v-card-text>
                        <v-form  class="login" @submit.prevent="validation" v-model="valid" ref="form" validation>

                            <v-text-field
                                    prepend-icon="person"
                                    name="login"
                                    label="Login"
                                    type="text"
                                    v-model="login"
                                    :rules="loginRules"
                            ></v-text-field>
                            <v-text-field
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    v-model="password"
                                    :counter="6"
                                    :rules="passwordRules"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="primary"
                                @click="authorization()"
                                :disabled="!valid"
                        >Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {

        data(){

            return {
                login:'',
                password:'',
                valid: false,
                loginRules: [
                    v => !!v || 'Login is required'
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
                ]
            }
        },
        methods: {
            validation: function () {
                if (this.$refs.form.validate()) {
                    const user = {
                        login: this.login,
                        password: this.password
                    };
                    // eslint-disable-next-line no-console
                    console.log(user)
                }
            },
            authorization: function () {
                let login = this.login
                let password = this.password
                this.$store.dispatch('login', { login, password })
                    .then(() => this.$router.push('/'))
                    // eslint-disable-next-line no-console
                    .catch(err => console.log(err))
            }
        }
    }
</script>

