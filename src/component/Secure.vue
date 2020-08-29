<script>
    export default {
        data: () => ({

        }),
        computed:{
            getStatusOnlineRules:{
                set(val){this.$store.commit('SET_STATUS_ONLINE_RULES',val)},
                get(){return this.$store.getters.getStatusOnlineRules;}
            },
            getSnack:{
                set(val){this.$store.commit('SET_SNACK',val)},
                get(){return this.$store.getters.getSnack;}
            },
            getValid:{
                set(val){this.$store.commit('SET_VALID',val)},
                get(){return this.$store.getters.getValid;}
            },
            getHeaders(){
                return this.$store.getters.getHeaders
            },
            // getRowsPerPageItems(){
            //     return this.$store.getters.getRowsPerPageItems
            // },
            // getPages(){
            //     this.$store.commit('setPages');
            //     return this.$store.getters.getPages;
            // },
            getPagination:{
                set(val){this.$store.commit('SET_PAGINATION',val)},
                get(){return this.$store.getters.getPagination;}
            },
            getSearch:{
                set(val){this.$store.commit('SET_SEARCH',val)},
                get(){return this.$store.getters.getSearch;}
            },
            getAllUsers(){
                return this.$store.getters.getAllUsers;
            },
            getDialog:{
                set(val){this.$store.commit('SET_DIALOG',val)},
                get(){return this.$store.getters.getDialog}
            },
            getSelected:{
                set(val) {this.$store.commit('SET_SELECTED',val)},
                get(){return this.$store.getters.getSelected}
            },
            getEditedItem:{
                set(val){this.$store.commit('SET_EDITED_ITEM',val)},
                get(){return  this.$store.getters.getEditedItem}
            },
            getLoginRules:{
                set(val){this.$store.commit('SET_LOGIN_RULES', val) },
                get(){return  this.$store.getters.getLoginRules; }
            },
            getPasswordRules:{
                set(val){this.$store.commit('SET_PASSWORD_RULES', val) },
                get(){return  this.$store.getters.getPasswordRules; }
            },
            getEmailRules:{
                set(val){this.$store.commit('SET_EMAIL_RULES', val)
                },get(){return  this.$store.getters.getEmailRules; }
            },
            getLoading:{
                set(val){this.$store.commit('SET_LOADING',val)},
                get(){return this.$store.getters.getLoading;}
            },

            getValidateItem(){
                return  this.$store.getters.getValidateItem
            },
            getEditedIndex(){
                return  this.$store.getters.getEditedIndex
            },
            //Отображение диалогового окна при создании или редактирования полей EditedItem
            //В одном случае отображается заголовок один в другом - другой.
            formTitle() {
                return this.getEditedIndex === -1 ? 'Новый пользователь' : 'Редактирование пользователя'
            },
            getToFormData(){
                return this.$store.getters.getToFormData;
            }
        },
        mounted () {
            //При обновлении страницы загружаем всех пользователей
            this.$store.dispatch('getAllUsers');
        },
        methods: {
            openItem (item) {
                //Переход на страницу пользователя
                this.$router.push({ name: 'userPage', params: { id: item.id }})
            },
            editItem (edit) {
                //При нажатии редактировать, все данные из EditItem в поля, открывается диалог
                //Так же они добавлены в ValidateItem, чтобы это использовать при сохранении (save)
                this.$store.commit('SET_EDITED_ITEM', edit.item);
                this.$store.commit('SET_EDITED_INDEX', edit.index);
                this.$store.commit('SET_DIALOG', true);
            },
            deleteItem (del) {
                //Подтверждении о удалении пользователя
                if(confirm('Вы действительно хотите удалить пользователя '+del.login+'?'))
                {
                    //Добавить в FormData текущего пользователя
                    this.$store.commit('SET_TO_FORM_DATA',del);
                    //Выполнить удаление пользователя выбранного из FormData
                    this.$store.dispatch('deleteUser', this.getToFormData);
                    //Установить в оповещения delete
                    this.$store.commit('SET_SNACK','delete');
                    //Установить в оповещения имя пользователя удаленного
                    this.$store.commit('SET_SNACK_NAME_OTHER_VAL',del.login);
                    //Если последняя страница на которой удален пользователь последний
                    // в списке, перейти на предыдущую
                    if(this.getPagination.totalItems-1 === this.getPagination.rowsPerPage)
                    {
                         return this.getPagination.page--;
                    }
                }
            },
            deleteItems(){
                //Если не выбраны пользователи из чекбоксов и нажата кнопка "Удалить нескольких"
                if(this.getSelected.length === 0){alert('Выберите пользователей для удаления')}
                //Если выбран только один пользователь чекбоксом
                else if(this.getSelected.length === 1){
                    //Удалить единственного пользователя одиночным методом удаления
                    this.deleteItem(this.getSelected[0]);
                }
                //Если выбрано чекбоксом более одного пользователя
                else if(this.getSelected.length > 1) {
                    let listUsers = [];
                    if (confirm('Вы действительно хотите удалить выбранных пользователей?')) {
                        //Перебор выбранных чекбоксом пользователей
                        for (let i = 0; i < this.getSelected.length; i++) {
                            //this.$store.commit('SET_EDITED_INDEX', this.getSelected[i]);
                            //Добавить в FormData текущего пользователя
                            this.$store.commit('SET_TO_FORM_DATA',this.getSelected[i]);
                            //Выполнить удаление пользователя выбранного из FormData
                            this.$store.dispatch('deleteUser',this.getToFormData);
                            //Добавить в список имя пользователя удаленного
                            listUsers.push(' '+this.getSelected[i].login);
                        }
                        //Если последняя страница на которой удален пользователь последний
                        // в списке, перейти на предыдущую
                        // if((this.getPagination.totalItems-this.getSelected.length) === this.getPagination.rowsPerPage)
                        // {
                        //     return this.getPagination.page--;
                        // }
                        //Установить в оповещения delete
                        this.$store.commit('SET_SNACK','delete');
                        //Установить в оповещения имени весь список пользователей удаленных
                        this.$store.commit('SET_SNACK_NAME_OTHER_VAL',listUsers);
                    }
                }
            },
            close () {
                //Диалог закрывается
                this.$store.commit('SET_DIALOG', false);
                //Имя если было введено при закрытии добавляется в оповещение
                this.$store.commit('SET_SNACK_NAME');
                //Очистка Полей EditedItem, индекс в -1, чтобы по умолчанию открывалось окно
                //новый поьзователь при нажатии одноименной кнопки.
                setTimeout(() => {
                    this.$store.commit('SET_CLEAR_EDITED_ITEM');
                    this.$store.commit('SET_EDITED_INDEX', -1);
                }, 300);
                //Если в данный момент перед тем как сработало закрытие формы
                //не был создан поьзователь, отменен и была ошибка тогда вернуть сообщение
                //"отменено" с именем ранее выбранного пользователя  - this.$store.commit('SET_SNACK_NAME');
                if(this.getSnack.snackText !== 'Создан' || this.getSnack.snackText !== 'Отмена' || this.getSnack.snackText !== 'Ошибка'){
                    return this.$store.commit('SET_SNACK','close');
                }
                else {
                    return 0
                }
            },
            save () {
                //создаем переменную в которой можно поместить две метки ибо save либо new
                let newOrSave = '';
                //Если при нажатии save был выбран конкретный пользователь для редактирования
                if (this.getEditedIndex > -1) {
                    //Если при после открытии формы были сделаны изменения
                    if(JSON.stringify(this.getEditedItem) !== JSON.stringify(this.getValidateItem)){
                        //Помещаю в массив users обьект с его текущем индексом в таблице
                        this.$store.commit('SET_USER_TRANSFER');
                        //Добавить в FormData текущего пользователя
                        this.$store.commit('SET_TO_FORM_DATA',this.getEditedItem);
                        //Выполнить обновление пользователя выбранного из FormData
                        this.$store.dispatch('getUpdateUser',this.getToFormData);
                    }
                    //создаем значение - save, и не выполняем никаких работ с сервером
                    newOrSave = 'save';

                } else {//Если при нажатии save был выбран новый пользователь
                    //Не выполняем никаких проверок, а следом добавляем данные в FormData
                    this.$store.commit('SET_TO_FORM_DATA', this.getEditedItem);
                    //Выполнить создание пользователя выбранного из FormData
                    this.$store.dispatch('register', this.getToFormData);
                    //создаем значение - create
                    newOrSave = 'create'
                }
                //Закрываем диалог, чистим EditedItem
                this.close();
                //Если при работе с сервером не было ошибок то помещаем либо "сохранено",либо "создано"
                //в текст сообщения.
                //На практике же оповещение об ошибке выполнится следом за сообщением о сохранении или создании
                //дав понять, что данная операция не бала совершена.
                if(this.getSnack.snackText !== 'Ошибка'){
                    this.$store.commit('SET_SNACK',newOrSave);
                }
            },
            onSubmit(val) { //После нажатия кнопок 'clear', 'close', 'save'
                // Выполняется очистка
                if(val === 'clear'){
                    if (confirm('Вы действительно хотите очистить форму?')) {
                        //Удаляем валидацию
                        this.$refs.form.reset();
                    }
                }
                if(val === 'close'){
                    //Закрываем диалог, чистим EditedItem
                    this.close();
                    //Удаляем валидацию
                    this.$refs.form.reset();
                    //Повторная чистка EditItem и отображение
                    this.$store.commit('SET_CLEAR_EDITED_ITEM');
                    return this.getEditedItem;
                }
                //Выполняем сохранение при удачной валидации
                if (this.$refs.form.validate()) {
                    if(val === 'save'){this.save()}
                    //Иначе просто ошибка в консоль, казусный случай обхода валидации
                    else {console.log('error');}
                }

            }
        },

    }
