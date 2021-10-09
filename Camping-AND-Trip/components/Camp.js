import { Block,Text,theme } from "galio-framework";
import React, { useEffect, useState } from 'react'
const { width } = Dimensions.get('screen');

import products from '../constants/products';
import { Icon, Product } from '../components/';
import { StyleSheet, Dimensions,ScrollView,TouchableWithoutFeedback,Image, RefreshControl,Picker } from 'react-native';
import API from "../API";
import AppLoading from 'expo-app-loading';
import { block } from "react-native-reanimated";
import Loading from '../constants/Loading';



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
    paddingVertical: theme.SIZES.BASE/20,
  },
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
   
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

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Camp = (props) => {

  const {  navigation,product, horizontal, full, style, priceColor, imageStyle } = props;
  const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
  // const [state,setState]=useState([])
  // const [loading,setLoading]=useState(true)
  const [refreshing, setRefreshing] = React.useState(false);
const [campList,setCampList]=React.useState([])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.getProducts();
    wait(2000).then(() => setRefreshing(false));
  }, []);


    useEffect(()=>{

      setCampList(props.products)
    },[])


  let url='http://192.168.43.220:3000/uploads/'
  let listPost=campList.map(item=>(
    <Block key={item._id} card flex style={[styles.product, styles.shadow, style]}>
    <TouchableWithoutFeedback onPress={() => navigation.navigate('productDetails', { product: item })}>
      <Block flex style={[styles.imageContainer, styles.shadow]}>
        <Image source={{ uri: url+item.photo }} style={{width:100,height:100}} />
      </Block>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={() => navigation.navigate('productDetails', { product: item })}>
      <Block flex space="between" style={styles.productDescription}>
        <Text size={14} style={styles.productTitle}>{item.title}</Text>
        <Text size={12} muted={!priceColor} color={priceColor}>{item.nbSeats}</Text>
      </Block>
    </TouchableWithoutFeedback>
  </Block>
  ))

    return (
  
  
      <ScrollView  
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.products}>
      
       
        
          {
          
          listPost
          }
      </ScrollView>
 
  );
}
 
export default Camp;