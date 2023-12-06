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
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import {selectgetMostViewedPostsDataList} from '../store/selectors/getMostViewedPosts';
import DiscussedPostscard from './DiscussedPostsscard';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {CrowncarveIcon} from '../assets/svg/CrowncarveIcon';
import {size} from '../theme/fontstyle';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {height, truncatedText} from '../utils/helper';

interface viewedPostsValue {
  thumbnail?: string;
  userName?: string;
  comments?: number;
  postId?: string;
}
type DiscussedPostsProps = {
  setLeaderRefrash: any;
};
const DiscussedPosts: React.FC<DiscussedPostsProps> = ({setLeaderRefrash}) => {
  const getMostViewedPosts = useSelector(selectgetMostViewedPostsDataList).data;
  const [top3discussedPost, setTop3discussedPost] = useState<
    viewedPostsValue[]
  >([]);
  const [topdiscussedPost, setTopdiscussedPost] = useState<viewedPostsValue[]>(
    [],
  );
  
  const {navigate} = useNavigation<any>();
  useEffect(() => {
    if (getMostViewedPosts?.discussedPosts?.length <= 2) {
      let discussedPostsLengthLessthantwo =
        getMostViewedPosts?.discussedPosts?.slice(
          0,
          getMostViewedPosts?.discussedPosts?.length,
        );
      setTop3discussedPost(discussedPostsLengthLessthantwo);
    }
    if (getMostViewedPosts?.discussedPosts?.length >= 2) {
      let discussedPostsLengthequaltwo =
        getMostViewedPosts?.discussedPosts?.slice(0, 3);
      setTop3discussedPost(discussedPostsLengthequaltwo);
    }
    if (getMostViewedPosts?.discussedPosts?.length > 2) {
      let discussedPostsLengthGreaterthantwo =
        getMostViewedPosts?.discussedPosts?.slice(
          3,
          getMostViewedPosts?.discussedPosts?.length,
        );
      setTopdiscussedPost(discussedPostsLengthGreaterthantwo);
    }
  }, []);

  return (
    <>
      {getMostViewedPosts?.discussedPosts?.length ? (
        <View style={styles.container}>
          <Pressable style={styles.topLikesContent}>
            {top3discussedPost?.length >= 2 && (
              <TouchableOpacity
                onPress={() =>
                  navigate(SCREENS.POSTDETAILS, {
                    post: top3discussedPost[1]?.postId,
                  })
                }
                style={styles.secondLikeContent}>
                <Text style={styles.secondLike}>2</Text>
                <Image
                  style={styles.secondLikeUserImage}
                  source={{
                    uri:
                      top3discussedPost[1]?.thumbnail ||
                      'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                  }}
                />
                <Text style={styles.secondLikeUserName}>
                  {truncatedText(top3discussedPost[1]?.userName as string)}
                </Text>
                <Text style={styles.totalLikes}>
                  {top3discussedPost[1]?.comments}
                </Text>
                <Text style={styles.likesLabel}>Comments</Text>
              </TouchableOpacity>
            )}
            {top3discussedPost?.length >= 1 && (
              <TouchableOpacity
                onPress={() =>
                  navigate(SCREENS.POSTDETAILS, {
                    post: top3discussedPost[0]?.postId,
                  })
                }
                style={styles.firstLikeContent}>
                <CrowncarveIcon style={styles.iconStyle} />
                <Image
                  style={styles.firstLikeUserImage}
                  source={{
                    uri:
                      top3discussedPost[0]?.thumbnail ||
                      'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                  }}
                />
                <Text style={styles.firstLikeUserName}>
                  {truncatedText(top3discussedPost[0]?.userName as string)}
                </Text>
                <Text style={styles.totalLikes}>
                  {top3discussedPost[0]?.comments}
                </Text>
                <Text style={styles.likesLabel}>Comments</Text>
              </TouchableOpacity>
            )}
            {top3discussedPost?.length >= 3 && (
              <TouchableOpacity
                onPress={() =>
                  navigate(SCREENS.POSTDETAILS, {
                    post: top3discussedPost[0]?.postId,
                  })
                }
                style={styles.thirdLikeContent}>
                <Text style={styles.thirdLike}>3</Text>
                <Image
                  style={styles.thirsLikeUserImage}
                  source={{
                    uri:
                      top3discussedPost[2]?.thumbnail ||
                      'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                  }}
                />
                <Text style={styles.thirdLikeUserName}>
                  {truncatedText(top3discussedPost[2]?.userName as string)}
                </Text>
                <Text style={styles.totalLikes}>
                  {top3discussedPost[2]?.comments}
                </Text>
                <Text style={styles.likesLabel}>Comments</Text>
              </TouchableOpacity>
            )}
          </Pressable>
          <ScrollView>
            <Pressable
              style={{
                marginBottom: 300 * 2,
              }}>
              <FlatList
                data={topdiscussedPost}
                contentContainerStyle={{marginTop: 19}}
                renderItem={({item, index}) => (
                  <DiscussedPostscard item={item} index={index} />
                )}
              />
            </Pressable>
          </ScrollView>
        </View>
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

export default DiscussedPosts;

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
