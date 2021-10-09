import React, { useContext, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, Button, ScrollView, Image, ImageBackground, Platform, Modal, ToastAndroid, FlatList, Alert } from 'react-native';
import { Block, Card, Input, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

import { Header, Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import sessionContext from '../components/session/SessionContext'
import API from '../API';
import { useFocusEffect } from '@react-navigation/core';
import { TextInput, TouchableNativeFeedback } from 'react-native-gesture-handler';
import PostLiked from '../components/postLiked';
import { block } from 'react-native-reanimated';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { goBack } from '@react-navigation/compat/lib/typescript/src/helpers';
const { width, height } = Dimensions.get('screen');


const thumbMeasure = (width - 48 - 32) / 3;

// { navigation, product, horizontal, full, style, priceColor, imageStyle } 
export default function productDetails({ route, navigation, scene }) {
  /// let product=route.params;
  const [nbLikes, setNbLikes] = useState(0);

  const [liked, setLiked] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);


  //// reservation
  const { session: { user: { _id, firstName, lastName, phoneNumber } } } = useContext(sessionContext)
  let name = firstName + lastName
  const [fullName, setFullName] = useState(name);
  const [phonee, setPhone] = useState(phoneNumber);
  const [seats, setSeats] = useState('');
  const [acceptedPeople, setAcceptedPeople] = useState([]);


  const makeReservation = () => {
    let body = {
      name: fullName,
      phone: phonee,
      nbrOfSeat: seats,
      postName: route.params.product.title,
      postId: route.params.product._id,
      userId: _id,
      accepted: false
    }

    API.post('/reservations', body)
  }


  ///


  const showToastWithGravityAndOffset = (string) => {
    ToastAndroid.showWithGravityAndOffset(
      string,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  let giveLike = () => {
    setNbLikes(nbLikes + 1)
    setLiked(true)
    API.post('/likes', { userId: _id, postId: route.params.product._id })
    API.put('/posts/' + route.params.product._id, { nbLike: nbLikes })
  }
  let getnbLikes = () => {
    API.get('/likes/bypost/' + route.params.product._id).then(res => {
      setNbLikes(res.data.length);
      API.put('/posts/' + route.params.product._id, { nbLike: res.data.length })


    })
  }

    ;

  let checkLiked = () => {
    API.get(`/likes/cehck/${route.params.product._id}/${_id}`).then(res => {
      if (res.data.length > 0) {
        setLiked(true)
      } else {
        setLiked(false)
      }
    })
  }

  let deletePost=()=>{
    Alert.alert("Warning", "Are you sure to delete this post", [
      {
        text: "Cancel",

        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
           API.delete('/posts/'+route.params.product._id);
           navigation.navigate('Home');
           showToastWithGravityAndOffset("delete success");

        },
      },
    ]);
  }
  
  
  let unlike = () => {
    setNbLikes(nbLikes - 1)
    setLiked(false)
    API.delete('/likes/user/' + _id)
    API.put('/posts/' + route.params.product._id, { nbLike: nbLikes })

  }

  let getAcceptedPeople = () => {
    API.get('/reservations/acc/accepted/'+route.params.product._id).then(res => setAcceptedPeople(res.data))
  }

  useFocusEffect(
    React.useCallback(() => {
      getnbLikes()
      checkLiked()
      getAcceptedPeople()
      API.put('/posts/' + route.params.product._id, { nbLike: nbLikes })
    }, [route.params.product._id])
  );

  const renderItem = ({ item }) => (
    <Block key={item._id} card flex style={[styles.product, styles.shadow]}>
      <Block row>
        <Text muted>
          Name :
      </Text>
        <Text>
          {item.name}
        </Text>
      </Block>
      <Block row>
        <Text muted>
          places :
      </Text>
        <Text>
          {item.nbrOfSeat}
        </Text>
      </Block>

    </Block>
  );

  return (
    <Block flex style={styles.profile}>

      <Block flex>
        <Block

          style={styles.profileContainer}

        >

          <Block flex style={styles.profileDetails}>

            <Block style={styles.profileTexts}>
              <Block center style={styles.imgaeBlock}>



                <Text color="white" size={30}>{route.params.product.title}</Text>
                {
                  liked ? <Image source={{ uri: "http://192.168.43.220:3000/uploads/" + route.params.product.photo }}
                    style={styles.Image}
                  />
                    :
                    <TouchableNativeFeedback onPressOut={() => giveLike()}>
                      <Image source={{ uri: "http://192.168.43.220:3000/uploads/" + route.params.product.photo }}
                        style={styles.Image}
                      />
                    </TouchableNativeFeedback>
                }

              </Block>



            </Block>
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
          </Block>
        </Block>
        <Block row space="around" style={{ padding: theme.SIZES.BASE, }}>

          <Block middle>


            {
              liked ? <TouchableNativeFeedback onPress={() => unlike()}>
                <AntDesign name="like1" color='blue' size={20} />
              </TouchableNativeFeedback>
                :
                <AntDesign name="like2" size={20} />
            }

            <Text muted size={12}>{nbLikes}</Text>
          </Block>

          <Block middle>
            <Text bold size={12} style={{ marginBottom: 8 }}>Location</Text>
            <Text muted size={12}>{route.params.product.location}</Text>
          </Block>
          <Block middle>
            <Text bold size={12} style={{ marginBottom: 8 }}>{route.params.product.nbSeats}</Text>
            <Text muted size={12}>seats</Text>
          </Block>
        </Block>
      </Block>

      <Block flex style={styles.options}>

        <Block>
          <Text muted size={20}>
            Description :
         </Text>
          <Text>{route.params.product.description}</Text>
        </Block>
        <Block style={{ marginTop: 20 }}>
          <Text color='blue' size={20}>
            Available seats :
</Text>
          <Text>
            {route.params.product.nbSeatsEmpty}
          </Text>
        </Block>
        <Block row space="between" style={{ marginTop: 20 }}>
          {
            route.params.product.nbSeatsEmpty == 0 ? (
              <Block >

                <Text muted size={20}>
                  Register Now :
        </Text>
                <Text color='red'>no places left</Text>
              </Block>
            ) :
              (
                <Block >

                  <Text muted size={20}>
                    Register Now :
        </Text>
                  <Button color='blue' title='register' onPress={() => setModalVisible(true)}></Button>
                </Block>
              )
          }

          <Block>
            <Text muted size={20}>contact us {' '}
              <Ionicons name='call-outline' size={20} color='black' />
            </Text>
            <Text color='black'>70430287</Text>
          </Block>
        </Block>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            showToastWithGravityAndOffset('reservation canceled');
            setModalVisible(!modalVisible);
          }}
        >
          <Block style={styles.centeredView}>

            <Block style={styles.modalView}>
              <Text size={15}>make reservation for {route.params.product.name}</Text>

              <Text>full name</Text>
              <Input placeholder={name} placeholderTextColor="#4F8EC9" onChangeText={(t) => setFullName(t)} style={{ width: 150 }}></Input>
              <Text>phone </Text>

              <Input placeholder={phonee} placeholderTextColor="#4F8EC9" onChangeText={(t) => setPhone(t)} style={{ width: 150 }}></Input>
              <Text>seats</Text>

              <Input keyboardType='numeric' color='#4F8EC9'  onChangeText={(t) => setSeats(t)} style={{ width: 150 }}></Input>



              <Button onPress={() => { makeReservation(); setModalVisible(!modalVisible) }}
                title='make a reservation'
                color={materialTheme.COLORS.DEFAULT}
                textStyle={styles.optionsText}
                style={[styles.optionsButton, styles.shadow]}>


              </Button>

            </Block>

          </Block>
        </Modal>
        <Block style={{ marginTop: theme.SIZES.BASE}}>
          <Button title='    see accepted people' onPress={()=>setModalVisible1(true)} color='blue' size={20}>        
         </Button>
       
         <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            showToastWithGravityAndOffset("closed reservation");
            setModalVisible1(false);
          }}
        >
          <Block style={styles.centeredView1}>

          <Block style={styles.modalView}>
       

