import dynamicLinks from '@react-native-firebase/dynamic-links';

export const generateLink = async (param, value) => {
    const link = await dynamicLinks().buildShortLink({
      link: `https://napasociety.io/?${param?.postId}=${value?.postIdValue}&${param?.type}=${value?.type}`,
      domainUriPrefix: 'https://napasociety.page.link',
      android:{
        packageName:"com.napamobileapp",
        minimumVersion: "18"
      }
    });
    return link;
}


export const getAppLaunchLink = async () => {
    try {
      const {url} = await dynamicLinks().getInitialLink();
      console.log("UUUURRRRLLLL",url);
      return url;
    } catch {
     console.log("Error Occured");
    }
  };