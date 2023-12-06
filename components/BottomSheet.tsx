import Clipboard from '@react-native-clipboard/clipboard';
import {BlurView} from '@react-native-community/blur';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Share from 'react-native-share';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {CrossIcon, Search} from '../assets/svg';
import CopyLinkIcon from '../assets/svg/CopyLink';
import EmailIcon from '../assets/svg/EmailIcon';
import FacebookIconShare from '../assets/svg/FacebookIconShare';
import {LightCrossIcon} from '../assets/svg/LightCrossIcon';
import MoreIconShare from '../assets/svg/MoreIconShare';
import {RightIcon} from '../assets/svg/RightIcon';
import TelegramIcon from '../assets/svg/TelegramIcon';
import TextMessageIcon from '../assets/svg/TextMessageIcon';
import TwitterIconShare from '../assets/svg/TwitterIconShare';
import WhatsappIcon from '../assets/svg/WhatsappIcon';
import {SOCIAL_ART_API_URL} from '../const/Url';
import {generateLink} from '../services/CreateDynamicLink';
import {handleSearchUsers} from '../services/FollowAndFollowing';
import {getThreadList} from '../services/GetImportedToken';
import {sendNewMessage} from '../services/PostApi';
import {selectSharePost} from '../store/selectors/ShareNapaPost';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {pubnub} from '../screens/SocialArtScreen';

type Props = {
  shareEnabled: boolean;
  setShareEnabled: React.SetStateAction<boolean>;
};

