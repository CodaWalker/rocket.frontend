<template>
    <div>
        <form class="login" @submit.prevent="auth">
            <h1>Sign in</h1>
            <label>login</label>
            <input required v-model="login" type="text" placeholder="Name"/>
            <label>Password</label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <hr/>
            <button type="submit">Login</button>
        </form>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                login : "",
                password : ""
            }
        },
        methods: {
            auth: function () {
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