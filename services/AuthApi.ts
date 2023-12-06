import axios, { AxiosResponse } from 'axios';
import { API_URL, SOCIAL_ART_API_URL } from '../const/Url';
import AsyncStorage from '@react-native-community/async-storage';

export const getProfileDetail = async (obj: any) => {
  try {
    if (obj.pin) {
      const profileDetail = await axios.get<AxiosResponse>(
        `${API_URL}/user/account/detailsByPin/${obj.emailAddress}/${obj.pin}?deviceToken=${obj.deviceToken}`,
      );
      return profileDetail.data.data;
    } else {
      const profileDetail = await axios.get<AxiosResponse>(
        `${API_URL}/user/account/details/${obj.profileId}?deviceToken=${obj.deviceToken}`,
      );
      return profileDetail.data.data;
    }
  } catch (error) {
    console.log(error, 'error profile');
    throw error;
  }
};

export const CreateUserProfile = async (data: any) => {
  return new Promise(async (res, rej) => {
    try {
      const formData = new FormData();
      formData.append('emailAddress', data?.emailAddress);
      formData.append('profileName', data?.profileName);
      formData.append('bio', data?.bio);
      formData.append('timezone', data?.timezone);
      formData.append('primaryCurrency', data?.primaryCurrency);
      formData.append('language', data?.language);
      formData.append('avatar', data?.avatar);
      formData.append('accountType', data?.accountType);
      formData.append('pin', data?.pin);
      formData.append('registrationType', data?.registrationType);
      formData.append('deviceToken', data?.deviceToken);
      formData.append('termsAndCondition', data?.termsAndCondition);
      const response = await axios.post<AxiosResponse>(
        `${API_URL}/user/account/new`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response?.data);
      const emailAddress = response?.data?.data?.emailAddress;
      await AsyncStorage.setItem('emailAddress', emailAddress);
      await AsyncStorage.setItem('profileId', response?.data?.data?.profileId);
      res({ emailAddress, profileId: response?.data?.data?.profileId });
    } catch (e: any) {
      console.log('register error', e);
      console.log(e.response.data.message, 'e.response.data.message');
      rej(e.response.data.message);
    }
  });
};

export const updateUserProfile = async (profileId: any, data: any) => {
  try {
    const formData = new FormData();
    formData.append('profileName', data.profileName);
    formData.append('bio', data.bio);
    formData.append('timezone', data.timezone);
    formData.append('primaryCurrency', data.primaryCurrency);
    formData.append('language', data.language);
    formData.append('avatar', data.selectedAvatar);
    formData.append('accountType', data.accountType);
    await axios.patch<AxiosResponse>(
      `${API_URL}/user/account/update/${profileId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return profileId;
  } catch (e) {
    throw e;
  }
};

export const qrCodeAuthorize = async (data: any) => {
  try {
    const response = await axios.post<AxiosResponse>(
      `${API_URL}/user/account/verifyAuthToken`,
      data,
    );
    return response.data.data;
  } catch (error) { }
};


export const notificationStatus = async (profileId: any, notification: any) => {
  try {
    console.log(profileId, "profileId")
    console.log(notification, "notification")
    const response = await axios.post<AxiosResponse>(
      `${API_URL}/user/notification/status/update`,
      {
        profileId: profileId,
        allowNotifications: notification
      }
    );
    return response;
  } catch (error: any) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };

  }
}
export const handleGetMintedPost = async (
  profileId: string,
) => {
  try {
    const p = await axios.get<{}, AxiosResponse>(
      `${SOCIAL_ART_API_URL}/user/social/mint/highestEarning?profileId=${profileId}`);
    return {
      data: p?.data?.data,
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

export const handleGenerateRecoveryPin = async (
  emailAddress: any,
) => {
  try {
    const p = await axios.post<{}, AxiosResponse>(
      `${API_URL}/user/generatePin`, {
      email: emailAddress
    });
    return {
      data: p?.data,
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

export const verifyPin = async (
  emailAddress: any,
  pin: any
) => {
  try {
    const p = await axios.post<{}, AxiosResponse>(
      `${API_URL}/user/verifyPin`, {
      email: emailAddress,
      recoveryPin: pin
    });
    return {
      data: p?.data,
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

export const recoverAccount = async (
  emailAddress: any,
  deviceToken: any,
  recoverPin: any
) => {
  try {
    const p = await axios.post<{}, AxiosResponse>(
      `${API_URL}/user/account/recover`, {
      email: emailAddress,
      deviceToken: deviceToken,
      pin: recoverPin
    });
    return {
      data: p?.data,
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

export const archiveAccount = async (
  emailAddress: any,
) => {
  try {
    const p = await axios.post<{}, AxiosResponse>(
      `${API_URL}/user/account/archive`, {
      email: emailAddress,
    });
    return {
      data: p?.data,
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