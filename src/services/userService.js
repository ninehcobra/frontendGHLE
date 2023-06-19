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

const createNewWareHouse = (data) => {
    return axios.post('/api/create-warehouse', data)
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

const getFeeService = () => {
    return axios.get('/api/fee')
}

const createNewOrderService = (data) => {
    return axios.post('/api/create-order', data)
}

const getOrderReceptionService = () => {
    return axios.get('/api/get-order-reception')
}

const getOrderDetail = (id) => {
    return axios.get(`api/get-order-history?id=${id}`)
}

const getAddressName = async (id) => {
    return await axios.get(`/api/get-address-name?id=${id}`)
}

const getNearestWarehouse = async (lat, lng) => {
    return await axios.get(`/api/get-nearest-warehouse?lat=${lat}&lng=${lng}`)
}

const getProvinceByDistrict = async (provinceId) => {
    return await axios.get(`/api/get-province-by-district?id=${provinceId}`)
}

const getUserOrder = async (data) => {
    return await axios.get(`/api/get-user-order?id=${data.id}&status=${data.status}&startDate=${data.startDate}&endDate=${data.endDate}`)
}

const getNew = async (limit) => {
    return await axios.get(`api/get-new?limit=${limit}`)
}

const getNewById = async (id) => {
    return await axios.get(`api/get-new-by-id?id=${id}`)
}

const saveNew = async (data) => {
    return await axios.post('/api/save-new', data)
}

export {
    handleLoginApi
    , getAllUsers
    , createNewUserService
    , deleteUserService
    , editUserService
    , getAllProvinceService
    , getAllDistrictService
    , getAllCodeService
    , getFeeService,
    createNewOrderService,
    getOrderReceptionService,
    getOrderDetail,
    createNewWareHouse,
    getAddressName,
    getNearestWarehouse,
    getProvinceByDistrict,
    getUserOrder,
    getNew,
    saveNew,
    getNewById
}