import axios from "axios";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


export const UserService = {
    getAll,
    getAllByFilter,
    getOne,
    createOne,
    updateOne,
    deleteOne
};

function getAll() {
    return axios({url: 'http://localhost:9000/api/service/login', method: 'GET'});
}
function getAllByFilter() {
    return axios({url: 'http://localhost:9000/api/service/login', method: 'GET'});
}
function getOne(user) {
    axios({url: 'http://localhost:9000/api/service/register', data: user, method: 'POST'})
}
function createOne(user) {
    axios({url: 'http://localhost:9000/api/service/register', data: user, method: 'POST'})
}
function updateOne(user) {
    axios({url: 'http://localhost:9000/api/service/register', data: user, method: 'POST'})
}
function deleteOne(user) {
    axios({url: 'http://localhost:9000/api/service/register', data: user, method: 'POST'})
}
