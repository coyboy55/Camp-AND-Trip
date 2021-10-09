

import React, { useState,useContext } from 'react'

import { ImageBackground, StyleSheet, StatusBar,Alert,AsyncStorage, Dimensions,Picker } from 'react-native';
import { Block, Button,Card, Text, theme,Input } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import SessionContext from '../components/session/SessionContext'
import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import API from '../API';
export default function Register({route,navigation}){

const [username,setUsername]=useState('');
const [name,setName]=useState('');
const [color,setColor]=useState('white')
const [exist,setExist]=useState(false)
const [icon,setIcon]=useState('')
const [email,setEmail]=useState('');

const [password,setPassword]=useState('');
const [confpass,setConfPassword]=useState('');
const [selectedValue, setSelectedValue] = useState("user")

const {
  actions : {updateSession},
  session:{user}
  } = useContext(SessionContext);

let createUser=async()=>{
  let body={
    name:name,
    username:username,
    email:email,
    password:password,
    type:selectedValue === 'team' ? true : false
  }
  if(password===confpass){
    API.post('/auth/signup',body).then(async res=>{
   if(res.data==='exist'){
     setColor('red');
     setExist(true)
        }else{
          
      // await AsyncStorage.setItem('token',res.data.token)
      let token=res.data.token;
      // let user = { ...res.data, token };
      // updateSession({user:{token:token}});
      navigation.navigate('logiin')
        }
     
    })
  }else{console.log('not match');}
}

    const styles = StyleSheet.create({
        container: {
          backgroundColor: "white",
          borderColor:'white'
        },
        padded: {
          paddingHorizontal: theme.SIZES.BASE * 2,
          paddingVertical: theme.SIZES.BASE * 8,

          position: 'absolute',
         
          

        },
        button: {
          width: width - theme.SIZES.BASE * 10,
          height: theme.SIZES.BASE * 3,
          shadowRadius: 0,
          shadowOpacity: 0,
        },
        Card:{
          backgroundColor:'grey',
          opacity:3
        },
        input: {
       
          paddingHorizontal: theme.SIZES.BASE * 2,

        },
        input1: {
       
          position: 'relative',
          bottom: theme.SIZES.BASE*6,
        },
        buttonBox: {
          paddingHorizontal: theme.SIZES.BASE * 2,
       
         
        },
        TextB:{
          marginBottom: theme.SIZES.BASE * 2,
        },
        text: {
           position:'absolute',
           top:theme.SIZES.BASE*6,
           
          paddingHorizontal: theme.SIZES.BASE * 2,

    fontSize:30,
         color:'white'
           
          },
      });
      
    return ( 
        <Block  flex >
        <StatusBar backgroundColor='#191f67' barStyle="light-content" />
        <Block flex center>
            
          <ImageBackground
          blurRadius={4}
            source={require('../assets/images/camp2.jpg')}
            style={{ height: height, width: width, marginTop: '-5%', zIndex: 1 }}
          />
        </Block>
        <Text style={styles.text}>Welcome! Please fill all and give us ur trips and camping or share with us ur comments</Text>
        <Block   flex space="between" style={styles.padded}>
            
          <Card style={styles.Card}  flex space="around" style={{backgroundColor:'rgba(255,255,255,0.3)', zIndex: 2 }}>
            
            <Block>
            <Block style={styles.TextB}>
            <Text  bold size={32} color='white' center >Sign Up</Text>
            </Block>
            <Block style={styles.input}>
                <Input onChangeText={(t)=>setName(t)}
             
                icon="user"
  family="entypo"
  iconSize={14}
  iconColor="white" 
  style={{backgroundColor:'transparent'}} placeholderTextColor='white' placeholder="Name"/>
              </Block>
              <Block style={styles.input}>
                <Input onChangeText={(t)=>{setColor('white');setExist(false);setUsername(t);}}
                
                 icon="user"
                 family="antdesign"
                 iconSize={14}
                 iconColor="white" 
                style={{backgroundColor:'transparent',borderColor:color}} placeholderTextColor='white' placeholder="Username"/>
                {exist && <Text color='red'>userName wast allready exist</Text>}
                
              </Block>
              <Block style={styles.input}>
                <Input onChangeText={(t)=>setEmail(t)}
                 icon="email"
                 family="MaterialIcons"
                 iconSize={14}
                 iconColor="white" 
                style={{backgroundColor:'transparent'}} placeholderTextColor='white' placeholder="Email"  />
              </Block>
              <Block style={styles.input}>
                <Input onChangeText={(t)=>setPassword(t)}
                 icon="lock"
                 family="MaterialIcons"
                 iconSize={14}
                 iconColor="white" 
                style={{backgroundColor:'transparent'}} placeholderTextColor='white' placeholder="Password" password viewPass/>
              </Block>
              <Block style={styles.input}>
                <Input onChangeText={(t)=>setConfPassword(t)}
                 icon="lock"
                 family="MaterialIcons"
                 iconSize={14}
                 iconColor="white" 
                style={{backgroundColor:'transparent'}} placeholderTextColor='white' placeholder="Confirm password" password viewPass/>
              </Block>
                
              <Block middle row>
                <Text bold size={16} color='white'>User Type</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 ,color:'white'}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
         <Picker.Item label="Simple user" value="user" />
        <Picker.Item label="Team" value="team" />
      </Picker>
      </Block>
            </Block>
            <Block style={styles.buttonBox} center>
              <Button
                shadowless
                 style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => createUser()}>
                Sign Up
              </Button>
            </Block>
          </Card>
        </Block>
      </Block>
     )
}

 