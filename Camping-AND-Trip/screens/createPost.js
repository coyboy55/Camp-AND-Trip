import React, { useCallback, useContext, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions,
    Modal,
    View,
    Pressable,
    Alert,
    Picker
} from 'react-native';
import sessionContext from '../components/session/SessionContext'
var moment = require('moment'); // require
import * as ImagePicker from 'expo-image-picker';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { materialTheme, products, Images } from '../constants/';
import { Select, Icon, Header, Product, Switch } from '../components/';
import { Entypo } from '@expo/vector-icons'; 
import API from '../API';
import { useFocusEffect } from '@react-navigation/core';

// import RNFS from 'react-native-fs';


// const str = RNFS.MainBundlePath;
const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const CreatePost = ({navigation}) => {
  const {session:{user:{_id}}}=useContext(sessionContext)
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [location1,setLocation]=useState('akkar')
    const [seats,setSeats]=useState('')



    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState("camp")
    const [image,setImage] = useState({});
    let date=Date.now(); 
    async function pickFromCamera() {

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.cancelled) {
            setImage(result);
          }
        };

        let  pickFromGallery=async()=> {

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });
          
          
              if (!result.cancelled) {
                setImage(result);
              }
            };
     
            let addPost=async()=>{
//              let body={
//                title:title,
//                description:description,
//                fileSrc:image

//              }
// API.post('/posts',body).then(res=>console.log(res.data))
// console.log(body);



let localUri = image.uri;
let filename = localUri.split('/').pop();
let match = /\.(\w+)$/.exec(filename);
let type = match ? `image/${match[1]}` : `image`;


                let body=null;
                 body=new FormData();
                body.append("title",title);
                body.append("description",description);
                body.append("location",location1);

                body.append("nbSeats",seats);
                body.append("type",selectedValue);
                body.append("date",date);
                body.append("author",_id);
                body.append('nbSeatsEmpty',seats)
                body.append('fileSrc', { uri: localUri, name: filename, type });
               await fetch('http://192.168.43.220:3000/posts',{method:'post',body,headers:{
              
                    'Content-Type': 'multipart/form-data'
               
                }})
                navigation.navigate('Home')
                }
                

    let renderInputsName = () => {
   
        return (
            <Block flex style={styles.group}>
                <Text bold size={16} style={styles.title}>Name</Text>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                    onChangeText={( title)=>setTitle(title)}
                        right
                        color='black'
                        placeholder="Trip OR Camping Name"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    // iconContent={<Icon size={16} color={theme.COLORS.ICON} name="camera-18" family="GalioExtra" />}
                    />
                </Block>
                <Text bold size={16} style={styles.title}>Description</Text>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                    onChangeText={(desc)=>setDescription(desc)}
                        right
                        color='black'
                        placeholder="talk theme a little bit about ur trip"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    // iconContent={<Icon sizeTrip OR Camping Name={16} color={theme.COLORS.ICON} name="camera-18" family="GalioExtra" />}
                    />
                </Block>
                
                
                <Text bold size={16} style={styles.title}>seats</Text>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                        keyboardType='numeric'
onChangeText={(t)=>setSeats(t)}
                        right
                        color='black'
                        placeholder="how many seats"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    // iconContent={<Icon sizeTrip OR Camping Name={16} color={theme.COLORS.ICON} name="camera-18" family="GalioExtra" />}
                    />
                </Block>
                <Text  bold size={16} style={styles.title}>Location</Text>
            

                <Block >
               
      <Picker
        selectedValue={location1}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
      >
        <Picker.Item label="Tripoli" value="tripoli" />
        <Picker.Item label="Akkar" value="akkar" />
        <Picker.Item label="south" value="south" />

        <Picker.Item label="mount of lebanon" value="mount" />

        <Picker.Item label="bkaa" value="bkaa" />
        <Picker.Item label="beirouth" value="beirouth" />


      </Picker>
      </Block>
    
<Block style={{flex: 1, flexDirection: 'row'}} center>
                <Block>
                <Text bold size={16} style={styles.title}>Type</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Camping" value="camp" />
        <Picker.Item label="Trip" value="trip" />
      </Picker>
      </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                <Text bold size={16} style={styles.title}>Photo</Text>
   
                <Button
            
            style={[styles.button, styles.buttonClose]} 
          onPress={()=>setModalVisible(true)}
     >
         <Block style={{padding:20}} row middle>
         <Text  size={20} style={{color:'white'}}>Image</Text> 
         <Entypo name="image-inverted" size={20} color="white" />
            
         </Block>
      
     </Button>
              
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Block style={styles.centeredView}>
          <Block style={styles.modalView}>
            <Button style={[styles.button, styles.buttonClose]} onPress={pickFromCamera}>
                pick from camera
            </Button>
            <Button style={[styles.button, styles.buttonClose]} onPress={pickFromGallery}>
                pick from gallery
            </Button>
            <Button
            
                   color={materialTheme.COLORS.DEFAULT}
                   textStyle={styles.optionsText}
                   style={[styles.optionsButton, styles.shadow]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
         
            </Button>
          
          </Block>
        
        </Block>
      </Modal>

      </Block>

      </Block>
                <Block flex center>
              <Button
      onPress={()=>addPost()}
                center
                shadowless
                color={materialTheme.COLORS.DEFAULT}
                textStyle={styles.optionsText}
                style={[styles.optionsButton, styles.shadow]}>
                SAVE
              </Button>
              {image.uri ?  <Image
        style={{ width: 150, height: 150 }}
            source={{uri: image.uri}}
            /> : null}
             
            </Block>
            </Block>
        )
    }
   
    return (
        <Block flex center>
            <ScrollView
                style={styles.components}
                showsVerticalScrollIndicator={false}>

                {renderInputsName()}
                {/* {React.createElement(View, null, React.createElement(Text, null, str))} */}

            </ScrollView>
        </Block>
    );
}



export default CreatePost;
const styles = StyleSheet.create({
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
