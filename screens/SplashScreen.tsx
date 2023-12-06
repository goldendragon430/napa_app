import React, { useRef } from 'react';
import { useEffect } from 'react';
import { Image, View, ImageBackground } from 'react-native';
import Video from 'react-native-video';
import { fetchProfileData } from '../store/slices/ProfileDetail';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { selectProfileList } from '../store/selectors/profileDetailSelector';

const SplashScreen = () => {
  const dispatch = useDispatch();
  const getProfileData = async () => {
    const emailAddress = await AsyncStorage.getItem('emailAddress');
    const profileId = await AsyncStorage.getItem('profileId');
    if (profileId) {
      dispatch(fetchProfileData({ profileId }));
    }
    if (!profileId) {
      const clearAppData = async function () {
        try {
          const keys = await AsyncStorage.getAllKeys();
          await AsyncStorage.multiRemove(keys);
        } catch (error) {
          console.error('Error clearing app data.');
        }
      };
      clearAppData();
    }
  };
  useEffect(() => {
    getProfileData();
    AsyncStorage.setItem('isLoggedIn', '');
  }, []);

  // useEffect(() => {
  //   let unsubscribeTokenRefresh: any;
  //   (async () => {
  //     if (Platform.OS === 'ios') {
  //       const permission = await requestUserPermission();
  //       if (permission) {
  //         const newToken = await messaging().getToken();
  //         console.log('Refreshed FCM token ios:', newToken);
  //       }
  //     } else {
  //       const newToken = await messaging().getToken();
  //       console.log('Refreshed FCM token android:', newToken);
  //     }
  //   })();

  //   // Clean up the listener when the component unmounts
  //   return () => unsubscribeTokenRefresh();
  // }, []);

  // const connectToGeneralServices = () => {
  //   if (profileId && generalServicesSocketRef.current == null) {
  //     generalServicesSocketRef.current = new WebSocket(WEBSOCKET_URL);
  //     generalServicesSocketRef.current.addEventListener(
  //       'message',
  //       ({data}: any) => {
  //         const response = JSON.parse(data);
  //         if (response?.event === `update-user-${profileId}`) {
  //           dispatch(fetchProfileData(profileId));
  //         }
  //       },
  //     );
  //   }
  // };

  // useEffect(() => {
  //   connectToGeneralServices();
  //   if (generalServicesSocketRef.current) {
  //     generalServicesSocketRef.current.onclose = (e: any) => {
  //       console.log(
  //         'General Services Socket is closed. Reconnect will be attempted in 1 second.',
  //         e.reason,
  //       );
  //       setTimeout(() => {
  //         if (generalServicesSocketRef.current) {
  //           connectToGeneralServices();
  //         }
  //       }, 1000);
  //     };
  //   }
  //   return () => {
  //     if (generalServicesSocketRef.current) {
  //       generalServicesSocketRef.current.close();
  //       generalServicesSocketRef.current = null;
  //     }
  //   };
  // }, [profileId]);

  return (
    <ImageBackground 
    source={require('../assets/images/AuthBg.png')}
    resizeMode='cover'
    style={{
      backgroundColor: '#000', //'#181B1B'
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }}>
      <Image 
      source={require('../assets/images/napa_icon_black.png')}
      style={{
        height:150,
        width: 150,
      }}
      resizeMode='contain'
      />
      {/* <Video
        source={require('../assets/videos/splashvideo.mp4')} // the video file
        paused={false}
        repeat={true}
        style={{width: '100%', height: '100%'}}
        muted={false}
        resizeMode={'cover'}
        volume={1.0}
        rate={1.0}
        ignoreSilentSwitch={'ignore'}
        playWhenInactive={true}
        playInBackground={true}
      /> */}
    </ImageBackground>
  );
};

export default SplashScreen;
