import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  AppState,
  Platform,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {TouchidIcon} from '../assets/svg/TouchidIcon';
import {moderateScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-community/async-storage';
import {recoverAccount} from '../services/AuthApi';
import {useToast} from 'react-native-toast-notifications';
import SuccessToast from '../common/toasters/SuccessToast';
import {useDispatch} from 'react-redux';
import {
  setProfileData,
  setprofilePostData,
} from '../store/slices/ProfileDetail';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';

const RecoveryLogin = ({route}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const rnBiometrics = new ReactNativeBiometrics();
  const [isExist, setIsExist] = useState(false);
  const [biometricOption, setBioMetricOption] = useState('');
  const {emailAddress} = route?.params;
  const {navigate} = useNavigation<any>();
  const toast = useToast();
  const dispatch = useDispatch();
  const handleBiometricCheck = async () => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;
      console.log(available, biometryType, 'resultObject');
      if (available && biometryType === BiometryTypes.TouchID) {
        setBioMetricOption('TouchID');
        setIsExist(true);
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setBioMetricOption('FaceID');
        setIsExist(true);
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setBioMetricOption('TouchID');
        setIsExist(true);
      } else {
        setBioMetricOption('PinNumber');
        setIsExist(false);
      }
    });
  };

  useEffect(() => {
    handleBiometricCheck();
    const handleAppStateChange = (state: any) => {
      if (state === 'active') {
        handleBiometricCheck();
      }
    };
    AppState?.addEventListener('change', handleAppStateChange);
  }, []);

  const handleGeneratePublicKey = async () => {
    if (!isExist) {
      return setModalVisible(true);
    }
    rnBiometrics
      .simplePrompt({
        promptMessage: `${'Login'} ${biometricOption}`,
      })
      .then(resultObject => {
        const {success} = resultObject;
        if (success === true) {
          rnBiometrics.createKeys().then(async resultObject => {
            const token = await AsyncStorage.getItem('fcmToken');
            if (resultObject.publicKey) {
              const {data, error, message} = await recoverAccount(
                emailAddress,
                token,
                '',
              );
              if (error) {
                toast.show(<SuccessToast message={message} />, {
                  placement: 'top',
                });
                return;
              }
              await AsyncStorage.setItem('emailAddress', emailAddress);
              await AsyncStorage.setItem('profileId', data?.data?.profileId);
              dispatch(setProfileData(data?.data));
              navigate(SCREENS.SOCIALART);
              console.log(data, 'data');
            }
          });
        }
      })
      .catch(e => {});
  };

  const handleModal = () => {
    if (isExist) {
      handleGeneratePublicKey();
    } else {
      setModalVisible(true);
    }
  };

  const openMobileSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:root=TOUCHID_PASSCODE');
    } else {
      Linking.sendIntent('android.settings.SECURITY_SETTINGS');
    }
    setModalVisible(false);
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      resizeMode="cover"
      source={require('../assets/images/AuthBg.png')}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Set Up FingerPrint</Text>
            <Text style={styles.modalTextSmall}>
              To use this feature, you'll need to set up your fingerprint on
              your device first
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => openMobileSettings()}>
                <Text style={styles.textStyle}>Setup</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{flex: 1}}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', flex: 0.9}}>
          <TouchidIcon />
          <Text
            style={{
              color: 'white',
              fontSize: size.lg,
              fontWeight: '500',
              fontFamily: Fontfamily.Neuropolitical,
              marginTop: moderateScale(15),
            }}>
            Login with TouchID
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: size.md,
              fontWeight: '500',
              fontFamily: Fontfamily.Avenier,
              marginTop: moderateScale(10),
            }}>
            Please place your finger on your phone to login
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            flex: 0.1,
            paddingBottom:
              Platform.OS == 'ios' ? moderateScale(20) : moderateScale(0),
          }}>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.RECOVERYPINLOGIN, {emailAddress})}>
            <Text
              style={{
                color: themeColors.aquaColor,
                fontSize: size.default,
                fontWeight: '500',
                fontFamily: Fontfamily.Neuropolitical,
                marginTop: moderateScale(15),
                textAlign: 'center',
              }}>
              or Login With a 6-digit Pin Number
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleModal()}
            style={{
              backgroundColor: themeColors.aquaColor,
              marginTop: moderateScale(15),
              paddingVertical: moderateScale(20),
            }}>
            <Text
              style={{
                color: themeColors.secondaryColor,
                fontSize: size.default,
                fontWeight: '500',
                fontFamily: Fontfamily.Neuropolitical,
                textAlign: 'center',
              }}>
              Login with TouchID
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RecoveryLogin;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 8,
    elevation: 2,
    marginRight: 20,
    width: 80,
    // backgroundColor: themeColors.garyColor,
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
    // backgroundColor: themeColors.garyColor,
  },
  buttonClose: {
    // backgroundColor: '#2196F3',
    backgroundColor: themeColors.aquaColor,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontFamily: Fontfamily.Neuropolitical,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: size.lg,
    fontFamily: Fontfamily.Neuropolitical,
  },
  modalTextSmall: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: size.s,
    fontFamily: Fontfamily.Neuropolitical,
  },
});