</script>

<template>

    <div>
        <v-toolbar flat color="#fafafa">
            <v-toolbar-title>Пользователи</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <div>
                <!--Кнопка удаления выбранного(ых) пользователя(ей) чекбоксом-->
                <v-btn
                        class="left white v-btn--small "
                        @click="deleteItems(getSelected)"
                >
                    <v-icon
                            small
                            class="mr-2"
                    >
                        delete
                    </v-icon>Удалить выбранные</v-btn></div>
            <v-spacer></v-spacer>
            <v-card-title>
                <v-spacer></v-spacer>
                <!--Поиск пользоватея(ей)-->
                <v-text-field
                        v-model="getSearch"
                        append-icon="search"
                        label="Поиск"
                        single-line
                ></v-text-field>
            </v-card-title>
            <!--Диалоговое окно создания или редактирования пользоватея-->
            <v-dialog v-model="getDialog" max-width="500px"

                      @save="save"
                      @cancel="close"
            >
                <v-btn slot="activator"  class="left white v-btn--small"><v-icon
                        small
                        class="mr-2"
                >
                    assignment_ind
                </v-icon>Новый пользователь</v-btn>
                <v-card>
                    <!--Новый поьзователь или Редактировть пользователя-->
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-form  v-model="getValid" ref="form" validation>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            required
                                            :counter="3"
                                            v-model="getEditedItem.login"
                                            label="Login"
                                            name="login"
                                            prepend-icon=""
                                            :rules="getLoginRules"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            required
                                            v-model="getEditedItem.email"
                                            label="Емайл"
                                            prepend-icon="email"
                                            name="email"
                                            type="email"
                                            :rules="getEmailRules"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                            required
                                            :counter="6"
                                            v-model="getEditedItem.password"
                                            label="Пароль"
                                            prepend-icon="lock"
                                            name="password"
                                            type="password"
                                            :rules="getPasswordRules"
                                    ></v-text-field>
                                </v-flex>
