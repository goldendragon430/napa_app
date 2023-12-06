import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const getTermCondition = (state: RootState) => state.CreateUserProfileData;
export const selectGetTermCondition = createSelector(getTermCondition, (state: any) => state.termAndConditions)
export const selectRegistrationType = createSelector(getTermCondition, (state: any) => state.registrationType)
