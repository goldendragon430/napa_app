import { API_URL } from '../const/Url';

import axios, { AxiosResponse } from 'axios';
import { CreateNewTokenResponse, GetTokenResponse, NewToken } from '../typings/tokens';

export const importNewToken = async (token: NewToken) => {
    try {
        const p = await axios.post<{}, AxiosResponse<CreateNewTokenResponse>>(
            `${API_URL}/tokens/new`,
            token
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

export const getImportedTokens = async (
    napaWalletAccount: string,
    networkId: string
) => {
    try {
        const p = await axios.get<{}, AxiosResponse<GetTokenResponse>>(
            `${API_URL}/tokens`,
            {
                params: {
                    napaWalletAccount,
                    networkId,
                },
            }
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
export const updateTokenVisibility = async (
    tokenId: string,
    visible: string
) => {
    try {
        const p = await axios.post<{}, AxiosResponse<any>>(
            `${API_URL}/tokens/updateTokenVisibility?tokenId=${tokenId}&visible=${visible}`,
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