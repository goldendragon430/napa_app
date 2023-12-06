/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import moment from 'moment';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {timeCalc} from '../utils/timeHelper';
import Hyperlink from 'react-native-hyperlink';

interface propType {
  message: any;
  isSender: boolean; // Add a boolean prop to determine if the message is from the sender
  isMessageSent: boolean;
  isMessageReceived: boolean;
  messageToken: number;
  timeToken: number;
}

const MessageCard: React.FC<propType> = props => {
  const formattedTime = timeCalc(props.timeToken);

  console.log('🅿🛑🛑🛑🛑🛑', props.messageToken, props.timeToken);
  return (
    <View style={style.mainContainer}>
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
              alignItems: props.isSender ? 'flex-end' : 'flex-start',
              backgroundColor: props.isSender
                ? themeColors.aquaColor
                : themeColors.darkGray,
            },
          ]}>
          <Hyperlink
            linkDefault={true}
            linkStyle={{color: '#2980b9', textDecorationLine: 'underline'}}>
            <Text
              style={[
                style.messageText,
                {
                  color: props.isSender
                    ? themeColors.black
                    : themeColors.primaryColor,
                },
              ]}>
              {props.message.message?.text}
            </Text>
          </Hyperlink>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: props.isSender ? 'flex-end' : 'flex-start',
        }}>
        {props.isSender &&
          !props.message?.actions &&
          !props.isMessageReceived && (
            <View>
              <Image
                source={require('../assets/icons/single_tick.png')}
                style={style.messageDeliveredIcon}
              />
            </View>
          )}
        {((props.isSender && props.message?.actions) ||
          (props.isSender && props.messageToken == props.timeToken)) && (
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
            },
          ]}>
          {formattedTime}
          {/* {moment(new Date()).format('hh:mm') ===
          moment(timeStamp).format('hh:mm')
            ? 'Just Now'
            : moment(timeStamp).format('hh:mm')} */}
        </Text>
      </View>
    </View>
  );
};

export default MessageCard;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10,
  },
  conatiner: {
    flexDirection: 'row',
    marginBottom: 5,
    flex: 1,
    marginRight: 17,
  },
  messageView: {
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
    marginTop: 4,
  },
  nameText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
    lineHeight: 18,
    color: themeColors.black,
  },
  messageText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
    lineHeight: 18,
    marginTop: 4,
  },
  messageDeliveredIcon: {
    tintColor: themeColors.garyColor,
    height: 20,
    width: 20,
    marginRight: 10,
  },
});