<!--                                <v-flex xs12 sm6 md6>-->
<!--                                    <v-text-field statusOnlineRules-->
<!--                                                  required-->
<!--                                                  :counter="6"-->
<!--                                                  v-model="getEditedItem.statusOnline"-->
<!--                                                  :rules="getStatusOnlineRules"-->
<!--                                                  label="Онлайн"-->
<!--                                                  name="o"-->
<!--                                                  prepend-icon=""-->
<!--                                    ></v-text-field>-->
<!--                                </v-flex>-->
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <!--Кнопки:
                                     очистка - 'clear',
                                     отмена - 'close',
                                     сохранить - 'save'(с валидацией)-->
                                    <v-btn
                                            color="blue darken-1"
                                            flat
                                            @click.native="onSubmit('clear')"
                                    >Очистить</v-btn>
                                    <v-btn
                                            color="blue darken-1"
                                            flat
                                            @click.native="onSubmit('close')"
                                    >Отменить</v-btn>
                                    <v-btn
                                            color="primary"
                                            @click.native="onSubmit('save')"
                                            :disabled="!getValid"
                                    >Сохранить</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-container>
                    </v-card-text>


                </v-card>
            </v-dialog>
        </v-toolbar>
        <!--Таблица пользователей-->

<!--         :rows-per-page-items="getRowsPerPageItems"-->

        <v-data-table
                :loading="getLoading"
                :headers="getHeaders"
                :items="getAllUsers"
                :search="getSearch"
                :pagination.sync="getPagination"
                class="elevation-1"
                content-tag="v-layout"
                v-model="getSelected"
                select-all
                item-key="id"
        >
            <!--Одно поле-->
            <template slot="items" slot-scope="props"  >

                <td>
                    <!--Выбрать пользователя(ей) для удаления-->
                    <v-checkbox
                            v-model="props.selected"
                            primary
                            hide-details
                    ></v-checkbox>
                </td>
                <td>{{ props.item.id }}</td>
                <td class="text-xs-right">{{ props.item.login }}</td>
                <td class="text-xs-right">{{ props.item.email }}</td>
                <td class="text-xs-right">{{ props.item.password }}</td>
