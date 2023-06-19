import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';
import { createNewUserService, getAllUsers, deleteUserService, editUserService, getFeeService, createNewOrderService, getOrderReceptionService } from '../../services/userService';
import { toast } from 'react-toastify'

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("gender");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed())
            console.log("fetchGenderStart failed", error)
        }

    }

}


export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchNoteSuccess = (data) => ({
    type: actionTypes.FETCH_NOTE_SUCCESS,
    data: data
})

export const fetchNoteFailed = () => ({
    type: actionTypes.FETCH_NOTE_FAILED
})

export const fetchPaySuccess = (data) => ({
    type: actionTypes.FETCH_PAY_SUCCESS,
    data: data
})

export const fetchPayFailed = () => ({
    type: actionTypes.FETCH_PAY_FAILED
})

export const fetchFeeSuccess = (data) => ({
    type: actionTypes.FETCH_FEE_SUCCESS,
    data: data
})

export const fetchFeeFailed = () => ({
    type: actionTypes.FETCH_FEE_FAILED
})

export const fetchFeeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getFeeService();
            if (res && res.errCode === 0) {
                dispatch(fetchFeeSuccess(res.data))
            }
            else {
                dispatch(fetchFeeFailed())
            }
        } catch (error) {
            dispatch(fetchFeeFailed())
            console.log("fetchFeeStart failed", error)
        }

    }

}

export const fetchPayStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("pay");
            if (res && res.errCode === 0) {
                dispatch(fetchPaySuccess(res.data))
            }
            else {
                dispatch(fetchPayFailed())
            }
        } catch (error) {
            dispatch(fetchPayFailed())
            console.log("fetchPayStart failed", error)
        }

    }

}


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("role");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed())
            console.log("fetchRoleStart failed", error)
        }

    }

}

export const fetchNoteStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("note");
            if (res && res.errCode === 0) {
                dispatch(fetchNoteSuccess(res.data))
            }
            else {
                dispatch(fetchNoteFailed())
            }
        } catch (error) {
            dispatch(fetchNoteFailed())
            console.log("fetchNoteStart failed", error)
        }

    }

}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('🥳 Create user success!!')
                console.log("check create user", res)
                dispatch(saveUserSucces())
                return true;
            }
            else {
                toast.error(`😔 ${res.message}`)
                dispatch(saveUserFailed())
                return false;
            }
        } catch (error) {
            dispatch(saveUserFailed())
            toast.error(`😔 ${error}`)
            console.log("saveUserFailed failed", error)
            return false;
        }

    }
}

export const createNewOrder = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewOrderService(data);
            if (res && res.errCode === 0) {
                toast.success('🥳 Create Order success!!')
                console.log("check create Order", res)
                dispatch(createOrderSucces())
            }
            else {
                toast.error(`😔 ${res.message}`)
                dispatch(createOrderFailed())
            }
        } catch (error) {
            dispatch(createOrderFailed())
            toast.error(`😔 ${error}`)
            console.log("saveOrderFailed failed", error)
        }

    }
}

export const createOrderSucces = () => ({
    type: 'CREATE_ORDER_SUCCESS'
})

export const createOrderFailed = () => ({
    type: 'CREATE_ORDER_FAILED'
})

export const saveUserSucces = () => ({
    type: 'CREATE_USER_SUCCESS'
})

export const saveUserFailed = () => ({
    type: 'CREATE_USER_FAILED'
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }
            else {
                toast.error('😔 Fetch user error!!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                dispatch(fetchAllUsersFailed())
            }
        } catch (error) {
            toast.error('😔 Fetch user error!!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            dispatch(fetchAllUsersFailed())
            console.log("fetchAllUsersStart failed", error)
        }

    }

}

export const fetchOrderReceptionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getOrderReceptionService();
            if (res && res.errCode === 0) {
                dispatch(fetchOrderReceptionSuccess(res.data))
            }
            else {
                dispatch(fetchOrderReceptionFailed())
            }
        } catch (error) {
            dispatch(fetchOrderReceptionFailed())
            console.log("fetchOrderReceptionStart failed", error)
        }

    }

}

export const fetchOrderReceptionSuccess = (data) => ({
    type: 'FETCH_ORDER_RECEPTION_SUCCESS',
    users: data
})

export const fetchOrderReceptionFailed = () => ({
    type: 'FETCH_ORDER_RECEPTION_FAILED'
})

export const fetchAllUsersSuccess = (data) => ({
    type: 'FETCH_ALL_USERS_SUCCESS',
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: ' FETCH_ALL_USERS_FAILED'
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('🥳 Delete user success!!')
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            }
            else {
                toast.error('😔 Delete user success error!!')
                dispatch(deleteUserFailed())
            }
        } catch (error) {
            dispatch(deleteUserFailed())
            console.log("deleteUserFailed failed", error)
        }

    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('🥳 Edit user success!!')
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            }
            else {
                toast.error('😔 Delete user success error!!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                dispatch(editUserFailed())
            }
        } catch (error) {
            dispatch(editUserFailed())
            console.log("editUserFailed failed", error)
        }

    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})