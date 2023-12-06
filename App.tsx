/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import Notifee, {AndroidImportance} from '@notifee/react-native';
import AsyncStorage from '@react-native-community/async-storage';

import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
const { useEffect } = React;
import {LogBox, Platform, StatusBar} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import BottomTabs from './navigation/bottomTabs';
import store from './store';
import { handleGetFCMToken, handleGetNotifications, handleGetPosts } from './utils/helper';
 
const App = () => {
 
  const showNotification = async (message: any) => {
    try {
      const permission: any = await AsyncStorage.getItem('notification');
      console.log(permission);
      if (permission == 'true') {
        console.log('Notification display', message);
        const title: any = message?.notification?.title
          ? message?.notification?.title
          : 'Test';
        const body = message?.notification?.body
          ? message?.notification?.body
          : 'Test';
        const messageId = message?.messageId ? message?.messageId : '';
        if (title && body && messageId) {
          // Create a channel (required for Android)
          const channelId = await Notifee.createChannel({
            id: messageId,
            name: title,
        
          });
          console.log(channelId);
          await Notifee.displayNotification({
            title:
              Platform.OS == 'ios'
                ? title
                : '<p style="color: white; font-weight: 600; font-size: 16px; font-family: Avenir-Regular; margin-top: 0px;margin-bottom: 0px"><b>' +
                  title +
                  '</b></p>',
            body:
              Platform.OS === 'ios'
                ? body
                : '<p style="color: white; font-size: 14px; font-family: Avenir-Regular;margin-top: 0px;margin-bottom: 0px">' +
                  body +
                  '</p>',
                
            android: {
              channelId: channelId,
              importance: AndroidImportance.HIGH,
              smallIcon: 'ic_notification',
              largeIcon: 'ic_launcher'
            },
          });
        }
      }
    } catch (error) {
      console.log('Notification display error:', error);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'componentWillReceiveProps',
    ]);
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('received opened', remoteMessage);
      if(remoteMessage.notification?.title != 'post-watch')
        showNotification(remoteMessage);
      const notifications =  await handleGetNotifications();
      if(remoteMessage != null) {
        const title = remoteMessage.notification?.title;
        const body = remoteMessage.notification?.body;
        const time = remoteMessage.sentTime;
        const type = remoteMessage.data == null? 'chat' : remoteMessage.data?.type;
        console.log(remoteMessage.data)
        if(title != 'post-watch') {
         
          const data =  {
            'title' : title, 
            'body' : body, 
            'time' : time,
            'type' : type
          };
          notifications.push(data);
          await AsyncStorage.setItem('notification_data', JSON.stringify(notifications)); 
       
        }else {
          const posts = await handleGetPosts();
           
          if(posts.indexOf(body) < 0) { // if New Post Found
            console.log('dddd',body)
            posts.push(body)
            await AsyncStorage.setItem('posts', JSON.stringify(posts)); 
            const data =  {
              'title' : 'Leaders Update', 
              'body' : 'Congratulations, your post has made the NAPA(category) Leaders!', 
              'time' : time,
              'type' : type
            };
            notifications.push(data);
            await AsyncStorage.setItem('notification_data', JSON.stringify(notifications));
          }
          else{
            console.log('already exists', body);

          }
        }
      }  
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('received background', remoteMessage);
      if(remoteMessage.notification?.title != 'post-watch')
        showNotification(remoteMessage);
      const notifications =  await handleGetNotifications();
      if(remoteMessage != null) {
        const title = remoteMessage.notification?.title;
        const body = remoteMessage.notification?.body;
        const time = remoteMessage.sentTime;
        const type = remoteMessage.data == null? 'chat' : remoteMessage.data?.type;
        console.log(remoteMessage.data)
        if(title != 'post-watch') {
     
          const data =  {
            'title' : title, 
            'body' : body, 
            'time' : time,
            'type' : type
          };
          notifications.push(data);
          await AsyncStorage.setItem('notification_data', JSON.stringify(notifications)); 
       
        }else {
          const posts = await handleGetPosts();
          if(posts.indexOf(body) < 0) { // if New Post Found
            posts.push(body)
            await AsyncStorage.setItem('posts', JSON.stringify(posts)); 
            const data =  {
              'title' : 'Leaders Update', 
              'body' : 'Congratulations, your post has made the NAPA(category) Leaders!', 
              'time' : time,
              'type' : type
            };
            notifications.push(data);
            await AsyncStorage.setItem('notification_data', JSON.stringify(notifications));
          }
          else{
            console.log('already exists', body);
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    messaging()
      .getToken()
      .then(async token => {
        await AsyncStorage.setItem('fcmToken', token);
        const new_token = await handleGetFCMToken();  
        console.log('fcm token', new_token);

      })
      .catch(error => {
        console.log(error, 'fcmToken error');
      });
  }, []);

  return (
    <Provider store={store}>
      {/* <PubNubProvider client={pubnub}> */}
      <ToastProvider normalColor="transparent">
        <>
          <NavigationContainer>
            <StatusBar backgroundColor="black" barStyle="default" />
            <BottomTabs />
          </NavigationContainer>
        </>
      </ToastProvider>
      {/* </PubNubProvider> */}
    </Provider>
  );
};

export default App;
