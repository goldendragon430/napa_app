import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {BackIcon, DeleteIcon, Search} from '../assets/svg';
import {useNavigation} from '@react-navigation/native';
import NotificationListCard from '../components/NotificationListCard';
import {themeColors} from '../theme/colors';
import { handleGetNotifications } from '../utils/helper';
import AsyncStorage from '@react-native-community/async-storage';
// import {getNotifications} from '../services/Nofications';
 
const NotificationListScreen = () => {
  const {goBack, navigate} = useNavigation<any>();
  const [notifications, setNotifications] = useState<{ 
    id: number; 
    title: any; 
    type: string; 
    content: any; 
    createdAt: string; 
  }[]>([]);
  const fetchNotificationList = async () => {
     const notifications = await handleGetNotifications();
     const result = [];
     for(var i = 0 ; i < notifications.length; i ++){
       result.push(
         {
          id : i + 1,
          title : notifications[i].title,
          content : notifications[i].body,
          createdAt: notifications[i].time,
          time: new Date(notifications[i].time).toLocaleString('en-US', {timeZone: 'UTC', hour12: false}),
          type : notifications[i].type
         } 
       );
     }
     console.log(result)
     setNotifications(result);
  };


  useEffect(() => {
    const interval = setInterval(async () => {
      fetchNotificationList();
    }, 5000);
    fetchNotificationList();  
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  const clearAll = async() =>{
    let data : any[] = [];
    await AsyncStorage.setItem('notification_data', JSON.stringify(data));
    setNotifications([]);
  }

  return (
    <Layout>
      <Header
        leftChildren={
          <TouchableOpacity onPress={() => goBack()}>
            <BackIcon color={themeColors.garyColor} />
          </TouchableOpacity>
        }
        rightChildren={
          <TouchableOpacity onPress={clearAll}>
            {/* <Search color={themeColors.garyColor} /> */}
            <DeleteIcon color = "white" />
          </TouchableOpacity>
        }
        title={false}
        centerTitle={'Notifications'}
      />
      {notifications?.length > 0 ? (
        <FlatList
          data={notifications}
          style={styles.flatListContainer}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item, index}: any) => (
            <NotificationListCard item={item} index={index} />
          )}
        />
      ) : (
        <View style={styles.noContent}>
          <Text style={styles.noContentText}>No Records Found</Text>
        </View>
      )}
    </Layout>
  );
};

export default NotificationListScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 24,
    flexGrow: 1,
    paddingBottom: 100,
  },
  flatListContainer: {
    marginTop: 10,
  },
  noContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContentText: {color: 'white', fontSize: 18},
});