const ShareBottomSheet = ({shareEnabled, setShareEnabled}: Props) => {
  const profileId = useSelector(selectProfileList)?.profileId;
  const [threads, setThreads] = useState([]);
  const postId = useSelector(selectSharePost)?.data;
  const [isSearchIconPressed, setIsSearchIconPressed] = useState(false);
  const postUrl = SOCIAL_ART_API_URL + '/user/social/video/detail/';
  const operator = Platform.select({ios: '&', android: '?'});
  const [search, setSearch] = useState<string>('');
  const ProfileData = useSelector(selectProfileList);
  const [searchData, setSearchData] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchThreadList = async () => {
    const {data, error}: any = await getThreadList(profileId);
    if (!error) {
      console.log('🇰🇳 data: ', JSON.stringify(data));
      setThreads(data?.data);
      setSearchData(data?.data);
    }
  };

  useEffect(() => {
    fetchThreadList();
  }, []);

  const handleSocialLinkPress = async (item, url) => {
    const param = {
      postId: 'postId',
      type: 'type',
    };

    const value = {
      postIdValue: postId,
      type: 'post',
    };

    const link = await generateLink(param, value);
    let targetUrl = url;

    switch (item?.name) {
      case 'Copy Link':
        Clipboard.setString(link);
        setShareEnabled(false);
        return;

      case 'More':
        const options = {url: link};
        await handleMorePress(options);
        return;

      case 'SMS':
        const separator = Platform.OS === 'ios' ? '&' : '?';
        targetUrl = `sms:${separator}body=${link}`;
        Linking.openURL(targetUrl);
        return;

      case 'Email':
        const encodedBody = encodeURIComponent(link);
        targetUrl = `mailto:?body=${encodedBody}`;
        Linking.openURL(targetUrl);
        return;

      case 'Whatsapp':
        targetUrl = url + link;
        Linking.openURL(targetUrl);
        return;
    }

    try {
      const supported = await Linking.canOpenURL(targetUrl + link);
      if (supported) {
        await Linking.openURL(targetUrl + link);
      } else {
        Alert.alert(`Don't know how to open this URL: ${targetUrl}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchPressed = () => {
    setIsSearchIconPressed(true);
  };

  const filterUsers = async () => {
    setLoading(true);
    const res = threads.filter(
      item => item?.receiver_info?.profileName.search(search) !== -1,
    );

    let userList = [];
    let finalData = [];
    userList = await handleGetUsers();

    finalData = userList ? [...res, ...userList] : [...res];

    console.log('final data: ' + finalData);
    setLoading(false);

    if (search.length > 0 && finalData.length > 0)
      setSearchData([...selectedProfiles, ...finalData]);
    else if (search.length > 0 && finalData.length === 0) setSearchData([]);
  };

  const handleGetUsers = async () => {
    const {data, error, message} = await handleSearchUsers(search);

    console.log(data, 'data');
    if (error) {
      console.log(message, 'error');
      setLoading(false);
      return;
    }
    return data;
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      if (search.length > 0) {
        filterUsers();
        console.log('object', searchData);
      }
    }, 500);

    return () => {
      clearTimeout(getData);
    };
  }, [search]);

  const handleCancelSearch = () => {
    setIsSearchIconPressed(false);
    setSearch('');
    const res = [...new Set([...selectedProfiles, ...threads])];
    setSearchData(res);
  };

  const socialShareData = [
    {
      name: 'Facebook',
      image: <FacebookIconShare />,
      url: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    {
      name: 'Twitter',
      image: <TwitterIconShare />,
      url: 'https://x.com/intent/tweet?text=',
    },
    {
      name: 'Telegram',
      image: <TelegramIcon />,
      url: 'https://telegram.me/share/url?url=',
    },
    {
      name: 'Whatsapp',
      image: <WhatsappIcon />,
      url: 'https://api.whatsapp.com/send?text=',
    },
    {
      name: 'Copy Link',
      image: <CopyLinkIcon />,
      url: SOCIAL_ART_API_URL,
    },
    {
      name: 'SMS',
      image: <TextMessageIcon />,
      url: `sms:${operator}body=`,
    },
    {
      name: 'Email',
      image: <EmailIcon />,
      url: 'mailto:?subject=?NapaPost&body=',
    },
    {
      name: 'More',
      image: <MoreIconShare />,
      url: SOCIAL_ART_API_URL,
    },
  ];

  const handleMorePress = async customOptions => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const [selectLimit, setSelectLimit] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

  const handleOnSelectProfile = (item: any, index: number) => {
    if (searchData[index].isSelected === true) {
      searchData[index].isSelected = false;
      setSelectLimit(limit => limit - 1);
      const i = selectedProfiles.findIndex(
        profile => profile?.profileId === item.profileId,
      );
      selectedProfiles.splice(i, 1);
    } else {
      if (selectLimit < 5) {
        searchData[index].isSelected = true;
        setSelectLimit(limit => limit + 1);
        setSelectedProfiles(data => [...data, searchData[index]]);
      } else {
        setLimitReached(true);
        setTimeout(() => {
          setLimitReached(false);
        }, 3000);
      }
    }
  };

  const handleShareMessage = async () => {
    searchData.map(profile => {
      if (profile?.isSelected) {
        profile.isSelected = false;
      }
    });
    selectedProfiles.map(async (profile: any) => {
      const receiverProfileId =
        profile?.profileId || profile?.receiver_info?.profileId;
      const text = postUrl + postId;
      let threadId;

      if (!profile?.receiver_info) {
        const {data} = await sendNewMessage(
          ProfileData.profileId,
          '',
          receiverProfileId,
          'New Chat Started',
        );
        threadId = data?.data?.threadId;
      }

      const publishPayload = {
        channel: profile?.receiver_info?.threadId || threadId,
        message: {
          isSender: false,
          text: text,
          profileId: ProfileData?.profileId,
        },
      };
      await pubnub.publish(publishPayload);
      await sendNewMessage(profileId, '', receiverProfileId, text);
    });
    setSelectLimit(0);
    setSelectedProfiles([]);
    setSharePressed(true);
    setIsSearchIconPressed(false);
    setSearch('');
    const res = [...new Set([...selectedProfiles, ...threads])];
    setSearchData(res);
  };

  const [select, setSelect] = useState(false);
  const [sharePressed, setSharePressed] = useState(false);

  useEffect(() => {
    // This is Mandatory useEffect because it will re-rendering users so don't remove it
    console.log('object', selectedProfiles);
  }, [select]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={shareEnabled}
      onRequestClose={() => {
        setShareEnabled(false);
      }}>
      <View style={styles.modalContainer}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          overlayColor="transparent"
          reducedTransparencyFallbackColor="white"
        />
        {limitReached && (
          <ImageBackground
            imageStyle={{borderRadius: 15}}
            source={require('../assets/images/reject_gradient.png')}
            style={styles.backgroungImageStyle}>
            <View style={{marginLeft: moderateScale(15), alignSelf: 'center'}}>
              <CrossIcon color={themeColors.lightred} />
            </View>
            <Text style={styles.messageText}>
              You cannot select more than 5 users.
            </Text>
          </ImageBackground>
        )}
        <View style={styles.modalMainContainer}>
          {isSearchIconPressed ? (
            <View style={styles.containerChild}>
              <Search />
              <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor={themeColors.primaryColor}
                value={search}
                autoCapitalize="none"
                onChangeText={text => setSearch(text)}
              />
              <Pressable onPress={handleCancelSearch}>
                <CrossIcon color={themeColors.primaryColor} />
              </Pressable>
            </View>
          ) : (
            <View style={styles.shareSearchMainView}>
              <View style={styles.shareView}>
                {/* <Text style={styles.titleStyle}>Share To</Text> */}
              </View>
              <TouchableOpacity
                style={styles.searchView}
                onPress={handleSearchPressed}>
                <View>
                  <Search />
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.usersListView}>
            {!loading ? (
              <FlatList
                keyExtractor={(_, index) => index}
                data={searchData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <View style={styles.listEmptyComponentView}>
                    <Text style={styles.listEmptyText}>No Chats found</Text>
                  </View>
                )}
                style={styles.usersFlatlist}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelect(!select);
                        handleOnSelectProfile(item, index);
                        setSharePressed(false);
                      }}>
                      <View style={styles.avatarView}>
                        <View>
                          <Image
                            source={{
                              uri:
                                item?.receiver_info?.avatar ||
                                item?.avatar ||
                                'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                            }}
                            style={styles.avatarImage}
                            resizeMode="cover"
                          />
                          {item?.isSelected && (
                            <View style={styles.selectUserView}>
                              <RightIcon
                                height={10}
                                width={10}
                                color={themeColors.primaryColor}
                              />
                            </View>
                          )}
                        </View>
                        <View style={styles.userNameView}>
                          <Text style={styles.userName} numberOfLines={1}>
                            {item?.receiver_info?.profileName ||
                              item?.profileName}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <View style={styles.loaderView}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}
          </View>
          <FlatList
            keyExtractor={(_, index) => index}
            data={socialShareData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.usersFlatlist}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    handleSocialLinkPress(item, item.url);
                  }}>
                  <View style={styles.avatarView}>
                    {item.image}
                    <View style={styles.userNameView}>
                      <Text style={styles.userName} numberOfLines={1}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          {/* {limitReached && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{textAlign: 'center', color: themeColors.lightred}}>
                You cannot select more than 5 users
              </Text>
            </View>
          )} */}
          <View
            style={{
              height: 50,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {selectLimit > 0 ? (
              <TouchableOpacity
                style={styles.sellBtn}
                onPress={handleShareMessage}>
                <Text style={styles.completeSellBtn}>Share</Text>
              </TouchableOpacity>
            ) : sharePressed ? (
              <View style={styles.sentMessageView}>
                <Text style={styles.sentMessage}>Sent</Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setShareEnabled(false)}
                style={styles.crossStyle}>
                <LightCrossIcon />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ShareBottomSheet;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.lg,
    color: themeColors.primaryColor,
    textAlign: 'center',
    marginLeft: moderateScale(60),
  },
  buttonView: {
    height: moderateScale(35),
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(22),
  },
  subtitleStyle: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.lg,
    textAlign: 'center',
  },
  crossStyle: {
    marginBottom: moderateScale(10),
  },
  shareSearchMainView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shareView: {
    flex: 9,
  },
  searchView: {
    flex: 2,
    alignItems: 'center',
  },
  usersFlatlist: {
    width: '100%',
    height: moderateScale(100),
    flexGrow: 0,
    marginTop: moderateScale(30),
  },
  avatarView: {
    marginHorizontal: moderateScale(10),
  },
  avatarImage: {
    height: moderateScale(55),
    width: moderateScale(55),
    borderWidth: 0,
    borderRadius: moderateScale(50),
  },
  userNameView: {
    marginTop: -7,
    width: 50,
    alignSelf: 'center',
  },
  userName: {
    fontFamily: Fontfamily.Avenier,
    marginTop: verticalScale(10),
    textAlign: 'center',
    color: themeColors.primaryColor,
    // fontWeight: 'bold',
  },
  listEmptyComponentView: {
    flex: 1,
    width: moderateScale(370),
    alignSelf: 'center',
  },
  listEmptyText: {
    color: 'white',
    textAlign: 'center',
    fontSize: size.md,
  },
  containerChild: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: 'white',
    height: 40,
    borderWidth: 0,
    padding: 10,
    width: '80%',
    fontSize: size.md,
  },
  selectUserView: {
    position: 'absolute',
    top: '75%',
    left: '55%',
    backgroundColor: themeColors.aquaColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(15),
    height: moderateScale(15),
    borderRadius: 20,
  },
  shareAlternateView: {
    // marginVertical: moderateScale(29),
    height: 50,
    paddingBottom: 5,
  },
  shareBtn: {
    height: 50,
    // marginVertical: moderateScale(10),
    width: 120,
    paddingBottom: 5,
  },
  loaderView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateScale(20),
    height: 120,
  },
  sentMessageView: {
    // marginVertical: moderateScale(10),
    height: 50,
    width: '90%',
    borderRadius: 10,
    // padding: 5,
    paddingBottom: 5,
    backgroundColor: themeColors.blurBackground,
  },
  sentMessage: {
    color: themeColors.primaryColor,
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  usersListView: {
    height: 120,
    width: '100%',
  },
  sellBtn: {
    height: 60,
    backgroundColor: themeColors.aquaColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // marginBottom: verticalScale(60),
  },
  completeSellBtn: {
    fontFamily: Fontfamily.Neuropolitical,
    color: 'black',
    fontSize: 14,
  },
  backgroungImageStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: Dimensions.get('window').width < 337 ? size.default : size.md,
    fontWeight: '500',
    color: themeColors.primaryColor,
    marginLeft: moderateScale(10),
    paddingRight: moderateScale(40),
    marginVertical: verticalScale(10),
  },
});
