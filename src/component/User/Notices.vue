
   <template>
     <v-container>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm3>
     <h1 class="text--secondary mb-3">Все предложения</h1>
     <v-list two-line subheader>
          <v-list-tile

            style="padding-bottom:20px"
            avatar
            v-for="notice in allNoticesComb"
            :key="notice.id"
          >
            <v-list-tile-action style="padding:5px">{{notice.accepted}}
              <v-checkbox
                color="success"
                :input-value="notice.accepted === '1'"
              @change="markDone(notice.accepted)"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content v-if="notice.ticket.id">
              <v-list-tile-title>
                <h4  class="text--secondary mb-7">Получатель: {{notice.recipient.login}}</h4>
              </v-list-tile-title>
              <v-list-tile-title>
                  <h4  class="text--secondary mb-7">Оправитель: {{notice.sender.login}}</h4>              </v-list-tile-title>
              <v-list-tile-title>
                <h4  class="text--secondary mb-7">Заявка #:{{notice.ticket.id}} Название: {{notice.ticket.title}}</h4>
              </v-list-tile-title>
              <v-list-tile-title>
                <h4  class="text--secondary mb-7">Status: {{notice.status}}  </h4>
              </v-list-tile-title>
              <v-list-tile-sub-title>{{notice.ticketId}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                      :to="'/ticket/' + notice.ticket.id + '&' + notice.ticket.CreatedUserID"
                      @click="clickNoticeId(notice.id)"
                      class="primary">Открыть заявку</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
  </v-layout>
     </v-container>
</template>
   <script>
       import VListTileAction from "vuetify/src/components/VList/VListTileAction";
       export default {
           props:['nid'],
           data(){
               return{
                   checkbox1: {
                       inbox: false,
                       message: '',
                   }
                   //switch1:false
               }
           },
           mounted:function () {
               this.$store.dispatch('getTickets');
               this.$store.dispatch('getUsers');
               this.$store.dispatch('getNotices');
           },

           components: {VListTileAction},
           computed:{
//               getLoading:{
//                   set(val){this.$store.commit('setLoading',val)},
//                   get(){return this.$store.getters.getLoading;}
//               },
               allTicketsComb(){
                   return  this.$store.getters['combain/allTicketsComb']
               },

               allNoticesComb(){
                   return  this.$store.getters.allNoticesComb
               },

           },
           methods:{
               markDone(notice){
                  return notice.accepted
               },
               clickNoticeId(nid) {
                   this.$store.commit('setClickNoticeId',nid);
                   return nid
               },
               IsBox(createU,senderU) {
                   if(createU === senderU){
                       this.$store.state.combain.box = 'Исходящее'
                   } else  if(createU !== senderU){this.$store.state.combain.box = 'Входящее';}
               },
               clickNoticeId(nid) {
                   this.$store.state.combain.a = nid;
                   return nid
               },

                clickBox(){
                    console.log('1');
                },
           },
       }


   </script>