
import { feature } from "./feature";
import service from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetch = createAsyncThunk(`${feature}/fetch`, async (data: any, { rejectWithValue }) => {

    try {

        
        const response = await service.get(`/${feature}?page=${data.page}&search=${data.search}&filter=${JSON.stringify(data)}`);

        console.log(response);

        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(error.response)
    }
});

const create = createAsyncThunk(`${feature}/create`, async (data: any, { rejectWithValue }) => {
    try {
        const response = await service.create(`/${feature}`, data)
        return response.data
    } catch (error: any) {
        return rejectWithValue(error.response)
    }
});

const edit = createAsyncThunk(`${feature}/edit`, async (id: string, { rejectWithValue }) => {
    try {
        const response = await service.edit(`/${feature}/${id}/edit`)
        return response.data
    } catch (error: any) {
        return rejectWithValue(error.response)
    }
});

const update = createAsyncThunk(`${feature}/update`, async (data: any, { rejectWithValue }) => {
    return await service.update(`/${feature}/${data.id}`, data).then((response) => response.data).catch((error) =>  rejectWithValue(error.response))
});

const destroy = createAsyncThunk(`${feature}/destroy`, async (id: string, { rejectWithValue }) => {
    return await service.destroy(`/${feature}/${id}`).then((response) => response.data).catch((error) => rejectWithValue(error.response))
});

const multiDestroy = createAsyncThunk(`${feature}/multiDestroy`, async (ids: number[], { rejectWithValue }) => {
    return await service.multiDestroy(`/${feature}/multiDestroy/${ids}`).then((response) => response.data).catch((error) =>  rejectWithValue(error.response))
});

export const API = {
    fetch,
    create,
    update,
    destroy,
    multiDestroy,
    edit
}

export default API;
