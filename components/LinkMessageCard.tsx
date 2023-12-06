/* eslint-disable react-native/no-inline-styles */
import {LinkPreview} from '@flyerhq/react-native-link-preview';
import moment from 'moment';
import React, {useState} from 'react';
import {
  ImageBackground,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import MessageCard from './MessageCard';
import {timeCalc} from '../utils/timeHelper';

interface propType {
  message: any;
  isSender: boolean; // Add a boolean prop to determine if the message is from the sender
  isMessageSent: boolean;
  isMessageReceived: boolean;
  timeToken: number;
}

const LinkMessageCard: React.FC<propType> = props => {
  const ProfileData = useSelector(selectProfileList);
  const [urlImage, setUrlImage] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const formattedTime = timeCalc(props.timeToken);

  const handleLinkPress = async (url: string) => {
    await Linking.openURL(url);
  };

  return (
    <View style={{flex: 1, marginTop: 10}}>
      <LinkPreview
        text={props.message.message?.text}
        textContainerStyle={{
          position: 'absolute',
          display: 'none',
        }}
        renderTitle={header => {
          setTitle(header);
          // console.log('Header', header);
        }}
        renderDescription={description => {
          // console.log('description', description);
          setDescription(description);
        }}
        renderImage={PreviewDataImage => {
          // console.log('Item', PreviewDataImage);
          setUrlImage(PreviewDataImage.url);
        }}
      />
      {urlImage !== '' ? (
        <>
          <TouchableOpacity
            onPress={() => handleLinkPress(props.message?.message?.text)}
            style={{flex: 1}}>
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
                  resizeMode="contain">
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
                  marginTop: 100,
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

export default LinkMessageCard;

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
    marginTop: 100,
  },
});
