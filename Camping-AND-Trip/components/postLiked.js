import React, { useContext, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

import { Header, Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import sessionContext from '../components/session/SessionContext'
import API from '../API';
import { useFocusEffect } from '@react-navigation/core';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
import {get} from 'lodash'
const PostLiked = ({navigation}) => {
const {session:{user:{_id}}}=useContext(sessionContext);
const [postLiker,setPostLiker]=useState([])

let getPostLiker=()=>{
    API.get('/likes/postbylike/'+_id).then(res=>setPostLiker(res.data))
}

useFocusEffect (
  useCallback(() => {
    getPostLiker();
  }, [])
);

console.log(postLiker);
    return (  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
        <Block row style={{ flexWrap: 'wrap' }} >
          {postLiker.map((item) => (
            <TouchableNativeFeedback onPress={() => navigation.navigate('productDetails', { product: item.postId })} key={item._id} >

              <Image
                source={{ uri: 'http://192.168.43.220:3000/uploads/' + get(item.postId,'photo') }}

                resizeMode="cover"
                style={styles.thumb}

              />
            </TouchableNativeFeedback>

          ))}
        </Block>
      </Block> );
}
 
export default PostLiked;

const styles = StyleSheet.create({
    profile: {
      marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
      marginBottom: -HeaderHeight * 2,
    },
    profileImage: {
      width: width * 1.1,
      height: 'auto',
    },
    profileContainer: {
      width: width,
      height: height / 2,
    },
    profileDetails: {
      paddingTop: theme.SIZES.BASE * 4,
      justifyContent: 'flex-end',
      position: 'relative',
    },
    profileTexts: {
      paddingHorizontal: theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE * 2,
      zIndex: 2
    },
    pro: {
      backgroundColor: materialTheme.COLORS.LABEL,
      paddingHorizontal: 6,
      marginRight: theme.SIZES.BASE / 2,
      borderRadius: 4,
      height: 19,
      width: 38,
    },
    seller: {
      marginRight: theme.SIZES.BASE / 2,
    },
    options: {
      position: 'relative',
      padding: theme.SIZES.BASE,
      marginHorizontal: theme.SIZES.BASE,
      marginTop: -theme.SIZES.BASE * 7,
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
      backgroundColor: theme.COLORS.WHITE,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 8,
      shadowOpacity: 0.2,
      zIndex: 2,
    },
    thumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: 'center',
      width: thumbMeasure,
      height: thumbMeasure
    },
    gradient: {
      zIndex: 1,
      left: 0,
      right: 0,
      bottom: 0,
      height: '30%',
      position: 'absolute',
    },
  });
  