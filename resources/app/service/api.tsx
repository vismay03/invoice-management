
import service from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";





const fetchCategory = createAsyncThunk(`category/fetch`, async () => {
    try {
        const response = await service.get(`/get/category`);

        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchSubCategory = createAsyncThunk(`subcategory/fetch`, async () => {
    try {
        const response = await service.get(`/get/subcategory`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchSize = createAsyncThunk(`size/fetch`, async () => {
    try {
        const response = await service.get(`/get/size`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchFinish = createAsyncThunk(`finish/fetch`, async () => {
    try {
        const response = await service.get(`/get/finish`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchHsn = createAsyncThunk(`hsn/fetch`, async () => {
    try {
        const response = await service.get(`/get/hsn`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchThickness = createAsyncThunk(`thickness/fetch`, async () => {
    try {
        const response = await service.get(`/get/thickness`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchSeries = createAsyncThunk(`series/fetch`, async () => {
    try {
        const response = await service.get(`/get/series`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchColor = createAsyncThunk(`color/fetch`, async () => {
    try {
        const response = await service.get(`/get/color`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchCountry = createAsyncThunk(`country/fetch`, async () => {
    try {
        const response = await service.get(`/get/country`);

        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchState = createAsyncThunk(`state/fetch`, async (country_id?: string) => {
    try {
        const response = await service.get(`/get/state?country_id=${country_id || ""}`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchCity = createAsyncThunk(`city/fetch`, async (state_id?: string ) => {
    try {
        const response = await service.get(`/get/city?state_id=${state_id || ""}`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchAccountType = createAsyncThunk(`accountType/fetch`, async () => {
    try {
        const response = await service.get(`/get/accountType`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});


const fetchIndustry = createAsyncThunk(`industry/fetch`, async () => {
    try {
        const response = await service.get(`/get/industry`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchLeadStatus = createAsyncThunk(`leadStatus/fetch`, async () => {
    try {
        const response = await service.get(`/get/leadStatus`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchLeadSource = createAsyncThunk(`leadSource/fetch`, async () => {
    try {
        const response = await service.get(`/get/leadSource`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchProducts = createAsyncThunk(`products/fetch`, async () => {
    try {
        const response = await service.get(`/get/products`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const login = createAsyncThunk(`login`, async (data: any) => {
    try {
        const response = await service.create(`/login`, data);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const getUser =  createAsyncThunk(`user`, async () => {
    try {
        const response = await service.get(`/get/user`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const logout = createAsyncThunk(`logout`, async () => {
    try {
        const response = await service.create(`/logout`, {});
        return response.data;
    } catch (error: any) {
        return error.response
    }
});

const fetchProductByCategory = createAsyncThunk(`product_by_category/fetch`, async (id: string) => {
    
    try {
        const response = await service.get(`/get/product_by_category/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response
    }
})


const importProducts = createAsyncThunk(`importProducts`, async (data: any) => {
    try {
        const response = await service.create(`/import/products`, data);
        return response.data;
    } catch (error: any) {
        return error.response
    }
})



const GlobalApi = {
    importProducts,
    fetchProductByCategory,
    fetchCategory,
    fetchSubCategory,
    fetchSize,
    fetchLeadSource,
    fetchLeadStatus,
    fetchFinish,
    fetchHsn,
    fetchThickness,
    fetchAccountType,
    fetchSeries,
    fetchColor,
    fetchCity,
    fetchCountry,
    fetchState,
    fetchIndustry,
    fetchProducts,
    login,
    getUser,
    logout
}


export default GlobalApi;
