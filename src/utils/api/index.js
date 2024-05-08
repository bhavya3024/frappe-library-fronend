import { API_URL } from "../../constants"
import { disableSpin, enableSpin } from "../../actions/spinner";
import axios from "axios"
import { openNotification } from "../notification";
const axiosInstance = axios.create({
    baseURL: API_URL
});

export const get = async ({
    dispatch = function () { },
    path = '',
    params = {},
    notification = false,
}) => {
    try {
        dispatch(enableSpin());
        const { data } = await axiosInstance.get(path, {
            params
        });

        if (notification) {
            openNotification({
                title: 'success',
                description: data.message,
            })
        }
        return data;
    } catch (error) {
        if (notification) {
            openNotification({
                title: 'error',
                description: error?.response?.data?.detail || 'Something Went Wrong',
            })
        }
    } finally {
        dispatch(disableSpin());
    }
}



export const post = async ({
    dispatch = function () { },
    path = '',
    params = {},
    data = {},
    notification = false,
}) => {
    try {
        dispatch(enableSpin());
        const { data: response } = await axiosInstance.post(path, {
            ...data,
        }, {
            ...params,
        });
        if (notification) {
            openNotification({
                title: 'success',
                description: data.message,
            })
        }
        return response;
    } catch (error) {
        if (notification) {
            openNotification({
                title: 'error',
                description: error?.response?.data?.detail || 'Something Went Wrong',
            })
        }
    } finally {
        dispatch(disableSpin());
    }
}


export const put = async (
    {
        dispatch = function () { },
        path = '',
        params = {},
        data,
        notification = false,
    }
) => {
    try {
        dispatch(enableSpin());
        const { data: response } = await axiosInstance.put(path, {
            ...data,
        }, {
            ...params,
        });
        if (notification) {
            openNotification({
                title: 'success',
                description: data.message,
            })
        }
        return response;
    } catch (error) {
        if (notification) {
            openNotification({
                title: 'error',
                description: error?.response?.data?.detail || 'Something Went Wrong',
            })
        }
    } finally {
        dispatch(disableSpin());
    }
}


export const patch = async ({
    dispatch = function () { },
    path = '',
    params = {},
    data,
    notification = false,
}) => {
    try {
        dispatch(enableSpin());

        const { data: response } = await axiosInstance.patch(path, {
            ...data,
        }, {
            ...params,
        });

        if (notification) {
            openNotification({
                title: 'success',
                description: data.message,
            })
        }
        return response;
    } catch (error) {
        if (notification) {
            openNotification({
                title: 'error',
                description: error?.response?.data?.detail || 'Something Went Wrong',
            })
        }
    } finally {
        dispatch(disableSpin());
    }
}


export const del = async ({
    dispatch = function () { },
    path = '',
    params = {},
    notification = false,
}) => {
    try {
        dispatch(enableSpin());
        const { data } = await axiosInstance.delete(path, {
            params
        });

        if (notification) {
            openNotification({
                title: 'success',
                description: data.message,
            })
        }
        return data;
    } catch (error) {
        if (notification) {
            openNotification({
                title: 'error',
                description: error?.response?.data?.detail || 'Something Went Wrong',
            })
        }
    } finally {
        dispatch(disableSpin());
    }
}