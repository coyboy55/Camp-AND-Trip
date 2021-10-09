import { AntDesign, Entypo } from '@expo/vector-icons';
import { Block, Button, Card,Text,theme } from 'galio-framework';
import React, { useCallback, useEffect, useState } from 'react';
import {StyleSheet,Dimensions} from 'react-native'
import { useFocusEffect } from '@react-navigation/core';
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
const { width } = Dimensions.get('screen');
import API from '../API';
const ReservationControle = () => {
    const [reservations,setReservation]=useState([]);

    const getReservation=()=>{
        API.get('/reservations/acc/notaccepted').then(res=>setReservation(res.data))
    }
const rejected=(id)=> {
API.delete('/reservations/'+id)
setReservation(()=>reservations.filter(item=>item._id!=id))
}

const accepted=(id,idp,nbseat)=>{
API.put('/reservations/'+id,{accepted:true})
setReservation(()=>reservations.filter(item=>item._id!=id))
API.put('/posts/updateseats/a/'+idp+'/'+nbseat)
}
useFocusEffect(
    useCallback(() => {
        getReservation()
    }, [])
  );


    let listNoaccepted=reservations.map(item=>(
        <Block key={item._id} card flex style={[styles.product, styles.shadow]}>
            <Block row>
                <Text>
                      name of user :
                </Text>
            <Text muted>
              {item.name}
            </Text>
            </Block>
           
            <Block row>
                <Text>
                      name of post :
                </Text>
            <Text muted>
              {item.postName}
            </Text>
            </Block>
            <Block row>
                <Text>
                      seats reserved :
                </Text>
            <Text muted>
              {item.nbrOfSeat}
            </Text>
            </Block>
            <Block row>
                <Text>
                     phone :
                </Text>
            <Text muted>
              {item.phone}
            </Text>
            </Block>
<Block  row space='evenly' >
<TouchableNativeFeedback onPress={()=>accepted(item._id,item.postId,item.nbrOfSeat)}  style={{width:60,height:50}} width={30}>
<AntDesign style={{textAlign:'center',marginTop:'auto',marginBottom:'auto'}} name="checksquare" size={24} color="blue" />
</TouchableNativeFeedback>

<TouchableNativeFeedback onPress={()=>rejected(item._id)} style={{width:60,height:50}}>
<Entypo style={{textAlign:'center',marginTop:'auto',marginBottom:'auto'}} name="block" size={24} color="red" />
</TouchableNativeFeedback>
</Block>
        </Block>
    ))
    return ( <ScrollView>
{listNoaccepted}
    </ScrollView> );
}
 
export default ReservationControle;

const styles = StyleSheet.create({
    home: {
      width: width,    
    },
  
    search: {
      height: 48,
      width: width - 32,
      marginHorizontal: 16,
      borderWidth: 1,
      borderRadius: 3,
    },
    header: {
      backgroundColor: theme.COLORS.WHITE,
      shadowColor: theme.COLORS.BLACK,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 8,
      shadowOpacity: 0.2,
      elevation: 4,
      zIndex: 2,
    },
    tabs: {
      marginBottom: 24,
      marginTop: 10,
      elevation: 4,
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
    divider: {
      borderRightWidth: 0.3,
      borderRightColor: theme.COLORS.MUTED,
    },
    products: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE/20
    },
    product: {
      backgroundColor: theme.COLORS.WHITE,
      marginVertical: theme.SIZES.BASE/2,
      padding:theme.SIZES.BASE,
      borderWidth: 0,
      minHeight: 114,
     marginHorizontal:theme.SIZES.BASE
    },
    productTitle: {
      flex: 1,
      flexWrap: 'wrap',
      paddingBottom: 6,
    },
    productDescription: {
      padding: theme.SIZES.BASE / 2,
    },
    imageContainer: {
      elevation: 1,
    },
    image: {
      borderRadius: 3,
      marginHorizontal: theme.SIZES.BASE / 2,
      marginTop: -16,
    },
    horizontalImage: {
      height: 122,
      width: 'auto',
    },
    fullImage: {
      height: 215,
      width: width - theme.SIZES.BASE * 3,
    },
    shadow: {
      shadowColor: theme.COLORS.BLACK,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.1,
      elevation: 2,
    },
    
  });