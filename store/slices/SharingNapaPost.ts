import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type SharingPostInitialState = {
    data: any;
    post:any;
    loading: boolean;
    error: string
};

const initialState: SharingPostInitialState = {
    data: [],
    post:{},
    loading: true,
    error: "",
};

// export const fetchComments: any = createAsyncThunk("GetPostComments/fetch", (postId: any) => getAllComments(postId));

const SharePostSlicer = createSlice({
    name: "SharePost",
    initialState: initialState,
    reducers: {
        setSharePost(state, action) {
            state.data = action.payload;
        },
        setRedirectionPost(state, action) {
            console.log("77777",action.payload);
            state.post = action.payload;
        }

    },
});

export const SharePostData =  SharePostSlicer.reducer
export const { setSharePost,setRedirectionPost } = SharePostSlicer.actions