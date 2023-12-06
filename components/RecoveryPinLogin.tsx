import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import Header from '../common/Header';
import {BackIcon} from '../assets/svg';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RemoveIcon} from '../assets/svg/RemoveIcon';
import {TouchIcon} from '../assets/svg/TouchIcon';
import {SCREENS} from '../typings/screens-enums';

const RecoveryPinLogin = ({route}: any) => {
  const {goBack, navigate} = useNavigation<any>();
  const toast = useToast();
  const [confirmPinCodeValue, setConfirmPinCodeValue] = useState<any>('');
  const dispatch = useDispatch();
  const {emailAddress} = route?.params;
  const handleNumber = (value: any) => {
    if (confirmPinCodeValue.length == 6) {
      return;
    }
    setConfirmPinCodeValue(confirmPinCodeValue + value);
  };

  const checkPin = async () => {
    if (confirmPinCodeValue.length == 6) {
      console.log(confirmPinCodeValue);
      navigate(SCREENS.RECOVERYCONFIRMPINLOGIN, {
        codeValue: confirmPinCodeValue,
        emailAddress: emailAddress,
      });
    }
  };
  useEffect(() => {
    checkPin();
  }, [confirmPinCodeValue]);
  return (
    <ImageBackground
      style={{flex: 1}}
      resizeMode="cover"
      source={require('../assets/images/AuthBg.png')}>
      <Header
        leftChildren={
          <View style={{flexDirection: 'row', marginTop: moderateScale(40)}}>
            <TouchableOpacity onPress={goBack}>
              <BackIcon color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
        title={false}
      />
      <View
        style={{
          marginHorizontal: moderateScale(24),
          marginTop: moderateScale(45),
        }}>
        <View>
          <Text style={styles.pinText}>Enter Pin Code</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputContainerChild}>
            <Text
              style={
                confirmPinCodeValue.length >= 1
                  ? styles.selectedInputText
                  : styles.pinInputText
              }></Text>
            <Text
              style={
                confirmPinCodeValue.length >= 2
                  ? styles.selectedInputText
                  : styles.pinInputText
              }></Text>
            <Text
              style={
                confirmPinCodeValue.length >= 3
                  ? styles.selectedInputText
                  : styles.pinInputText
              }></Text>
            <Text
              style={
                confirmPinCodeValue.length >= 4
                  ? styles.selectedInputText
                  : styles.pinInputText
              }></Text>
            <Text
              style={
                confirmPinCodeValue.length >= 5
                  ? styles.selectedInputText
                  : styles.pinInputText
              }></Text>
            <Text
              style={
                confirmPinCodeValue.length >= 6
                  ? styles.selectedInputText
                  : styles.pinInputText
              }></Text>
          </View>
        </View>
        <View style={styles.keybadContainer}>
          <View>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('1');
              }}>
              <Text style={styles.keybads}>1</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('4');
              }}>
              <Text style={styles.keybads}>4</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('7');
              }}>
              <Text style={styles.keybads}>7</Text>
            </Pressable>
            <Pressable style={styles.IconContainer}>
              <TouchIcon />
            </Pressable>
          </View>
          <View>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('2');
              }}>
              <Text style={styles.keybads}>2</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('5');
              }}>
              <Text style={styles.keybads}>5</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('8');
              }}>
              <Text style={styles.keybads}>8</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('0');
              }}>
              <Text style={styles.keybads}>0</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('3');
              }}>
              <Text style={styles.keybads}>3</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('6');
              }}>
              <Text style={styles.keybads}>6</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('9');
              }}>
              <Text style={styles.keybads}>9</Text>
            </Pressable>
            <Pressable
              style={styles.IconContainer}
              onPress={() =>
                setConfirmPinCodeValue(confirmPinCodeValue.slice(0, -1))
              }>
              <RemoveIcon />
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RecoveryPinLogin;

const styles = StyleSheet.create({
  pinText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.xxlg,
    fontWeight: '400',
    color: 'white',
    paddingRight: moderateScale(30),
  },
  instractionText: {
    paddingTop: moderateScale(10),
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    fontWeight: '500',
    color: 'white',
  },
  inputContainer: {
    marginTop: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputContainerChild: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  pinInputText: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    marginTop: verticalScale(10),
    fontFamily: Fontfamily.Avenier,
    backgroundColor: themeColors.cardsColor,
    fontSize: size.s,
    fontWeight: '500',
    color: 'white',
  },
  selectedInputText: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    marginTop: verticalScale(10),
    fontFamily: Fontfamily.Avenier,
    backgroundColor: themeColors.aquaColor,
    fontSize: size.s,
    fontWeight: '500',
    color: 'white',
  },
  keybadContainer: {
    marginTop: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'center',
    // flex:1
  },
  keybadContainerChild: {
    width: 72,
    height: 72,
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    backgroundColor: themeColors.cardsColor,
    marginBottom: verticalScale(20),
    marginHorizontal:
      Dimensions.get('window').width < 337
        ? moderateScale(17)
        : moderateScale(22),
  },
  IconContainer: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    paddingLeft: moderateScale(17),
    marginTop: verticalScale(-10),
    // marginBottom: moderateScale(20),
  },
  keybads: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.vxlg,
    fontWeight: '500',
    color: 'white',
  },
  forgetPassword: {
    marginTop: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.md,
    fontWeight: '400',
    color: themeColors.garyColor,
  },
});
