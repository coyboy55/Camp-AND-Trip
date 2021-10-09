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
import PostLiked from '../components/postLiked';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function Profile({ navigation,route,scene }) {
  const { session: { user: { firstName, lastName, email, phoneNumber, age, _id, photo,isTeam } }
,
actions:{setRate}
} = useContext(sessionContext)
  const [uri, setUri] = useState(true);
 
  const [postCount, setPostCount] = useState(0);
  const [postUser, setPostUser] = useState([])
const [avgRate,setAvgRate]=useState(0);

  let getPostUser = async () => {
    API.get('/posts/user/' + _id).then(res => {
      res.data && (setPostCount(res.data.length), setPostUser(res.data))
    })
  }

  let getRating=()=>{
    API.get('/rates/avgrate/'+_id).then(res=>{setAvgRate(res.data[0].count)})
  }


  useFocusEffect(
    useCallback(() => {
      getPostUser();
      getRating();
    }, [])
  );

  useEffect(() => {
    getPostUser();
  }, [])

  return (
    <Block flex style={styles.profile}>
              
      <Block flex>
        
        <ImageBackground
          source={{ uri: 'http://192.168.43.220:3000/uploads/users/'+photo }}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}
          >
            
          <Block flex style={styles.profileDetails}>
            
            <Block style={styles.profileTexts}>

              <Text color="white" size={28} style={{ paddingBottom: 8 }}>{firstName} {lastName}</Text>
              <Block row space="between">

                <Block row>

                  {/* <Block  style={styles.pro}>
                      <Text size={16} color="white">{age} years</Text>
                    </Block> */}
                  <Text color="white" size={16} muted style={styles.seller}>{age} years</Text>
                  <Text size={16} color={materialTheme.COLORS.WARNING}>
                    {phoneNumber}  <Icon name="phone" family="AntDesign" size={14} />
                  </Text>
                </Block>
                <Block>
                  <Text color={theme.COLORS.MUTED} size={16}>
                    {email}
                  </Text>
                </Block>
              </Block>
            </Block>
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
          </Block>
        </ImageBackground>
      </Block>
      <Block flex style={styles.options}>
        {
          isTeam ? (
            <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 8 }}>{avgRate}</Text>
                <Text muted size={12}>rate</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 8 }}>{postCount}</Text>
                <Text muted size={12}>Posts</Text>
              </Block>
              {/* <Block middle>
                <Text bold size={12} style={{ marginBottom: 8 }}>2</Text>
                <Text muted size={12}>Messages</Text>
              </Block> */}
            </Block>
            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={16}>Posts</Text>
              <Text size={12} color={theme.COLORS.PRIMARY} onPress={() => navigation.navigate('Home')}>View All</Text>
            </Block>
            <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
              <Block row style={{ flexWrap: 'wrap' }} >
                {postUser.map((item) => (
                  <TouchableNativeFeedback onPress={() => navigation.navigate('productDetails', { product: item })} key={item._id} >
  
                    <Image
                      source={{ uri: 'http://192.168.43.220:3000/uploads/' + item.photo }}
  
                      resizeMode="cover"
                      style={styles.thumb}
  
                    />
                  </TouchableNativeFeedback>
  
                ))}
              </Block>
            </Block>
          </ScrollView>

          ):(
            <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={16}>Posts Liked</Text>
            
            </Block>
           <PostLiked navigation={navigation}/>
          </ScrollView>


          )
        }
       
      </Block>
    </Block>
  );
}


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
