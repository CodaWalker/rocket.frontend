import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {mapGetters} from "vuex/dist/vuex.esm.browser";
import {dispatch} from "rxjs/internal-compatibility";
import CoreService from "../service/core.service.js";

Vue.use(Vuex)
// eslint-disable-next-line no-unused-vars

// export async function check(v) {
// 	store.dispatch("checkEmail",v);
// 	console.log("v: "+v);
// 	console.log("isEmail: "+store.getters.getIsEmail);
// 	return store.getters.getIsEmail
// }
let store;
export default store = new Vuex.Store({
	state: {
		host: 'http://91.247.248.231',
		port: ":9000",
  		status: '',
  		token: localStorage.getItem('token') || '',
		valid: false,
		loading: false,
			isEmail: false,
		errorMessage:'',
		successMessage:'',
		snack:{
			snackValue: false,
			snackColor: '',
			snackText: '',
			name:''
		},
		snackSave:{
			snackValue: true,
			snackColor: '#4CAF50',
			snackText: 'Сохранен',
		},
		snackDelete:{
			snackValue: true,
			snackColor: '#F44336',
			snackText: 'Удален',
		},
		snackClose:{
			snackValue: true,
			snackColor: '#EF6C00',
			snackText: 'Отмена',
		},
		snackCreate:{
			snackValue: true,
			snackColor: '#0277BD',
			snackText: 'Создан',
		},
		snackError:{
			snackValue: true,
			snackColor: '#B71C1C',
			snackText: 'Ошибка',
		},
		headers: [
			{
				text: 'ID',
				align: 'left',
				sortable: true,
				value: 'id'
			},
			{ text: 'Login', value: 'login' },
			{ text: 'Емайл', value: 'email' },
			{ text: 'Пароль', value: 'password' },
			// { text: 'Онлайн', value: 'statusOnline' },
			{ text: 'Действия', value: 'id', sortable: false }
		],
		search: "",
		users: [],
		pages: 1,
		dialog: false,
		editedIndex: -1,
		selected: [],
		editedItem: {
			login: '',
			email: '',
			password: '',
			statusOnline: '',
		},
		validateItem: {
			login: '',
			email: '',
			password: '',
			statusOnline: '',
		},
		defaultItem: {
			login: '',
			email: '',
			password: '',
			statusOnline: '',
		},
		pagination: {
			rowsPerPage: 8,
			sortBy: 'id',
			totalItems: 0,
		},
		rowsPerPageItems: [4, 8, 12,
			{"text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1}
		],
		formData:{},
		userId: "",
		user: {
			login: '',
			email: '',
			password: '',
			confirmPassword:'',
		},
		loginRules: [
			v => !!v || 'Имя обязательно для заполнения',
			v => (v && v.length >= 3) || 'Имя не может быть менее 3 символов'
		],
		emailRules: [
			v => !!v || 'Требуется E-mail',
			v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail должен быть действительным',
			// v =>  check(v) || 'Присутствует уже в базе'
		],
		passwordRules: [
			v => !!v || 'Необходим пароль',
			v => (v && v.length >= 6) || 'Пароль должен быть равен больше 6 символов'
		],
		confirmPasswordRules:[
			v => !!v || 'Необходим пароль',
			v => v === this.getUser().password || 'Пароль должен соответствовать'
		]
	},
	mutations: {
		SET_USER_ID(state,val){
			state.userId = val;
		},
		SET_TO_FORM_DATA(state,val){

			// let form_data = new FormData();
			// for (   let key in val ) {
			// 	form_data.append(key, val[key]);
			// }
			// console.log(form_data.values());
			state.formData = val;
		},
		SET_DIALOG(state, val) {
			//console.log(val);
			state.dialog = val;
		},
		SET_EDITED_ITEM(state, item) {
			state.editedIndex = state.users.indexOf(item);
			state.editedItem = Object.assign({}, item);
			state.validateItem = Object.assign({}, item);
			state.dialog = !state.dialog;
			// state.validateItem = Object.assign({}, item);
		},
		SET_USER_TRANSFER(state) {
			state.users[state.editedIndex] = state.editedItem;
		},
		SET_EDITED_INDEX(state, index) {
			console.log(index);
			state.editedIndex = index;
		},
		SET_CLEAR_EDITED_ITEM(state) {
			state.editedItem = Object.assign({}, state.defaultItem);
		},
		SET_CLEAR_SELECTED(state) {
			state.selected = [];
		},
		SET_SELECTED(state, val) {
			state.selected = val;
		},
		AUTH_REQUEST(state){
	    	state.status = 'loading'
	  	},
	  	AUTH_SUCCESS(state, token, user){
		    state.status = 'success'
		    state.token = token
		    state.user = user
	  	},
		SET_USER(state,user){
			state.user = user
		},
		SET_LOGIN(state,login){
			state.user.login = login;
		},
		SET_EMAIL(state,email){
			state.user.email = email;
		},
		SET_PASSWORD(state,password){
			state.user.password = password;
		},
		SET_CONFIRM_PASSWORD(state,password){
			state.user.confirmPassword = password;
		},
	  	AUTH_ERROR(state){
	    	state.status = 'error'
	  	},
	  	LOGOUT(state){
	    	state.status = ''
	    	state.token = ''
	  	},
		SET_VALID(state,val) {
			state.valid = val;
		},
		SET_IS_EMAIL(state,val) {
			state.isEmail = val;
		},
		SET_LOGIN_RULES(state,val){
			state.loginRules = val
		},
		SET_EMAIL_RULES(state,val){
			state.emailRules = val
		},
		SET_PASSWORD_RULES(state,val){
			state.passwordRules = val
		},
		SET_CONFIRM_PASSWORD_RULES(state,val){
			state.confirmPasswordRules = val
		},
		SET_PAGES(state) {
			if (state.pagination.rowsPerPage === null ||
				state.pagination.totalItems === null
			) {
				state.pages = 1;
			}
			state.pages = Math.ceil(state.pagination.totalItems / state.pagination.rowsPerPage)
		},
		SET_PAGINATION(state, val) {
			state.pagination = val;
		},
		SET_PAGINATION_TOTAL_ITEMS(state, users) {
			state.pagination.totalItems = users;
		},
		SET_SEARCH(state, val) {
			state.search = val;
			this.dispatch("getAllUsers")
		},
		SET_SNACK(state,val){
			//state.snack.name = state.editedItem.login;
			if(val === 'save'){
				state.snack = Object.assign(state.snack, state.snackSave);
			}
			else if(val === 'delete'){
				state.snack = Object.assign(state.snack, state.snackDelete);
			}
			else if(val === 'close'){
				if(state.snackClose.name !== 'undefined'){
					state.snack = Object.assign(state.snack, state.snackClose);
				}
				else{
					state.snackClose.name = '';
					state.snack = Object.assign(state.snack, state.snackClose);
				}
			}
			else if(val === 'create'){
				state.snack = Object.assign(state.snack, state.snackCreate);
			}
			else if(val === 'error'){
				state.snack = Object.assign(state.snack, state.snackError);
			}
			else {
				state.snackError.name = 'неизвестная';
				state.snack = Object.assign(state.snack, state.snackError);
			}

		},
		SET_SNACK_NAME(state){
			state.snack.name = state.editedItem.login;},
		SET_SNACK_NAME_OTHER_VAL(state,val){
			if(val === 'обновления'){
				return  state.snack.name = val +' '+ state.snack.name;}
			if(val === 'создания'){
				return  state.snack.name = val +' '+ state.snack.name;}
			if(val === 'удаления'){
				return  state.snack.name = val +' '+ state.snack.name;}
			state.snack.name = val;
			},
		SET_ALL_USERS(state, users) {
			state.users = users
		},
		SET_LOADING(state,payload) {
			state.loading = payload;
		},
		SET_ERROR_MESSAGE(state,payload) {
			state.errorMessage = payload;
		},
	},
	actions: {
	  	login({state,commit}, user){
	  		console.log(user);
	  		user.email = "fierymail@list.ru"
	        return new Promise((resolve, reject) => {
	            commit('AUTH_REQUEST')
	            axios({url: state.host+state.port+'/api/service/login', data: user, method: 'POST' })
	            .then(resp => {
	                const token = resp.data.token;
	                const user = resp.data;
					console.log(resp.data);
	                localStorage.setItem('token', token)
	                localStorage.setItem('userId', user.id)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('AUTH_SUCCESS', token, user)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('AUTH_ERROR')
	                localStorage.removeItem('token')
					localStorage.removeItem('userId')
					reject(err)
	            })
	        })
	    },
	    register({state,commit}, user){
	  		console.log(user)
	    	return new Promise((resolve, reject) => {
	            commit('AUTH_REQUEST')
	            axios({url: state.host+state.port+'/api/service/register', data: user, method: 'POST' })
	            .then(resp => {
	            	console.log(resp.status);
	                const user = resp.data;
					console.log(user);
	                commit('AUTH_REQUEST');
	                resolve(resp)
					this.dispatch('getAllUsers');
				})
	            .catch(err => {
	            	console.log(err);
	                commit('AUTH_ERROR', err);
	                 // localStorage.removeItem('token')
					// localStorage.removeItem('userId')
	                reject(err);
	            })
	        })
	    },
		getUpdateUser({state,commit}, obj) {
			commit('SET_LOADING', true);///update/{id}
			let id = obj.id;
			axios.post(state.host+state.port+"/api/user/update/"+id, obj)
				.then(response => {
					if (response.data.error) {
						let errorMessage = response.data.message;
						commit('SET_ERROR_MESSAGE',errorMessage);
						commit('SET_SNACK_NAME_OTHER_VAL','обновления');
						commit('SET_SNACK','error');
					} else {
						this.successMessage = response.data.message;
						this.dispatch('getAllUsers');
					}
				});
			setTimeout(() => {commit('SET_LOADING', false);}, 1000);
		},
		deleteUser({state,commit}, formData) {
			commit('SET_LOADING', true);
			let id = formData.id;
			 axios.post(state.host+state.port+"/api/user/delete/"+ id)
				.then(response => {
					console.log(response);
					commit('SET_CLEAR_SELECTED');
					if (response.data.error) {
						let errorMessage = response.data.message;
						commit('SET_ERROR_MESSAGE',errorMessage);
						commit('SET_SNACK_NAME_OTHER_VAL','удаления');
						commit('SET_SNACK','error');
					} else {
						this.successMessage = response.data.message;
						this.dispatch('getAllUsers');
					}
				});
			setTimeout(() => {commit('SET_LOADING', false);}, 1000);
		},
		 checkEmail({state,commit}, email){
			return new Promise((resolve, reject) => {
				commit('AUTH_REQUEST')
				const config = { headers: {'Content-Type': 'application/json'} };
				axios({url: state.host+state.port+'/api/service/is-email', data: {"email":email}, method: 'POST' },config)
					.then(response => {
						const isEmail = response.data
						commit('SET_IS_EMAIL',isEmail)
						resolve(response)
					})
					.catch(err => {
						let errorMessage = err.data.message;
						commit('SET_ERROR_MESSAGE',errorMessage);
						// commit('SET_IS_EMAIL',false)
						// localStorage.removeItem('token')
						// localStorage.removeItem('userId')
						reject(err)
					})
			})
		},
	  	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('LOGOUT')
		      	localStorage.removeItem('token')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	},
		getAllUsers({state,commit}) {
			commit('SET_LOADING', true);
			if(state.search!==""){
				axios.get(state.host+state.port+"/api/user/search/"+state.search.trim().toLowerCase())
					.then(response => {
						console.log(response);
						if (response.data.error) {
							let errorMessage = response.data.message;
							commit('SET_ERROR_MESSAGE', errorMessage);
						} else {
							let users = response.data;
							let totalItems = users.length;
							commit('SET_ALL_USERS', users);
							commit('SET_PAGINATION_TOTAL_ITEMS', totalItems);
						}
					});
			}else {
				axios.get(state.host+state.port+"/api/user/get")
					.then(response => {
						console.log(response);
						let search = this.state.search.trim().toLowerCase();

						if (response.data.error) {
							let errorMessage = response.data.message;
							commit('SET_ERROR_MESSAGE', errorMessage);
						} else {
							let users = response.data;
							let totalItems = users.length;
							commit('SET_ALL_USERS', users);
							commit('SET_PAGINATION_TOTAL_ITEMS', totalItems);

						}
					});
			}
			setTimeout(() => {commit('SET_LOADING', false);}, 1000);
		},
		getUser({state,commit}) {
			commit('SET_LOADING', true);
			let id = state.userId;
			axios.get(state.host+state.port+"/api/user/get/"+id)
				.then(response => {
					let user = response.data;
					commit('SET_USER', user);
				})
				.catch(err => {
					let errorMessage = err.response;
					commit('SET_ERROR_MESSAGE',errorMessage);
					CoreService.errorProcessing(err);
					return Promise.reject(err);
				});

			setTimeout(() => {commit('SET_LOADING', false);}, 1000);
		},
	},
	getters : {
		getAllUsers:(state) => state.users,
		isLoggedIn: state => !!state.token,
	  authStatus: state => state.status,
		getUser:state => state.user,
		getErrorMessage:state => state.errorMessage,
		getLoading:state => state.loading,
		getPassword:(state) => state.password,
		getConfirmPassword:(state) => state.confirmPassword,
		getLogin:(state) => state.login,
		getEmail:(state) => state.email,
		getValid:(state) => state.valid,
		getIsEmail:(state) => state.isEmail,
		getLoginRules:(state) => state.loginRules,
		getEmailRules:(state) => state.emailRules,
		getPasswordRules:(state) => state.passwordRules,
		getConfirmPasswordRules:(state) => state.confirmPasswordRules,
		getSnack:(state) => state.snack,
		getEditedItem:(state) => state.editedItem,
		getEditedIndex:(state) => state.editedIndex,
		getDialog:(state) => state.dialog,
		getToFormData:(state) => state.formData,
		getPagination:(state) => state.pagination,
		getSelected:(state) => state.selected,
		getSearch:(state) => state.search,
		getUserId:(state) => state.userId,
	}
})
