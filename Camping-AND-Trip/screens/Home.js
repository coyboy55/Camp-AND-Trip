import React,{useCallback, useContext, useEffect} from 'react';
import { StyleSheet, Dimensions, ScrollView, AsyncStorage,Picker } from 'react-native';
import { Button, Block, Text, Input, theme, Card } from 'galio-framework';

import { Icon, Product } from '../components/';
import Header from '../components/Header'
import {MaterialIcons,Fontisto, Ionicons} from '@expo/vector-icons'

const { width } = Dimensions.get('screen');
import products from '../constants/products';
import { useState } from 'react';
import Camp from '../components/Camp';
import Trip from '../components/Trip';
import SessionContext from '../components/session/SessionContext';
import API from '../API';
import Loading from '../constants/Loading';
import { useFocusEffect } from '@react-navigation/core';



export default function Home (props) {

const [tab,setTab]=useState(0);
const [products,setProduct]=useState([]);
const [location,setLocation]=useState('all')


const [loading,setLoading]=useState(true);
const [show,setShow]=useState(false);


const [TripList,setTripList]=useState([]);
const [CampList,setCampList]=useState([]);

useFocusEffect (
  useCallback(() => {
    getProducts();
  }, [])
);



  let getProducts=async()=>{
  API.get('/posts').then(res=>{if (res.data.length>0){setProduct(res.data);setLoading(false)}})
  }


  let getProductsByLocation=async()=>{
    API.get('/posts/location/'+location).then(res=>{if (res.data.length>0){setProduct(res.data);setLoading(false)}else{setLoading(false);setProduct([]);}})
  setShow(false) 
  }
// useEffect(()=>{
//   location==='all' ? (getProducts()) :   (getProductsByLocation())
// // getProducts()
 
// },[location])

useFocusEffect(
  React.useCallback(() => {
    location==='all' ? (getProducts()) :   (getProductsByLocation())
  }, [location])
);

 let  renderSearch = () => {

    const { navigation } = props;
    const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="What are you looking for?"

      />
    )
  }

 let renderTabs = () => {
    const { navigation } = props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]}  onPress={() => setTab(0)}>
          <Block  row middle>
            
          <MaterialIcons name="terrain" family="feather" style={{ paddingRight: 8 }} size={24} color={tab===0 ? 'black' : 'gray'} />

            <Text color={tab===0 ? 'black' : 'gray'} size={16} style={styles.tabTitle}>CAMPING</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => setTab(1)}>
          <Block row middle>
          <Fontisto name="bus" size={15} color={tab===1 ? 'black' : 'gray'} family="GalioExtra" style={{ paddingRight: 8 }}/>

            <Text color={tab===1 ? 'black' : 'gray'} size={16} style={styles.tabTitle}>TRIP</Text>
          </Block>
        </Button>
      </Block>
    )
  }
// let TripListt=[]
//       if(location==='all'){TripListt= products.filter(item=>item.type==='trip') }else{
//         TripListt= products.filter(item=>item.type=='trip').filter(item=>item.location===location)
//       }
//     let CampListt=[]
//     if(location==='all'){CampListt= products.filter(item=>item.type==='camp') }else{
//       CampListt= products.filter(item=>item.type=='camp').filter(item=>item.location===location)
//     }
let TripListt=products.filter(item=>item.type==='trip');
let CampListt= products.filter(item=>item.type==='camp');
// console.log(products[0].author.username)

    return (
      <Block flex center style={styles.home}>
      

    
      {
        show ?  <Block row middle>
        <Text bold size={16} style={styles.title}>filter by location</Text>
<Picker
selectedValue={location}
style={{ height: 50, width: 150 }}
onValueChange={(itemValue, itemIndex) =>{setLoading(true); setLocation(itemValue)}}
>
<Picker.Item label="All" value="all" />
<Picker.Item label="Tripoli" value="tripoli" />
    <Picker.Item label="Akkar" value="akkar" />
<Picker.Item label="south" value="south" />

<Picker.Item label="mount of lebanon" value="mount" />

<Picker.Item label="bkaa" value="bkaa" />
<Picker.Item label="beirouth" value="beirouth" />
</Picker>
</Block> :
  <Ionicons  name="filter" onPress={()=>setShow(true)} size={24} color="black" />  
      }
  
      { loading &&
     
     <Loading />
   }
        {tab===0 ?
         <Trip  loading={loading} location={location} getProducts={getProducts} products={CampListt} navigation={props.navigation}/> 
        :
        
        <Trip loading={loading}  location={location} getProducts={getProducts}  products={TripListt} navigation={props.navigation}/>}
      {/* <Block style={{flex: 1, flexDirection: 'row'}} center> */}
       {renderTabs()}
      </Block>
      
      // </Block>
    );
  
}

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
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
