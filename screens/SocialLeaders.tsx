import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import LikedPost from './LikedPost';
import RewardsPost from '../components/RewardsPost';
import DiscussedPosts from '../components/DiscussedPosts';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetMostViewedPosts} from '../store/slices/getMostViewedPosts';
import {selectgetMostViewedPostsLoading} from '../store/selectors/getMostViewedPosts';
import {height} from '../utils/helper';
import {size} from '../theme/fontstyle';

const SocialLeaders = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [leadersRefreash, setLeadersRefreash] = useState<boolean>(false);
  const leadersLoading = useSelector(selectgetMostViewedPostsLoading);
  const dispatch = useDispatch();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(fetchGetMostViewedPosts());
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <>
      {leadersRefreash ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              progressBackgroundColor="transparent"
              colors={['white']}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          scrollEnabled={false}>
          <View style={{flex: 1}}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={styles.tabOneStyle}
                onPress={() => setTabIndex(0)}>
                <Text
                  style={[
                    styles.tabOneTextStyle,
                    {
                      color:
                        tabIndex == 0
                          ? themeColors.aquaColor
                          : themeColors.garyColor,
                    },
                  ]}>
                  Likes
                </Text>
              </TouchableOpacity>
              <View style={styles.lineStyle} />
              <TouchableOpacity
                style={styles.tabTwoStyle}
                onPress={() => setTabIndex(1)}>
                <Text
                  style={[
                    styles.tabTwoTextStyle,
                    {
                      color:
                        tabIndex == 1
                          ? themeColors.aquaColor
                          : themeColors.garyColor,
                    },
                  ]}>
                  Awards
                </Text>
              </TouchableOpacity>
              <View style={styles.lineStyle} />
              <TouchableOpacity
                style={styles.tabTwoStyle}
                onPress={() => setTabIndex(2)}>
                <Text
                  style={[
                    styles.tabTwoTextStyle,
                    {
                      color:
                        tabIndex == 2
                          ? themeColors.aquaColor
                          : themeColors.garyColor,
                    },
                  ]}>
                  Comments
                </Text>
              </TouchableOpacity>
            </View>
            {leadersLoading ? (
              <View
                style={{
                  height: 400,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator
                  size="large"
                  color={themeColors.primaryColor}
                />
              </View>
            ) : (
              <View>
                {tabIndex == 0 && (
                  <LikedPost setLeaderRefrash={setLeadersRefreash} />
                )}
                {tabIndex == 1 && (
                  <RewardsPost setLeaderRefrash={setLeadersRefreash} />
                )}
                {tabIndex == 2 && (
                  <DiscussedPosts setLeaderRefrash={setLeadersRefreash} />
                )}
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={{flex: 100}}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={styles.tabOneStyle}
              onPress={() => setTabIndex(0)}>
              <Text
                style={[
                  styles.tabOneTextStyle,
                  {
                    color:
                      tabIndex == 0
                        ? themeColors.aquaColor
                        : themeColors.garyColor,
                  },
                ]}>
                Likes
              </Text>
            </TouchableOpacity>
            <View style={styles.lineStyle} />
            <TouchableOpacity
              style={styles.tabTwoStyle}
              onPress={() => setTabIndex(1)}>
              <Text
                style={[
                  styles.tabTwoTextStyle,
                  {
                    color:
                      tabIndex == 1
                        ? themeColors.aquaColor
                        : themeColors.garyColor,
                  },
                ]}>
                Awards
              </Text>
            </TouchableOpacity>
            <View style={styles.lineStyle} />
            <TouchableOpacity
              style={styles.tabTwoStyle}
              onPress={() => setTabIndex(2)}>
              <Text
                style={[
                  styles.tabTwoTextStyle,
                  {
                    color:
                      tabIndex == 2
                        ? themeColors.aquaColor
                        : themeColors.garyColor,
                  },
                ]}>
                Comments
              </Text>
            </TouchableOpacity>
          </View>
          {leadersLoading ? (
            <View
              style={{
                height: 400,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator
                size="large"
                color={themeColors.primaryColor}
              />
            </View>
          ) : (
            <View>
              {tabIndex == 0 && (
                <LikedPost setLeaderRefrash={setLeadersRefreash} />
              )}
              {tabIndex == 1 && (
                <RewardsPost setLeaderRefrash={setLeadersRefreash} />
              )}
              {tabIndex == 2 && (
                <DiscussedPosts setLeaderRefrash={setLeadersRefreash} />
              )}
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default SocialLeaders;

const styles = StyleSheet.create({
  tabTwoTextStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
  },
  tabOneTextStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
  },
  tabTwoStyle: {
    flex: 1,
    alignItems: 'center',
  },
  lineStyle: {
    height: '70%',
    width: 0.1,
    backgroundColor: themeColors.garyColor,
    flex: 0.01,
    opacity: 0.3,
  },
  tabOneStyle: {
    alignItems: 'center',
    flex: 1,
  },
  tabContainer: {
    backgroundColor: themeColors.darkGray,
    height: height > 1000 ? (Platform.OS == 'ios' ? 60 : 32) : 32,
    marginHorizontal: 8,
    borderRadius: 100 / 2,
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 26,
  },
});