<!--                <td class="text-xs-right">{{ props.item.statusOnline }}</td>-->

                <td class="justify-center layout px-0">
                    <!--Кнопки на каждом из полей для действий-->
                    <!--Перейти в профиль пользователя-->
                    <v-icon
                            small
                            class="mr-2"
                            @click="openItem(props.item)"
                    >
                        person
                    </v-icon>
                    <!--Редактировать пользователя-->
                    <v-icon
                            small
                            class="mr-2"
                            @click="editItem(props)"
                    >
                        edit
                    </v-icon>
                    <!--Удалить пользователя-->
                    <v-icon
                            small
                            @click="deleteItem(props.item)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>
            <!--Список страниц дополнительное меню в таблице(с выбором коичества полей)-->
<!--            <template slot="pageText" slot-scope="props">-->
<!--                Строка {{ props.pageStart }} - {{ props.pageStop }} из {{ props.itemsLength }}-->
<!--            </template>-->
            <!--Отображение при поиске в случае еси результатов нет-->
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Ваш запрос "{{ getSearch }}" не имеет результатов.
            </v-alert>
        </v-data-table>
        <!--Список страниц-->
<!--        <div class="text-xs-center pt-2">-->
<!--            <v-pagination  v-model="getPagination.page" :length="getPages" :total-visible="7"-->
<!--            ></v-pagination>-->
<!--        </div>-->
        <!--Всплывающие оповещения-->
        <v-snackbar v-model="getSnack.snackValue" :timeout="2000" :color="getSnack.snackColor">
            {{ getSnack.snackText + ' ' + getSnack.name}}
            <v-btn flat @click="getSnack.snackValue = false">Close</v-btn>
        </v-snackbar>

    </div>

</template>
<style>
    v-flex input {
        border: 1px solid silver;
        border-radius: 4px;
        background: white;
        padding: 5px 10px;
    }

    .dirty {
        border-color: #5A5;
        background: #EFE;
    }

    .dirty:focus {
        outline-color: #8E8;
    }

    .error {
        border-color: red;
        background: #FDD;
    }

    .error:focus {
        outline-color: #F99;
    }
    v-flex input {
        border: 1px solid silver;
        border-radius: 4px;
        background: white;
        padding: 5px 10px;
    }

    .dirty {
        border-color: #5A5;
        background: #EFE;
    }

    .dirty:focus {
        outline-color: #8E8;
    }

    .error {
        border-color: red;
        background: #FDD;
    }

    .error:focus {
        outline-color: #F99;
    }
</style>

