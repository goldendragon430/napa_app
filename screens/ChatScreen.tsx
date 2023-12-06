import 'react-native-get-random-values';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Layout from '../common/Layout';
import {BackIcon} from '../assets/svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {themeColors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {GiftedChat} from 'react-native-gifted-chat';
import MessageCard from '../components/MessageCard';
import {sendNewMessage} from '../services/PostApi';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {getThreadMessages} from '../services/GetImportedToken';
import {SOCIAL_ART_WEBSOCKET_URL} from '../const/Url';
import LoaderButton from '../common/LoaderButton';
import ErrorToast from '../common/toasters/ErrorToast';
import LinkMessageCard from '../components/LinkMessageCard';
import NapaPostPreview from '../components/NapaPostPreview';
import {SCREENS} from '../typings/screens-enums';

const ChatScreen = () => {
  const {goBack} = useNavigation<any>();
  const {navigate} = useNavigation<any>();
  const route = useRoute<any>();
  const {post, isNapaPost, threadId, threadInformation, receiverProfileId} =
    route?.params;
  const [messages, setMessages] = useState<any>(null);
  const [threadInfo, setThreadInfo] = useState<any>();
  const [message, setMessage] = useState<string>('');
  const toast = useToast();
  const ProfileData = useSelector(selectProfileList);
  const socialArtSocketRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchThreadMessageList = async () => {
    const {data, error}: any = await getThreadMessages(
      ProfileData.profileId,
      threadId,
      receiverProfileId,
    );
    if (!error) {
      const msgWithIds = data?.data?.messageData?.map((msg, index) => {
        return {...msg, _id: `${index} + a`};
      });
      setMessages(msgWithIds?.reverse());
      setThreadInfo(data?.data?.threadInfo);
    }
  };

  useEffect(() => {
    if (!messages) {
      fetchThreadMessageList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessageApi = async () => {
    if (message.trim() === '') {
      return;
    }
    setIsLoading(true);
    const {error} = await sendNewMessage(
      ProfileData.profileId,
      threadId,
      receiverProfileId,
      message,
    );
    setIsLoading(false);
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
    } else {
      if (!threadId) {
        fetchThreadMessageList();
      }
    }
    setMessage('');
    Keyboard.dismiss();
  };

  const connectToSocialArt = async () => {
    if (socialArtSocketRef.current == null) {
      socialArtSocketRef.current = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
      socialArtSocketRef.current.addEventListener('message', ({data}: any) => {
        const response = JSON.parse(data);
        if (response?.event === 'thread-send-message') {
          if (response?.data?.threadId === threadId) {
            fetchThreadMessageList();
          }
        }
      });
    }
  };

  useEffect(() => {
    connectToSocialArt();
    if (socialArtSocketRef.current) {
      socialArtSocketRef.current.onclose = (e: any) => {
        console.log(
          'Social Art Socket is closed 1. Reconnect will be attempted in 1 second.',
          e.reason,
        );
        setTimeout(() => {
          if (socialArtSocketRef.current) {
            connectToSocialArt();
          }
        }, 1000);
      };
    }
    return () => {
      if (socialArtSocketRef.current) {
        socialArtSocketRef.current.close();
        socialArtSocketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (post !== '' && isNapaPost) {
      napaSharePost();
    }
  }, []);

  const napaSharePost = async () => {
    setIsLoading(true);
    const {error} = await sendNewMessage(
      ProfileData.profileId,
      threadId,
      receiverProfileId,
      post,
    );
    if (error) {
      toast.show(<ErrorToast message={post} />, {
        placement: 'top',
      });
    } else {
      fetchThreadMessageList();
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.child}>
          <View style={styles.leftChildren}>
            <TouchableOpacity onPress={() => goBack()}>
              <BackIcon color={themeColors.garyColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <Text style={styles.centerTitle}>{threadInfo?.profileName}</Text>
          </View>

          <View style={styles.rightChildren}>
            <TouchableOpacity
              onPress={() => {
                navigate(SCREENS.PROFILE, {
                  profileId: threadInformation?.receiver_info?.profileId,
                });
              }}>
              <Image
                style={styles.imageStyle}
                source={{
                  uri:
                    threadInfo?.avatar ||
                    'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.content}>
        {!messages ? (
          <LoaderButton />
        ) : messages.length > 0 ? (
          <GiftedChat
            messages={messages}
            messagesContainerStyle={styles.messageContainerStyle}
            onInputTextChanged={(text: string) => setMessage(text)}
            showUserAvatar={false}
            inverted={false}
            renderChatEmpty={() => null}
            textInputProps={{
              value: message,
            }}
            listViewProps={{
              contentContainerStyle: styles.contentContainer,
            }}
            showAvatarForEveryMessage={true}
            renderInputToolbar={() => <></>}
            minInputToolbarHeight={0}
            renderAvatar={(props: any) => (
              <TouchableOpacity
                onPress={() => {
                  navigate(SCREENS.PROFILE, {
                    profileId: threadInformation?.receiver_info?.profileId,
                  });
                }}>
                <Image
                  style={[
                    styles.avatarImage,
                    {
                      opacity:
                        props.currentMessage?.profileId ===
                        ProfileData.profileId
                          ? 0
                          : 1,
                    },
                  ]}
                  source={{
                    uri:
                      threadInfo?.avatar ||
                      'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png',
                  }}
                />
              </TouchableOpacity>
            )}
            renderBubble={(props: any) => {
              const currentMessage = props.currentMessage?.text;
              if (currentMessage?.includes('https://napa')) {
                const postId = currentMessage?.slice(
                  currentMessage.search('/detail/') + 8,
                );

                return (
                  <NapaPostPreview
                    message={props?.currentMessage}
                    isSender={
                      props?.currentMessage?.profileId ===
                      ProfileData?.profileId
                    }
                    postId={postId}
                  />
                );
              } else if (props.currentMessage?.text?.includes('https')) {
                return (
                  <LinkMessageCard
                    message={props?.currentMessage}
                    isSender={
                      props?.currentMessage?.profileId ===
                      ProfileData?.profileId
                    }
                  />
                );
              }
              console.log('---->', props.currentMessage);
              return (
                <MessageCard
                  message={props?.currentMessage}
                  isSender={
                    props?.currentMessage?.profileId === ProfileData?.profileId
                  }
                />
              );
            }}
            isKeyboardInternallyHandled={false}
            dateFormat={'D MMM YYYY'}
            keyboardShouldPersistTaps={'always'}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>No Records found</Text>
          </View>
        )}

        <View style={styles.sendMessageView}>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              value={message}
              selectionColor={'rgba(0,0,0,0.5)'}
              onChangeText={setMessage}
              multiline
              placeholder="Type a message"
              placeholderTextColor={themeColors.primaryColor}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={sendMessageApi}
              disabled={isLoading}
              activeOpacity={0.7}>
              <Text style={styles.sendBtnText}>
                {isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={themeColors.primaryColor}
                  />
                ) : (
                  'Send'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 0,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  sendBtnText: {
    color: '#16E6EF',
    fontWeight: '400',
    fontSize: 14,
    fontFamily: Fontfamily.Neuropolitical,
  },
  imageStyle: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: 100,
  },
  container: {
    paddingHorizontal: moderateScale(22),
    paddingTop: Platform.OS === 'ios' ? moderateScale(10) : moderateScale(10),
  },
  child: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(30),
  },
  leftChildren: {
    width: '25%',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  rightChildren: {
    width: '25%',
    alignItems: 'flex-end',
    marginBottom: verticalScale(10),
  },
  centerTitle: {
    color: 'white',
    fontSize: size.lg,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
  },
  avatarImage: {
    width: 38,
    height: 38,
    borderRadius: 38,
    backgroundColor: themeColors.darkColor,
    marginTop: 10,
  },
  sendMessageView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.black,
    height: 80,
    borderTopWidth: 1,
    borderColor: themeColors.garyColor,
  },
  textInputView: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 24,
    minHeight: 35,
    fontFamily: Fontfamily.Avenier,
    fontSize: 14,
    color: themeColors.primaryColor,
    lineHeight: 20,
    fontWeight: '500',
  },
  sendButton: {
    paddingRight: 24,
    minHeight: 35,
    borderRadius: 50,
    justifyContent: 'center',
  },
  messageContainerStyle: {
    flexGrow: 1,
    minHeight: 370,
    paddingBottom: 50,
  },
});
