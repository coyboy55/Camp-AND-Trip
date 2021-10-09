import React, { useContext, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, SliderBase, Animated, Modal } from 'react-native';
import { Block, Text, theme, Button, Card } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Slider } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings'
import { Header, Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import sessionContext from '../components/session/SessionContext'
import API from '../API';
import { useFocusEffect } from '@react-navigation/core';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import PostLiked from '../components/postLiked';
import { lowerFirst } from 'lodash';
import { block } from 'react-native-reanimated';
import SessionContext from '../components/session/SessionContext';
import { Alert } from 'react-native';


const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function ProfileNavigator({ navigation, route, scene }) {
  const { firstName, lastName, email, phoneNumber, age, _id, photo, isTeam } = route.params.user
  const [uri, setUri] = useState(true);
  const { session: { user } } = useContext(SessionContext)
  let idUserLoggedIn = user._id
  const [postCount, setPostCount] = useState(0);
  const [postUser, setPostUser] = useState([])
  let getPostUser = async () => {
    API.get('/posts/user/' + _id).then(res => {
      res.data && (setPostCount(res.data.length), setPostUser(res.data))
    })
  }

  useFocusEffect(
    useCallback(() => {
      getPostUser();
    }, [])
  );

  const [value, setValue] = useState(0)
  const [rated, setRated] = useState(false)
  const [showRate, setShowRating] = useState(false)
  const [reach, setreach] = useState(1);
  const [avgRate, setAvgRate] = useState(0);
const [modalVisible,setModalVisible]=useState(false)

  let checkRated = () => {

    API.get(`/rates/check/${_id}/${idUserLoggedIn}`).then(res => { setreach(res.data.length); if (res.data.length >= 3) { setRated(true) } })
  }

  let setRating = () => {
    let body = {
      rate: value,
      recievedRate: _id,
      rateOffered: idUserLoggedIn
    }

    API.post('/rates', body)
    setShowRating(false)
    Alert.alert('thank u for ur rate')
    setreach(reach + 1)
    reach >= 2 && setRated(true)
    getRating();
    setModalVisible(false)
  }

  let getRating = () => {
    API.get('/rates/avgrate/' + _id).then(res => {setAvgRate(res.data[0].count);API.put('/users/'+route.params.user._id,{rate:res.data[0].count})})

  }

  useEffect(() => {
    getPostUser();
    checkRated();
    getRating();

  }, [])





  return (
    <Block flex style={styles.profile}>

      <Block flex>

        <ImageBackground
          source={{ uri: 'http://192.168.43.220:3000/uploads/users/' + photo }}
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
          rated ? (<Text>reached maximum numbr of rate</Text>) : (
            !showRate && <Button onPress={() => { setShowRating(true);setModalVisible(true) }} onlyIcon icon="star"
              iconFamily="antdesign"
              iconSize={30} color="warning"
              iconColor="#fff"
              style={{ width: 40, height: 40 }}>warning</Button>

          )
        }


        {
          showRate && (
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
              setShowRating(false)
            }}
          >
            <Block style={styless.centeredView}>
              <Block style={styless.modalView}>
              <Block center width={200}
                style={styles.shadow}
                borderless
                shadow
              >

                <Text size={30} center>
                  Give a Rate
    </Text>

                <AirbnbRating
                  count={5}
                  reviews={[1, 2, 3, 4, 5]}
                  defaultRating={3}
                  size={25}

                  onFinishRating={(t) => { setValue(t) }}


                />
                <Block center>
                  <Button color='blue' onPress={setRating}>
                    give Rate
</Button>

                </Block>


              </Block>
              </Block>
            
            </Block>
          </Modal>
    
//             <ScrollView>
//               <Card center width={200} flex
//                 style={styles.shadow}
//                 borderless
//                 shadow
//               >

//                 <Text size={30} center>
//                   Give a Rate
//     </Text>

//                 <AirbnbRating
//                   count={5}
//                   reviews={[1, 2, 3, 4, 5]}
//                   defaultRating={3}
//                   size={25}

//                   onFinishRating={(t) => { setValue(t) }}


//                 />
//                 <Block center>
//                   <Button color='blue' onPress={setRating}>
//                     give Rate
// </Button>

//                 </Block>


//               </Card>
//             </ScrollView>
          )
        }



          <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
            <Block middle>
              <Text bold size={12} style={{ marginBottom: 8 }}>{avgRate}</Text>
              <Text muted size={12}>rate</Text>
            </Block>
            <Block middle>
              <Text bold size={12} style={{ marginBottom: 8 }}>{postCount}</Text>
              <Text muted size={12}>Posts</Text>
            </Block>
         
          </Block>
          <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
            <Text size={16}>Posts</Text>
            <Text size={12} color={theme.COLORS.PRIMARY} onPress={() => navigation.navigate('Home')}>View All</Text>
          </Block>
          <ScrollView showsVerticalScrollIndicator={false}>
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
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

const styless = StyleSheet.create({
  components: {
      width: width
  },
  title: {
      paddingVertical: theme.SIZES.BASE,
      paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
      paddingTop: theme.SIZES.BASE * 1,
  },
  shadow: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.2,
      elevation: 2,
  },
  button: {
      marginBottom: theme.SIZES.BASE,
      width: width - (theme.SIZES.BASE * 2),
      color:'gray'
    
  },
  optionsText: {
      fontSize: theme.SIZES.BASE * 0.75,
      color: '#4A4A4A',
      fontWeight: "normal",
      fontStyle: "normal",
      letterSpacing: -0.29,
  },
  optionsButton: {
      width: 'auto',
      height: 34,
      paddingHorizontal: theme.SIZES.BASE,
      paddingVertical: 10,
  },
  imageBlock: {
      overflow: 'hidden',
      borderRadius: 4,
  },
  rows: {
      height: theme.SIZES.BASE * 2,
  },
  social: {
      width: theme.SIZES.BASE * 3.5,
      height: theme.SIZES.BASE * 3.5,
      borderRadius: theme.SIZES.BASE * 1.75,
      justifyContent: 'center',
  },
  category: {
      backgroundColor: theme.COLORS.WHITE,
      marginVertical: theme.SIZES.BASE / 2,
      borderWidth: 0,
  },
  categoryTitle: {
      height: '100%',
      paddingHorizontal: theme.SIZES.BASE,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  albumThumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: 'center',
      width: thumbMeasure,
      height: thumbMeasure
  },
  centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});
