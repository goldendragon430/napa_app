import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';

import {BlurView} from '@react-native-community/blur';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {themeColors} from '../theme/colors';
import {moderateScale} from 'react-native-size-matters';

type LogoutModalProps = {
  mainTitle?: string;
  title?: string;
  rightButtonTitle?: string;
  centerButtonTitle?: string;
  LeftButtonTitle?: string;
  isDisabled?: boolean;
  isVisable?: boolean;
  onPressRight?: (event: GestureResponderEvent) => void;
  onPressCenter?: (event: GestureResponderEvent) => void;
  onPressLeft?: (event: GestureResponderEvent) => void;
};

const LogoutModal: React.FC<LogoutModalProps> = ({
  isVisable,
  mainTitle,
  title,
  rightButtonTitle,
  centerButtonTitle,
  LeftButtonTitle,
  onPressRight,
  onPressCenter,
  onPressLeft,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisable}>
      <View style={styles.modalContainer}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          overlayColor="transparent"
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.modalMainContainer}>
          <View>
            <Text style={[styles.modalLogoutText]}>{mainTitle}</Text>
            <Text style={[styles.modalDescription]}>{title}</Text>
          </View>
          {centerButtonTitle && (
            <View style={[styles.bottonContainer]}>
              <TouchableOpacity onPress={onPressCenter}>
                <Text style={[styles.modalText]}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={[styles.bottonContainer]}>
            <TouchableOpacity onPress={onPressRight}>
              <Text
                style={[
                  styles.modalText,
                  {color: themeColors.lightred, paddingRight: 50},
                ]}>
                {rightButtonTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressLeft}>
              <Text style={[styles.modalText]}>{LeftButtonTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  modalMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalLogoutText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.vxlg,
    color: themeColors.primaryColor,
    fontWeight: '400',
    textAlign: 'center',
  },
  modalDescription: {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    color: themeColors.primaryColor,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.md,
    color: themeColors.primaryColor,
    fontWeight: '400',
    textAlign: 'center',
  },
  bottonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '50%',
  },
});
