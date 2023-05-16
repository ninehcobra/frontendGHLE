import { removeTypeDuplicates } from "@babel/types"
import axios from "../axios"

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-user?id=${id}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-a-new-user', data)
}

const deleteUserService = (id) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: id
        }
    })
}
const getAllProvinceService = () => {
    return axios.get('/api/province')
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllDistrictService = (id) => {
    return axios.get(`/api/district?provinceId=${id}`)
}

const getAllCodeService = (type) => {
    return axios.get(`/api/allcode?type=${type}`)
}
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllProvinceService, getAllDistrictService, getAllCodeService }