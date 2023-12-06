import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectgetMostViewedPostsDataList} from '../store/selectors/getMostViewedPosts';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import RewardsPostcard from './RewardsPostcard';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {size} from '../theme/fontstyle';
import {CrowncarveIcon} from '../assets/svg/CrowncarveIcon';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {height, truncatedText} from '../utils/helper';
interface awardPostsValue {
  thumbnail?: string;
  userName?: string;
  awards?: number;
  postId?: string;
}
type RewardsPostProps = {
  setLeaderRefrash: any;
};
const RewardsPost: React.FC<RewardsPostProps> = ({setLeaderRefrash}) => {
  const {navigate} = useNavigation<any>();
  const getMostAwardsPosts = useSelector(selectgetMostViewedPostsDataList).data;

  const [top3awardedPost, setTop3awardedPost] = useState<awardPostsValue[]>([]);
  const [topawardedPost, setTopawardedPost] = useState<awardPostsValue[]>([]);
  let isCarousel = useRef();
  useEffect(() => {
    if (getMostAwardsPosts?.awardedPosts?.length <= 2) {
      let awardedPostsLengthLessthantwo =
        getMostAwardsPosts?.awardedPosts?.slice(
          0,
          getMostAwardsPosts?.awardedPosts?.length,
        );
      setTop3awardedPost(awardedPostsLengthLessthantwo);
    }
    if (getMostAwardsPosts?.awardedPosts?.length >= 2) {
      let awardedPostsLengthequaltwo = getMostAwardsPosts?.awardedPosts?.slice(
        0,
        3,
      );
      setTop3awardedPost(awardedPostsLengthequaltwo);
    }
    if (getMostAwardsPosts?.awardedPosts?.length > 2) {
      let awardedPostsLengthGreaterthantwo =
        getMostAwardsPosts?.awardedPosts?.slice(
          3,
          getMostAwardsPosts?.awardedPosts?.length,
        );
      setTopawardedPost(awardedPostsLengthGreaterthantwo);
    }
  }, []);
  //  const truncatedText = (title: any) => {
  //   if (title?.length > 20) {
  //     let truncatedText = title?.substring(0, 19);
  //     return (truncatedText += '...');
  //   } else {
  //     return title;
  //   }
  // };

  return (
    <>
      {getMostAwardsPosts?.awardedPosts?.length ? (
        <>
          <View style={styles.container}>
            <Pressable style={styles.topLikesContent}>
              {top3awardedPost?.length >= 2 && (
                <TouchableOpacity
                  onPress={() =>
                    navigate(SCREENS.POSTDETAILS, {
                      post: top3awardedPost[1]?.postId,
                    })
                  }
                  style={styles.secondLikeContent}>
                  <Text style={styles.secondLike}>2</Text>
                  <Image
                    style={styles.secondLikeUserImage}
                    source={{
                      uri:
                        top3awardedPost[1]?.thumbnail ||
                        'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                    }}
                  />
                  <Text style={styles.secondLikeUserName}>
                    {truncatedText(top3awardedPost[1]?.userName as string)}
                  </Text>
                  <Text style={styles.totalLikes}>
                    {top3awardedPost[1]?.awards}
                  </Text>
                  <Text style={styles.likesLabel}>Awards</Text>
                </TouchableOpacity>
              )}
              {top3awardedPost?.length >= 1 && (
                <TouchableOpacity
                  onPress={() =>
                    navigate(SCREENS.POSTDETAILS, {
                      post: top3awardedPost[0]?.postId,
                    })
                  }
                  style={styles.firstLikeContent}>
                  <CrowncarveIcon style={styles.iconStyle} />
                  <Image
                    style={styles.firstLikeUserImage}
                    source={{
                      uri:
                        top3awardedPost[0]?.thumbnail ||
                        'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                    }}
                  />
                  <Text style={styles.firstLikeUserName}>
                    {truncatedText(top3awardedPost[0]?.userName as string)}
                  </Text>
                  <Text style={styles.totalLikes}>
                    {top3awardedPost[0]?.awards}
                  </Text>
                  <Text style={styles.likesLabel}>Awards</Text>
                </TouchableOpacity>
              )}
              {top3awardedPost?.length >= 3 && (
                <TouchableOpacity
                  onPress={() =>
                    navigate(SCREENS.POSTDETAILS, {
                      post: top3awardedPost[2]?.postId,
                    })
                  }
                  style={styles.thirdLikeContent}>
                  <Text style={styles.thirdLike}>3</Text>
                  <Image
                    style={styles.thirsLikeUserImage}
                    source={{
                      uri:
                        top3awardedPost[2]?.thumbnail ||
                        'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                    }}
                  />
                  <Text style={styles.thirdLikeUserName}>
                    {truncatedText(top3awardedPost[2]?.userName as string)}
                  </Text>
                  <Text style={styles.totalLikes}>
                    {top3awardedPost[2]?.awards}
                  </Text>
                  <Text style={styles.likesLabel}>Awards</Text>
                </TouchableOpacity>
              )}
            </Pressable>
            <ScrollView>
              <Pressable
                style={{
                  marginBottom: 300 * 2,
                }}>
                <FlatList
                  data={topawardedPost}
                  contentContainerStyle={{marginTop: 19}}
                  renderItem={({item, index}) => (
                    <RewardsPostcard item={item} index={index} />
                  )}
                />
              </Pressable>
            </ScrollView>
          </View>
        </>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: moderateScale(200),
          }}>
          <Text
            style={{
              color: themeColors.garyColor,
              fontFamily: Fontfamily.Avenier,
              fontSize: size.lg,
              fontWeight: 'bold',
            }}>
            No Post Found
          </Text>
        </View>
      )}
    </>
  );
};

export default RewardsPost;

const styles = StyleSheet.create({
  likesLabel: {
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
    color: themeColors.garyColor,
    marginTop: 8,
    fontWeight: '500',
  },
  totalLikes: {
    color: themeColors.aquaColor,
    fontSize: size.md,
    lineHeight: 19,
    fontFamily: Fontfamily.Grostestk,
  },
  iconStyle: {
    marginBottom: 10,
  },
  secondLikeUserName: {
    color: 'white',
    fontSize: size.md,
    fontFamily: Fontfamily.Avenier,
    marginTop: 13,
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  firstLikeUserName: {
    color: 'white',
    fontSize: size.md,
    fontFamily: Fontfamily.Avenier,
    marginTop: 13,
    fontWeight: '500',
  },
  thirdLikeUserName: {
    color: 'white',
    fontSize: size.md,
    fontFamily: Fontfamily.Avenier,
    marginTop: 13,
    fontWeight: '500',
    flexWrap: 'wrap',
    // width:'50%'
  },
  thirdLike: {
    color: 'white',
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
    marginBottom: 10,
    fontWeight: '500',
  },
  secondLike: {
    color: 'white',
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
    marginBottom: 10,
    fontWeight: '500',
  },
  thirsLikeUserImage: {
    width:
      Dimensions.get('window').width < 337
        ? 90
        : Platform.OS == 'ios' && height > 1000
        ? verticalScale(100)
        : 100,
    height:
      Dimensions.get('window').width < 337
        ? 90
        : Platform.OS == 'ios' && height > 1000
        ? verticalScale(100)
        : 100,
    borderRadius:
      Platform.OS == 'ios' && height > 1000 ? verticalScale(120) / 2 : 120 / 2,
    backgroundColor: '#B1B1B1',
  },
  firstLikeUserImage: {
    width:
      Dimensions.get('window').width < 337
        ? 115
        : Platform.OS == 'ios' && height > 1000
        ? verticalScale(150)
        : 150,
    height:
      Dimensions.get('window').width < 337
        ? 115
        : Platform.OS == 'ios' && height > 1000
        ? verticalScale(150)
        : 150,
    borderRadius:
      Platform.OS == 'ios' && height > 1000 ? verticalScale(170) / 2 : 170 / 2,
    marginBottom: Dimensions.get('window').width < 337 ? 15 : 0,
    backgroundColor: '#B1B1B1',
  },
  secondLikeUserImage: {
    width:
      Dimensions.get('window').width < 337
        ? 90
        : Platform.OS == 'ios' && height > 1000
        ? verticalScale(100)
        : 100,
    height:
      Dimensions.get('window').width < 337
        ? 90
        : Platform.OS == 'ios' && height > 1000
        ? verticalScale(100)
        : 100,
    borderRadius:
      Platform.OS == 'ios' && height > 1000 ? verticalScale(120) / 2 : 120 / 2,
    backgroundColor: '#B1B1B1',
  },
  thirdLikeContent: {
    marginLeft: moderateScale(-10),
    width: Platform.OS == 'ios' && height > 1000 ? verticalScale(100) : 100,
    height: Platform.OS == 'ios' && height > 1000 ? verticalScale(200) : 200,
    alignItems: 'center',
  },
  firstLikeContent: {
    width:
      Dimensions.get('window').width < 337
        ? 115
        : Platform.OS == 'ios' && height > 1000
        ? verticalScale(150)
        : 150,
    height: Platform.OS == 'ios' && height > 1000 ? verticalScale(254) : 254,
    alignItems: 'center',
    zIndex: 50,
  },
  secondLikeContent: {
    marginRight: moderateScale(-10),
    width: Platform.OS == 'ios' && height > 1000 ? verticalScale(100) : 100,
    height: Platform.OS == 'ios' && height > 1000 ? verticalScale(200) : 200,
    alignItems: 'center',
  },
  topLikesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS == 'ios' && height > 1000 ? verticalScale(300) : 300,
  },
  container: {
    marginTop: 30,
    marginBottom: verticalScale(100),
  },
});
