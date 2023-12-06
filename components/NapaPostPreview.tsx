/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {getSingleSocialArtPost} from '../services/PostApi';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import MessageCard from './MessageCard';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {timeCalc} from '../utils/timeHelper';
import {Image} from 'react-native';

interface propType {
  message: any;
  isSender: boolean; // Add a boolean prop to determine if the message is from the sender
  postId: string;
  isMessageSent: boolean;
  isMessageReceived: boolean;
  timeToken: number;
}

const NapaPostPreview: React.FC<propType> = props => {
  const ProfileData = useSelector(selectProfileList);
  const [urlImage, setUrlImage] = useState('');
  const {navigate} = useNavigation<any>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [post, setPost] = useState();
  const formattedTime = timeCalc(props.timeToken);

  const getData = async () => {
    const data = await getSingleSocialArtPost(props.postId);
    setPost(data.data);
    setUrlImage(data.data?.videoThumbnail);
    setTitle(data.data?.videoTitle);
    setDescription(data.data?.videoCaption);
  };

  useEffect(() => {
    getData();
  }, [props?.postId]);

  const handleLinkPress = async () => {
    navigate(SCREENS.POSTDETAILS, {post});
  };

  return (
    <View style={{flex: 1, marginTop: 10}}>
      {urlImage !== '' ? (
        <>
          <TouchableOpacity onPress={handleLinkPress} style={{flex: 1}}>
            <View
              style={[
                style.conatiner,
                {
                  flexDirection: props.isSender ? 'row-reverse' : 'row',
                },
              ]}>
              <View
                style={[
                  style.messageView,
                  {
                    borderBottomEndRadius: props.isSender ? 0 : 12,
                    borderBottomStartRadius: props.isSender ? 12 : 0,
                    marginLeft: props.isSender ? 0 : -10,
                    marginRight: props.isSender ? -10 : -0,
                    alignItems: props.isSender ? 'flex-end' : 'flex-start',
                  },
                ]}>
                <ImageBackground
                  source={{
                    uri: urlImage,
                  }}
                  imageStyle={{
                    borderTopRightRadius: 15,
                    borderBottomLeftRadius: props.isSender ? 15 : 0,
                    borderTopLeftRadius: 15,
                    borderBottomRightRadius: props.isSender ? 0 : 15,
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                  resizeMode="cover">
                  <View style={{marginHorizontal: 20, marginBottom: 10}}>
                    <Text style={[style.titleText]} numberOfLines={1}>
                      {title}
                    </Text>
                    <Text style={[style.descriptionText]} numberOfLines={2}>
                      {description}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: props.isSender ? 'flex-end' : 'flex-start',
            }}>
            {props.isSender &&
              !props.message?.actions &&
              props.isSender &&
              !props.isMessageReceived && (
                <View>
                  <Image
                    source={require('../assets/icons/single_tick.png')}
                    style={style.messageDeliveredIcon}
                  />
                </View>
              )}
            {((props.isSender && props.message?.actions) ||
              (props.isSender && props.isMessageReceived)) && (
              <View>
                <Image
                  source={require('../assets/icons/double-tick.png')}
                  style={style.messageDeliveredIcon}
                />
              </View>
            )}
            <Text
              style={[
                style.timeText,
                {
                  alignSelf: props.isSender ? 'flex-end' : 'flex-start',
                  textAlign: props.isSender ? 'right' : 'left',
                  marginTop: verticalScale(80),
                },
              ]}>
              {formattedTime}
            </Text>
          </View>
        </>
      ) : (
        <MessageCard
          message={props?.message}
          isSender={props?.isSender}
          isMessageSent={props.isMessageSent}
          isMessageReceived={props.isMessageReceived}
          timeToken={props.timeToken}
        />
      )}
    </View>
  );
};

export default NapaPostPreview;

const style = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    marginBottom: 5,
    flex: 1,
    marginRight: 17,
  },
  messageView: {
    height: '200%',
    width: '105%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingHorizontal: 15,
  },
  timeText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 12,
    lineHeight: 16,
    color: themeColors.garyColor,
    fontWeight: '500',
  },
  nameText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
    lineHeight: 18,
    color: themeColors.black,
  },
  titleText: {
    fontWeight: 'bold',
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.default,
    lineHeight: 18,
    marginTop: 4,
    color: themeColors.primaryColor,
  },
  descriptionText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    lineHeight: 18,
    marginTop: 10,
    color: themeColors.primaryColor,
  },
  messageDeliveredIcon: {
    tintColor: themeColors.garyColor,
    height: 20,
    width: 20,
    marginRight: 10,
    marginTop: verticalScale(80),
  },
});
