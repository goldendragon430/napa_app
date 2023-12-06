import axios, { AxiosResponse } from 'axios';
import { SOCIAL_ART_API_URL } from '../const/Url';
import {
  CreateNewMintResponse,
  GetMintPostsResponse,
  GetRecentMintPostsResponse,
} from '../typings/mint';

export const createNewMint = async (mint: any) => {
  try {
    const p = await axios.post<{}, AxiosResponse<CreateNewMintResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/mint/new`,
      mint,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    console.log(error, 'error');
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const getAllMintedlPosts = async (accountId: string, offset: number) => {
  try {
    const p: any = await axios.get<{}, AxiosResponse<GetMintPostsResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/mint`,
      {
        params: {
          accountId,
          offset,
        },
      },
    );
    return {
      data: p?.data?.data || [],
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: [],
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const getMintedPost = async (id: string) => {
  try {
    const p = await axios.get<{}, AxiosResponse<GetMintPostsResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/mint/details?id=${id}`,
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const updatePostMint = async ({
  postId,
  profileId,
  mintId,
  marketplace_listed,
}: {
  postId: string;
  profileId: string;
  mintId: string;
  marketplace_listed: string;
}) => {
  try {
    const p = await axios.post<{}, AxiosResponse<''>>(
      `${SOCIAL_ART_API_URL}/user/social/mint/update/${mintId}`,
      {
        profileId,
        postId,
        marketplace_listed,
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const updateMintPostStatus = async (
  postId: string,
  status: string,
  napaTokenEarned: string,
  tokenPrice: number,
) => {
  try {
    const p = await axios.post<{}, AxiosResponse<''>>(
      `${SOCIAL_ART_API_URL}/user/social/mint/update/status/${postId}`,
      {
        postId,
        status,
        napaTokenEarned,
        tokenPrice,
      },
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const getRecentMintedPosts = async () => {
  try {
    const p = await axios.get<{}, AxiosResponse<GetRecentMintPostsResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/mint/recent`,
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};

export const redeemToken = async (postId: any) => {
  try {
    console.log(postId, 'postId');
    const p = await axios.post<{}, AxiosResponse<any>>(
      `${SOCIAL_ART_API_URL}/user/social/mint/redeemtoken/${postId}`,
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};
