import React, { useEffect, useState } from 'react';
import {  StyleSheet, Text,   TouchableOpacity,   View} from 'react-native';
import Layout from '../common/Layout';
import Header from '../common/Header';
import { BackIcon, Search } from '../assets/svg';
import {themeColors} from '../theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {moderateScale, verticalScale} from 'react-native-size-matters';
type NotificationDetailPageProps = {
    item: any;
  };
const NotificationDetailPage : React.FC<NotificationDetailPageProps> = () =>{
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [time, setTime] = useState('');
    const {goBack, navigate} = useNavigation<any>();
    const route = useRoute<any>();
    let item = route.params.item;
    useEffect(() => {

        if (item['title'] == null)
                setTitle('No Title')
        else 
            setTitle(item['title'])
        
        if (item['content'] == null)
            setBody('No Content')
        else 
            setBody(item['content'])

        if (item['time'] == null)
            setTime('')
        else 
            setTime(item['time'])
                
        },[]);

    return(
        <Layout>
            
            <Header
                leftChildren={
                <TouchableOpacity onPress={() => goBack()}>
                    <BackIcon color={themeColors.garyColor} />
                </TouchableOpacity>
                }
                  
                title={false}
                centerTitle={'Detail'}
            />
            <View>
                <Text style = {styles.titleText}> {title}</Text>        
                <Text style = {styles.contentText}> {body}</Text>        
                <Text style = {styles.sentText}> {time}</Text>        
            </View>
        </Layout>
    );
}

export default NotificationDetailPage;


const styles = StyleSheet.create({
    titleText: {
        marginTop: moderateScale(15),
        color: themeColors.primaryColor,
        fontFamily: Fontfamily.Neuropolitical,
        fontSize: size.xlg,
        fontWeight: '400'
    },
    contentText: {
        marginTop: moderateScale(15),
        color: themeColors.primaryColor,
        fontFamily: Fontfamily.Avenier,
        fontSize: size.md,
        fontWeight: '500',
    },
    sentText: {
        marginTop: moderateScale(5),
        marginRight: moderateScale(5),
        textAlign: 'right',
        color: themeColors.garyColor,
        fontFamily: Fontfamily.Avenier,
        fontSize: size.md,
        fontWeight: '500',
    },
  });
  