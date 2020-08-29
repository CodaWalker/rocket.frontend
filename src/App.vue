<!--<template>-->
<!--  <div id="app">-->
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link><span v-if="isLoggedIn"> |-->
<!--      <router-link to="/secure">Secure</router-link><span v-if="isLoggedIn"></span>-->
<!--            | <a @click="logout">Logout</a></span>-->

<!--    </div>-->
<!--    <div>{{getStatusAuth}}</div>-->
<!--    <router-view/>-->
<!--  </div>-->
<!--</template>-->

<template>
  <v-app>

    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-tile
                v-for="link in links"
                :key="link.title"
                :to="link.url"
                v-if="link.logged === isLoggedIn"
                @click=""
        >
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark color="primary">

      <v-toolbar-side-icon
              @click="drawer = !drawer"
              class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">TicketApp</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">

        <v-btn  v-for="link in links"
                :key="link.title"
                :to="link.url"
                v-if="link.logged === isLoggedIn"
                flat
        ><v-icon left>{{link.icon}}</v-icon>{{link.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>


<script>

  export default {
    components: {
    },
    data: () => ({
      drawer: false,
      links: [
        { title: 'Вход', icon: 'lock', url:'/login', logged:false},
        { title: 'Регистрация', icon: 'face', url:'/register', logged:false},
        { title: 'Закрытая страница', icon: 'supervisor_account', url:'/secure', logged:true},
        { title: 'Выход', icon: 'exit', url:'/logout', logged:true},
        // { title: 'Профиль', icon: 'face', url:'/userPage' },
        // { title: 'Предложения', icon: 'list', url:'/notices' },
        // { title: 'Новая заявка', icon: 'note_add', url:'/newTicket' },
        // { title: 'Мои заявки', icon: 'bookmark_border', url:'/myTickets' }
      ]
    }),
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},

        getStatusAuth: {
          set(val) {
            this.$store.commit('SET_AUTH_STATUS', val)
          },
          get() {
            return this.$store.getters.authStatus;
          }
        }

    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
                .then(() => {
                  this.$router.push('/login')
                })
      }
    },
    created: function () {
      if(this.isLoggedIn){
          console.log("L");
      }
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('logout')
          }
          throw err;
        });
      });
    }
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
  /*#app {*/
  /*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*  -webkit-font-smoothing: antialiased;*/
  /*  -moz-osx-font-smoothing: grayscale;*/
  /*  text-align: center;*/
  /*  color: #2c3e50;*/
  /*}*/
  /*#nav {*/
  /*  padding: 30px;*/
  /*}*/
  /*#nav a {*/
  /*  font-weight: bold;*/
  /*  color: #2c3e50;*/
  /*  cursor: pointer;*/
  /*}*/
  /*#nav a:hover {*/
  /*  text-decoration: underline;*/
  /*}*/
  /*#nav a.router-link-exact-active {*/
  /*  color: #42b983;*/
  /*}*/
</style>
