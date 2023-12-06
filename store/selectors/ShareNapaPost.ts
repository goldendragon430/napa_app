import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectSharePost = (state: RootState) => state.sharePostData;
export const selectSharePostDataList = createSelector(selectSharePost, (state: any) => state?.data)
export const selectSharePostDataLoading = createSelector(selectSharePost, (state: any) => state.loading)
export const selectSharePostDataError = createSelector(selectSharePost, (state: any) => state.error)