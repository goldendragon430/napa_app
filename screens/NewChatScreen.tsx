import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-get-random-values';
import {GiftedChat} from 'react-native-gifted-chat';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useToast} from 'react-native-toast-notifications';
import {useSelector} from 'react-redux';
import {v4 as uuid4} from 'uuid';
import {BackIcon} from '../assets/svg';
import Layout from '../common/Layout';
import LoaderButton from '../common/LoaderButton';
import ErrorToast from '../common/toasters/ErrorToast';
import LinkMessageCard from '../components/LinkMessageCard';
import MessageCard from '../components/MessageCard';
import NapaPostPreview from '../components/NapaPostPreview';
import {getThreadMessages} from '../services/GetImportedToken';
import {sendNewMessage} from '../services/PostApi';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {SCREENS} from '../typings/screens-enums';
import {pubnub} from './SocialArtScreen';

const generateUniqueID = () => {
  return uuid4();
};

const NewChatScreen = () => {
  const {goBack} = useNavigation<any>();
  const {navigate} = useNavigation<any>();
  const route = useRoute<any>();
  const {post, isNapaPost, threadId, threadInformation, receiverProfileId} =
    route?.params;
  //   const [messages, setMessages] = useState<any>(null);
  const [threadInfo, setThreadInfo] = useState<any>();
  const [message, setMessage] = useState<string>('');
  const toast = useToast();
  const ProfileData = useSelector(selectProfileList);
  const socialArtSocketRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(true);
  const [timeToken, setTimeToken] = useState(0);

  // new addons
  const [messages, setMessages] = useState([]);

  const handleChangeText = async (text: string) => {
    setMessage(text);
    try {
      pubnub.signal({
        message: ProfileData.profileId,
        channel: threadId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      try {
        pubnub.signal({
          message: 'TypingEnded',
          channel: threadId,
        });
      } catch (e) {
        console.log(e);
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [message]);

  useEffect(() => {
    try {
      pubnub
        .fetchMessages({
          channels: [threadId],
          includeUUID: true,
          includeMessageActions: true,
          count: 20,
        })
        .then(historicalMessages => {
          let historicalMessagesArray =
            historicalMessages['channels'][threadId];
          for (let i = 0; i < historicalMessagesArray?.length; i++) {
            let mess = historicalMessagesArray[i];
            console.log('mess', mess);
            const tmp = {...mess, _id: generateUniqueID()};
            if (
              historicalMessagesArray[i]?.uuid !== ProfileData.profileId &&
              !historicalMessagesArray[i]?.actions
            ) {
              console.log(' 💖 Here ');
              pubnub.addMessageAction({
                channel: threadId,
                messageTimetoken: historicalMessagesArray[i]?.timetoken,
                action: {
                  type: 'receipt',
                  value: 'message_read',
                },
              });
            }
            setMessages(msgs => [...msgs, tmp]);
          }
        });
    } catch (e) {
      console.log(e);
    }

    const showMessage = msg => {
      const tmp = {...msg, isMessageSent: true, _id: generateUniqueID()};
      setMessages(messages => [...messages, tmp]);
      console.log('🚀 ~ file: NewChatScreen.tsx:111 ~ showMessage ~ msg:', msg);
    };

    // add listener
    const listener = {
      status: statusEvent => {
        if (statusEvent.category === 'PNConnectedCategory') {
          console.log('Connected');
        }
      },
      message: messageEvent => {
        showMessage(messageEvent);

        if (messageEvent.publisher !== ProfileData.profileId) {
          console.log(' 💖 Matched ', messageEvent);
          try {
            pubnub.addMessageAction(
              {
                channel: threadId,
                messageTimetoken: messageEvent.timetoken,
                action: {
                  type: 'receipt',
                  value: 'message_read',
                },
              },
              function (status, response) {
                console.log(
                  '🚀 ~ file: NewChatScreen.tsx:125 ~ publishMessage ~ response:',
                  status,
                  response,
                );
              },
            );
          } catch (e) {
            console.log(e);
          }
        }
      },
      messageAction: messageEvent => {
        console.log('💚 MEssageEvent', messageEvent);
        if (messageEvent?.data.value === 'message_read') {
          // The message was delivered to the user.
          console.log(' 🩵 Yes Message Read', messageEvent);
          setIsMessageSent(false);
          setTimeToken(messageEvent.data.messageTimetoken);
          console.log('🆎', messages);
          pubnub.getMessageActions(
            {
              channel: threadId,
              start: messageEvent.data.messageTimetoken,
              end: messageEvent.data.actionTimetoken,
              limit: 10,
            },
            function (status, response) {
              console.log(status, response);
            },
          );
        }
      },
      presence: presenceEvent => {
        // handle presence
      },
      signal: messageEvent => {
        console.log('💛 This ', messageEvent);
        if (messageEvent.message !== ProfileData.profileId) {
          setIsTyping(true);
        }
        if (messageEvent.message === 'TypingEnded') {
          setIsTyping(false);
        }
      },
    };

    pubnub.addListener(listener);
    // cleanup listener
    return () => {
      pubnub.removeListener(listener);
    };
  }, [pubnub]);

  // publish message
  const publishMessage = async (m: string) => {
    console.log('message published', m, pubnub);
    if (m !== '') {
      const publishPayload = {
        channel: threadId,
        message: {
          isSender: false,
          text: m,
          profileId: ProfileData?.profileId,
          _id: generateUniqueID(),
        },
      };
      await pubnub.publish(publishPayload);
      await sendMessageApi();
      setMessage('');
    }
  };

  useEffect(() => {
    // subscribe to a channel
    pubnub.subscribe({
      channels: [threadId],
    });
    // cleanup subscription
    return () => {
      pubnub.unsubscribe({
        channels: [threadId],
      });
    };
  }, [pubnub]);

  // Start
  const fetchThreadMessageList = async () => {
    const {data, error}: any = await getThreadMessages(
      ProfileData.profileId,
      threadId,
      receiverProfileId,
    );
    if (!error) {
      setThreadInfo(data?.data?.threadInfo);
    }
  };

  useEffect(() => {
    if (messages) {
      fetchThreadMessageList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessageApi = async () => {
    console.log(
      'hhhhhhhhhhhhh',
      ProfileData.profileId,
      threadId,
      receiverProfileId,
      message,
    );
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
    }
    setMessage('');
    Keyboard.dismiss();
  };

  // Ended

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
      //   fetchThreadMessageList();
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
                  threadInformation: threadInformation,
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
            isTyping={isTyping}
            messagesContainerStyle={styles.messageContainerStyle}
            onInputTextChanged={(t: string) => setMessage(t)}
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
                    threadInformation: threadInformation,
                  });
                }}>
                <Image
                  style={[
                    styles.avatarImage,
                    {
                      opacity:
                        props.currentMessage?.message?.profileId ===
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
              const currentMessage = props?.currentMessage?.message?.text;
              console.log(
                '🅿️ Current Message',
                JSON.stringify(props?.currentMessage),
              );

              if (currentMessage?.includes('https://napa-social')) {
                const postId = currentMessage?.slice(
                  currentMessage.search('/detail/') + 8,
                );

                return (
                  <NapaPostPreview
                    message={props?.currentMessage}
                    isSender={
                      props?.currentMessage?.message?.profileId ===
                      ProfileData?.profileId
                    }
                    timeToken={props?.currentMessage?.timetoken}
                    isMessageSent={isMessageSent}
                    isMessageReceived={
                      timeToken === props?.currentMessage?.timetoken
                    }
                    postId={postId}
                  />
                );
              } else if (currentMessage?.includes('https')) {
                return (
                  <LinkMessageCard
                    message={props?.currentMessage}
                    isSender={
                      props?.currentMessage?.message?.profileId ===
                      ProfileData?.profileId
                    }
                    timeToken={props?.currentMessage?.timetoken}
                    isMessageSent={isMessageSent}
                    isMessageReceived={
                      timeToken === props?.currentMessage?.timetoken
                    }
                  />
                );
              }
              // console.log('---->', props.currentMessage);
              return (
                <MessageCard
                  message={props?.currentMessage}
                  isSender={
                    props?.currentMessage?.message?.profileId ===
                    ProfileData?.profileId
                  }
                  timeToken={props?.currentMessage?.timetoken}
                  isMessageSent={isMessageSent}
                  messageToken={timeToken}
                  isMessageReceived={
                    timeToken === props?.currentMessage?.timetoken
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

        {/* {!messages ? (
          <LoaderButton />
        ) : messages.length > 0 ? (
          messages.map((mes, idx) => {
            console.log('IDX', mes);
            return (
              <Text key={idx} style={{color: themeColors.primaryColor}}>
                {mes}
              </Text>
            );
          })
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>No Records found</Text>
          </View>
        )} */}

        <View style={styles.sendMessageView}>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              value={message}
              selectionColor={'rgba(0,0,0,0.5)'}
              onChangeText={text => handleChangeText(text)}
              multiline
              placeholder="Type a message"
              placeholderTextColor={themeColors.primaryColor}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                publishMessage(message);
              }}
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

export default NewChatScreen;

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
    // flexGrow: 1,
    // minHeight: 370,
    // marginBottom: 150,
  },
});
