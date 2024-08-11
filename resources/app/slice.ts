import { createSlice } from "@reduxjs/toolkit";

import { initialState, State, SliceType } from "@/types";

function createApiSlice({ name, API }: SliceType) {
  return createSlice({
    name,
    initialState,
    reducers: {
      // setCategories: (state, action) => {
      // state.categories = action.payload
    },
    extraReducers: (builder) => {
      builder.addCase(API.fetch.pending, (state: State) => {
        state.isLoading = true;
      }),
        builder.addCase(
          API.fetch.rejected,
          (state: State, action: { payload: any }) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
          }
        );
      builder.addCase(
        API.fetch.fulfilled,
        (state: State, action: { payload: any }) => {
          state.isLoading = false;
          state.data = action.payload.data;
          state.currentPage = action.payload.current_page;
          state.links = action.payload.links;
          state.lastPage = action.payload.last_page;
        }
      );

      builder.addCase(API.create.pending, (state: State) => {
        state.isSaving = true;
      }),
        builder.addCase(
          API.create.fulfilled,
          (state: State, action: { payload: any }) => {
            state.data = action.payload.data;
            state.isSaving = false;
          }
        ),
        builder.addCase(
          API.create.rejected,
          (state: State, action: { payload: any }) => {
            state.isSaving = false;
            state.isError = true;
            state.error = action.payload;
          }
        );
      builder.addCase(API.update.pending, (state: State) => {
        state.isSaving = true;
      }),
      builder.addCase(API.update.rejected, (state: State, action: { payload: any }) => {
          state.isSaving = false;
          state.isError = true;
          state.error = action.payload;
      })
        builder.addCase(
          API.update.fulfilled,
          (state: State, action: { payload: any }) => {
            state.isSaving = false;
            state.data = action.payload.data;
          }
        );
      builder.addCase(API.edit.pending, (state: State) => {
        state.isLoading = true;
      }),
        builder.addCase(
          API.edit.fulfilled,
          (state: State, action: { payload: any }) => {
            state.isLoading = false;
            state.data = action.payload.data;
          }
        ),
        builder.addCase(
          API.edit.rejected,
          (state: State, action: { payload: any }) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
          }
        );
    },
  });
}

export default createApiSlice;