<FlatList
            data={acceptedPeople}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />

   
    
</Block>
          </Block>
        </Modal>
        


        </Block>
        
          {
            _id==route.params.product.author._id && <Block style={{ marginTop: theme.SIZES.BASE}} >
              <Button onPress={()=>deletePost()} color='red' title='delete this post' size={20}>        
         </Button>
        </Block>
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
  imgaeBlock: {
    shadowColor: 'black',
    shadowOffset: { width: 8, height: 8 },
    shadowRadius: 8,
    shadowOpacity: 0.8,
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: '#4A4A4A',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  Image: {

    height: height / 4,
    width: width * 0.95,
    marginTop: '10%',
    zIndex: 2,


  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },

  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  profileContainer: {
    width: width,
    height: height / 2,
    backgroundColor: 'gray'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: theme.SIZES.BASE * 15,
    
    alignItems: "center",
    marginTop: 22
  },
    centeredView: {
    flex: 1,
    justifyContent: "center",

    
    alignItems: "center",
    marginTop: 22
  },
  centeredView1: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: theme.SIZES.BASE * 15,
    
    alignItems: "center",
    marginTop: 22
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  modalView: {
    margin: 20,
    backgroundColor: "gray",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
 

    shadowOffset: {
      width: 0,
      height: 2
    }
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
    marginTop: -theme.SIZES.BASE * 4,
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
    height: '20%',
    position: 'absolute',
  },
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    padding: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 90,
    marginHorizontal: theme.SIZES.BASE
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  }
});
