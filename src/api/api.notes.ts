import type {FetchNotes, FetchNotesResponse} from "../types/fetch.ts";
import axiosRequest from "./api.axios-base.ts";

export const getNotesUser = async (): Promise <FetchNotesResponse[]> => {
    try {
        return (await axiosRequest.get(`/notes`)).data
    } catch (error) {
        throw error
    }
};

export const sendNotesUser = async (data: FetchNotes): Promise <FetchNotesResponse[]> => {
    try {
        return (await axiosRequest.post(`/notes`, data)).data
    } catch (error) {
        throw error
    }
};

export const dellNotes = async (id: number): Promise <FetchNotesResponse[]> => {
    try {
        return (await axiosRequest.delete(`/notes/${id}`,)).data
    } catch (error) {
        throw error
    }
}
