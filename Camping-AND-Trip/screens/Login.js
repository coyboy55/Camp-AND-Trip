import SessionContext from '../components/session/SessionContext';
import { useContext, useState } from 'react';
import React from 'react'
import { ImageBackground, StyleSheet, StatusBar, Dimensions} from 'react-native';
import { Block, Button,Card, Text, theme,Input } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor:'white'
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 15,

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
});


export default function Login({navigation}){
  

const [username,setUsername]=useState('');
const [password,setPassword]=useState('');



      const {
        actions : {login}
        } = useContext(SessionContext);
        
        let submit=()=>{
login({username,password})
        }

    return ( 
        <Block  flex >
        {/* <StatusBar backgroundColor='green' barStyle="light-content" /> */}
        <Block flex center>
          <ImageBackground
          blurRadius={4}
            source={require('../assets/images/camp2.jpg')}
            style={{ height: height, width: width, zIndex: 1 }}
          />
        </Block>
        <Block   flex space="between" style={styles.padded}>
          <Card style={styles.Card}  flex space="around" style={{backgroundColor:'rgba(255,255,255,0.3)', zIndex: 2 }}>
            <Block>
              <Block style={styles.input}>
                <Input onChangeText={(t)=>setUsername(t)} style={{backgroundColor:'transparent'}} placeholderTextColor='white' placeholder="Username"/>
              </Block>
              <Block style={styles.input}>
                <Input onChangeText={(t)=>setPassword(t)} style={{backgroundColor:'transparent'}} placeholderTextColor='white' placeholder="Password" password viewPass/>
              </Block>
            </Block>
            <Block style={styles.buttonBox} center>
              <Button
                shadowless
                 style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={()=>{submit()}}>
                Sign In
              </Button>
              <Button
                shadowless
                 style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => navigation.navigate('Register')}>
                new account?
                
              </Button>
            </Block>
          </Card>
        </Block>
      </Block>
     )
}

 