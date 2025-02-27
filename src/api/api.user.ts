import axiosRequest from "./api.axios-base";
import type {
    FetchAuth,
    FetchAuthResponse,
    FetchAuthTokenResponse,
    FetchRegister,
    FetchRegisterResponse
} from "../types/fetch.ts";

export const userRegister = async (data: FetchRegister): Promise <FetchRegisterResponse> => {
    try {
        return (await axiosRequest.post(`/reg`, data)).data
    } catch (error) {
        throw error
    }
};

export const userLogin = async (data: FetchAuth): Promise <FetchAuthResponse> => {
    try {
        return (await axiosRequest.post(`/auth`, data)).data
    } catch (error) {
        throw error
    }
};

export const userAuth = async (): Promise <FetchAuthTokenResponse> => {
    try {
        return (await axiosRequest.get(`/auth`)).data
    } catch (error) {
        throw error
    }
};

export const userAuthOut = async ()=> {
    try {
        return (await axiosRequest.delete(`/auth`))
    } catch (error) {
        throw error
    }
};


