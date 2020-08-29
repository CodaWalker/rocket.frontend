<template>
  <v-card>
    <v-card-title>
     Основные параметры учетной записи
    </v-card-title>



    <v-card-text>
      <v-form  v-model="valid" ref="form" validation>
        <!--<v-text-field-->
          <!--label="Outline"-->
          <!--placeholder="Placeholder"-->
          <!--outline -->
        <!--&gt;</v-text-field>-->
        <!--&lt;!&ndash;<v-btn color="primary" dark @click="dialog2 = true">Open Dialog 2</v-btn>&ndash;&gt;-->
        <!--<v-text-field-->
          <!--label="Outline"-->
          <!--placeholder="Placeholder"-->
          <!--outline-->
        <!--&gt;</v-text-field>-->
        <!--<v-text-field-->
          <!--label="Outline"-->
          <!--placeholder="Placeholder"-->
          <!--outline-->
        <!--&gt;</v-text-field>-->
        <!--<v-text-field-->
          <!--label="Outline"-->
          <!--placeholder="Placeholder"-->
          <!--outline-->
        <!--&gt;</v-text-field>-->
        <!--<v-text-field-->
          <!--label="Outline"-->
          <!--placeholder="Placeholder"-->
          <!--outline-->
        <!--&gt;</v-text-field>-->


          <v-expansion-panel popout>
            <v-expansion-panel-content v-model="panel['1']">
            <div slot="header">Прозвище : {{nickName}}</div>
            <v-card>
              <v-card-text>
                <v-text-field
                  label="Никнейм"
                  placeholder="Rush"
                  outline
                  clearable
                  v-model="nickName"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
            <v-expansion-panel-content v-model="panel['2']">
              <div slot="header">Пароль был изменен вчера</div>
              <v-card>
                <v-card-text>
                  <v-text-field
                    label="Пароль"
                    placeholder="Rush"
                    outline
                    clearable
                    v-model="password"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    label="Повторите пароль"
                    placeholder="Rush"
                    outline
                    clearable
                    v-model="password"
                    type="password"
                  ></v-text-field>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content v-model="panel['3']" v-bind:class="{error: err_3}">
            <div slot="header">И.Ф.О. : {{firstName +' '+ lastName +' '+ middleName}}</div>
            <v-card>
              <v-card-text >
                <v-text-field ref="firstName"
                  label="Имя"
                  placeholder="Иван"
                  outline
                  clearable
                  v-model="firstName"
                  :rules="userFirstNameRules"
                ></v-text-field>
                <v-text-field
                  label="Фамилие"
                  placeholder="Иванов"
                  outline
                  clearable
                  v-model="lastName"
                  :rules="userLastNameRules"
                ></v-text-field>
                <v-text-field
                  label="Отчество"
                  placeholder="Иванович"
                  outline
                  clearable
                  v-model="middleName"
                  :rules="userMiddleNameRules"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

            <v-expansion-panel-content v-model="panel['4']">
              <div slot="header">Пол: {{userSex}}</div>
              <v-card>
                <v-card-text>
              <v-container fluid>
                <v-radio-group v-model="userSex" :mandatory="false">
                  <v-radio label="Неопределено" value="none" default></v-radio>
                  <v-radio label="Мужчина" value="men"></v-radio>
                  <v-radio label="Женщина" value="woman"></v-radio>
                </v-radio-group>
              </v-container>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content v-model="panel['5']">
              <div slot="header">Семейное положение: {{mStatus}}</div>
              <v-card>
                <v-card-text>
                  <v-container fluid>
                    <v-radio-group v-model="mStatus" :mandatory="false">
                      <v-radio label="Неопределено" value="Неопределено" default></v-radio>
                      <v-radio label="Свободен\Свободна" value="Свободен\Свободна"></v-radio>
                      <v-radio label="Женат\Замужем" value="Женат\Замужем"></v-radio>
                    </v-radio-group>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content v-model="panel['6']">
              <v-layout row wrap>
                <v-flex xs12 sm3>
                  <v-checkbox v-model="landscape" hide-details label="Landscape"></v-checkbox>
                </v-flex>
                <v-flex xs12 sm3>
                  <v-checkbox v-model="reactive" hide-details label="Reactive"></v-checkbox>
                </v-flex>
              </v-layout>
              <div slot="header">День рождения: {{picker}}</div>
              <div>
                <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive"></v-date-picker>
              </div>x
            </v-expansion-panel-content>
        </v-expansion-panel>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="onSubmit()"
            :disabled="!valid"
          >Сохранить</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" flat @click="dialogExit()">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import {eventEmitter} from './../../../../node_modules/event-emitter'
  export default{
    props:['dialog_options_general'],
//    mounted(){
//        let errFName = this.$refs.firstName.errorBucket[0];
//        if(errFName !== 'undefined'){this.errRevers(true);}
//
//    },
//    beforeUpdate: function () {
//      let errFName = this.$refs.firstName.errorBucket[0];
////      //console.log(errFName);
////      if(errFName !== 'undefined'){this.errRevers(true);}
//      if(errFName === 'undefined'){this.errRevers(false);}
//
//
//      console.log(this);
//    },
    methods: {
      //errRevers(v){this.err_3 = v;
      //console.log(this.err_3)
      //},
      onSubmit() {
        if (this.$refs.form) {
          const user = {
            //dialog_options_general: this.dialog_options_general,
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
            userSex: this.userSex,
            mStatus: this.mStatus,
            picker: this.picker,
            nickName: this.nickName,
            password: this.password
            //User: this.User
          };

          this.dialogExit();

          console.log(user);
        }
      },
      dialogExit(){
        //this.child_dialog_options_general = false; вместо false
        // зановится измененная переменная this.child_dialog_options_general.
        //В этом случае просто false

//console.log(fName);
//if(fName.classList.contains('v-messages__message')){console.log('!!!');}
        this.panel = [];
        //this.panel = [false,true];
        // 0 арг не важен
        //Первый элемент открыт всегда после сохранения
        this.$emit('exit-change',false);
      }
    },

    data () {
      return {
        //child_dialog_options_general: this.dialog_options_general,
        //Получает значение родительской переменной, в данном случае оно уже известно
        userFirstNameRules: [
          v => !!v || 'Имя обязательно для заполнения',
          v => (v && v.length >= 2) || 'Имя должно состоять из 2-х и более символов'
        ],
        userLastNameRules: [
          v => !!v || 'Имя обязательно для заполнения',
          v => (v && v.length >= 3) || 'Фамилие должно состоять из 3-х и более символов'
        ],
        userMiddleNameRules: [
          v => (v === "" || v.length >= 2) || 'Отчество должно состоять из 2-х и более символов'

        ],
        dialog2: false,
        valid: false,
          panel:[],
          firstName: '',
          lastName: '',
          middleName: '',
          nickName:'',
          userSex: 'none',
          picker: null,
          landscape: true,
          reactive: false,
          mStatus:'Неопределено',
          password: '',
          err_3: false
      }
    }
  }
</script>
