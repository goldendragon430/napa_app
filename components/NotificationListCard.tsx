/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import {
  StaroffIcon,
  SwapIcon,
  TransferIcon,
  // AddUserIcon,
  // CommentIcon,
  // RefreshIcon,
  // StarOffIcon,
  UserIcon,
} from '../assets/svg';
import ChatIcon from '../assets/svg/ChatIcon';
import {InviteIcon} from '../assets/svg/InviteIcon';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../typings/screens-enums';
import { handleGetNotifications } from '../utils/helper';
import AsyncStorage from '@react-native-community/async-storage';
import { SendIcon } from '../assets/svg/SendIcon';

type NotificationListCardProps = {
  item: any;
  index: number;
};

const NotificationListCard: React.FC<NotificationListCardProps> = ({
  item,
  index,
}) => {
  const type = item?.type;
  let icon;
  switch (type) {
    case 'chat':
      icon = <ChatIcon />;
      break;

    case 'follower':
      icon = <InviteIcon width={24} height={24} />;
      break;

    case 'transaction':
      icon = <SendIcon />;
      break;

    default:
      icon = <ChatIcon />;
      break;
  }
  const {navigate} = useNavigation<any>();
   
  const onClickItem = () =>{
    
      navigate(SCREENS.NOTIFICATIONDETAILSCREEN,{
        item : item
      });
      removeNotification(item?.createdAt)
  }
  const removeNotification = async(time : number)=>{
    const notifications = await handleGetNotifications();
    const new_notifications = notifications.filter((ele)=> ele.time != time);
    await AsyncStorage.setItem('notification_data', JSON.stringify(new_notifications)); 
    
  }
  return (
    <TouchableOpacity onPress={onClickItem}>
      <View key={index} style={styles.container} >
            <View style={styles.detailContainer}>
              <View style={styles.imageStyle}>
                {/* <AddUserIcon /> */}
                {icon}
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.nameWhenContainer}>
                  <Text style={styles.nameStyle}>{item?.title}</Text>
                  <Text style={styles.whenStyle}>
                    {dayjs(item?.createdAt).fromNow()}
                  </Text>
                </View>
                <Text style={styles.contentStyle} numberOfLines={1}>
                  {item?.content}
                </Text>
              </View>
            </View>
          </View>
    </TouchableOpacity>
    
  );
};

export default NotificationListCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageStyle: {
    width: 48,
    height: 48,
    backgroundColor: themeColors.darkGray,
    overflow: 'hidden',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  nameWhenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nameStyle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  whenStyle: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: 12,
    marginLeft: 12,
  },
  contentStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
    marginLeft: 12,
    color: themeColors.garyColor,
  },
});
