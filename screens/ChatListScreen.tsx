import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {BackIcon, CrossIcon, Search} from '../assets/svg';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ChatListCard from '../components/ChatListCard';
import {themeColors} from '../theme/colors';
import {SCREENS} from '../typings/screens-enums';
import {getThreadList} from '../services/GetImportedToken';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {useSelector} from 'react-redux';
import {SOCIAL_ART_WEBSOCKET_URL} from '../const/Url';
import {size} from '../theme/fontstyle';
import {moderateScale} from 'react-native-size-matters';

const ChatListScreen = () => {
  const {goBack, navigate} = useNavigation<any>();
  const profileId = useSelector(selectProfileList)?.profileId;
  const [threads, setThreads] = useState([]);
  const socialArtSocketRef = useRef<any>(null);
  const [isSearchIconPressed, setIsSearchIconPressed] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [searchData, setSearchData] = useState([]);

  const fetchThreadList = async () => {
    const {data, error}: any = await getThreadList(profileId);
    if (!error) {
      setThreads(data?.data);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchThreadList();
      return () => {
        fetchThreadList();
        // Useful for cleanup functions
      };
    }, []),
  );

  useEffect(() => {
    fetchThreadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectToSocialArt = async () => {
    if (socialArtSocketRef.current == null) {
      socialArtSocketRef.current = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
      socialArtSocketRef.current.addEventListener('message', ({data}: any) => {
        const response = JSON.parse(data);
        if (response?.event === 'thread-added') {
          fetchThreadList();
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

  console.log('****** Threads', threads);

  const handleSearchPressed = () => {
    setIsSearchIconPressed(true);
  };

  const filterUsers = () => {
    const res = threads.filter(
      item => item?.receiver_info?.profileName.search(search) !== -1,
    );

    if (search.length > 0 && res.length > 0) setSearchData(res);
    else if (search.length > 0 && res.length === 0) setSearchData([]);
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      if (search.length > 0) {
        filterUsers();
      }
    }, 500);

    return () => {
      clearTimeout(getData);
    };
  }, [search]);

  const handleCancelSearch = () => {
    setIsSearchIconPressed(false);
    setSearch('');
  };

  return (
    <Layout>
      {isSearchIconPressed ? (
        <View style={styles.containerChild}>
          <Search />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={themeColors.garyColor}
            value={search}
            autoCapitalize="none"
            onChangeText={text => setSearch(text)}
          />
          <Pressable onPress={handleCancelSearch}>
            <CrossIcon color={themeColors.garyColor} />
          </Pressable>
        </View>
      ) : (
        <Header
          leftChildren={
            <TouchableOpacity onPress={() => goBack()}>
              <BackIcon color={themeColors.garyColor} />
            </TouchableOpacity>
          }
          rightChildren={
            <TouchableOpacity onPress={handleSearchPressed}>
              <Search color={themeColors.garyColor} />
            </TouchableOpacity>
          }
          title={false}
          centerTitle={'Chats'}
        />
      )}
      {threads?.length > 0 ? (
        <FlatList
          data={search.length > 0 ? searchData : threads}
          style={styles.flatListContainer}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={() => (
            <View style={styles.noContent}>
              <Text style={styles.noContentText}>No Records Found</Text>
            </View>
          )}
          renderItem={({item, index}: any) => (
            <ChatListCard
              item={item}
              index={index}
              onPress={() => {
                navigate(SCREENS.NEWCHATSCREEN, {
                  threadId: item.threadId,
                  threadInformation: item,
                });
              }}
            />
          )}
        />
      ) : (
        <View style={styles.noContent}>
          <Text style={styles.noContentText}>No Records Found</Text>
        </View>
      )}
    </Layout>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 24,
    flexGrow: 1,
    paddingBottom: 100,
  },
  flatListContainer: {
    marginTop: 10,
  },
  noContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContentText: {
    color: 'white',
    fontSize: 18,
  },
  containerChild: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
  },
  input: {
    color: 'white',
    height: 40,
    borderWidth: 0,
    padding: 10,
    width: '83%',
    marginTop: moderateScale(5),
    fontSize: size.md,
  },
});
