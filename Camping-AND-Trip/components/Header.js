import React, { useContext, useState } from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions,TextInput, Modal,Alert,Image } from 'react-native';
import { Button, Block, NavBar, Text, theme, Input } from 'galio-framework';
import {Ionicons,MaterialIcons,Fontisto} from '@expo/vector-icons'
import Icon from './Icon';
import materialTheme from '../constants/Theme';
import * as ImagePicker from 'expo-image-picker';
import SessionContext from './session/SessionContext';
import API from '../API';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="chat-33"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="basket-simple"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      size={16}
      family="entypo"
      name="magnifying-glass"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

function Header(props){
  
const [modalVisible,setModalVisible]=useState(false)
const [modalVisible1,setModalVisible1]=useState(false)

const [image,setImage]=useState({})
const {session:{user:{_id}},actions:{setReload,updateSession},reload}=useContext(SessionContext)
  let  pickFromGallery=async(props)=> {

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
      
        quality: 1,
      });
  
  
      if (!result.cancelled) {
        setImage(result);
        setModalVisible(false)
        setModalVisible1(true)
     
      }
    };

  let handleLeftPress = () => {
    const { back, navigation } = props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  let renderRight = () => {
    const { white, title, navigation } = props;

    if (title === 'Title') {
      return [
        <ChatButton key='chat-title' navigation={navigation} isWhite={white} />,
        <BasketButton key='basket-title' navigation={navigation} isWhite={white} />
      ]
    }

    switch (title) {
      case 'Home':
        return ([
     
        ]);
      case 'Deals':
        return ([
       
        ]);
      case 'Categories':
        return ([
        
        ]);
      case 'Category':
        return ([
         
        ]);
      case 'Profile':
        return (<Ionicons name="ellipsis-vertical" onPress={()=>setModalVisible(true)} size={24} color="white" />);
      case 'Product':
        return ([
     
        ]);
      case 'Search':
        return ([
  
        ]);
      case 'Settings':
        return ([


        ]);
      default:
        break;
    }
  }


let editProfilePhoto=async()=>{

let localUri = image.uri;
let filename = localUri.split('/').pop();
let match = /\.(\w+)$/.exec(filename);
let type = match ? `image/${match[1]}` : `image`;
let body=null;
body=new FormData();
body.append('fileSrc', { uri: localUri, name: filename, type });
await fetch('http://192.168.43.220:3000/users/'+_id,{method:'patch',body,headers:{

    'Content-Type': 'multipart/form-data'

}})
setReload(reload+1)
setModalVisible1(false)
}
let deletePP=async ()=>{
 API.post('/users/'+_id).then(res=>{setReload(reload+1),setModalVisible(false)})

  
  //updateSession({user:{photo:null}})
}


  let renderSearch = () => {
    const { navigation } = props;
    return (
      <Input
        right
        color="black"
  placeholderTextColor='gray'
        style={styles.search}
        placeholder="What are you looking for?"
        //onChangeText={(search)=>{this.setState({search})}}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" family="entypo" />}
      />
    )
  }


  let renderTabs = () => {
    const { navigation, tabTitleLeft, tabTitleRight } = props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Camp')}>
          <Block row middle>
           
            <MaterialIcons name="terrain" family="feather" style={{ paddingRight: 8 }} size={24} color="black" />
            <Text size={16} style={styles.tabTitle}>{tabTitleLeft || 'CAMPING'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Trip')}>
          <Block row middle>
          <Fontisto name="bus" size={15} color="black" family="GalioExtra" style={{ paddingRight: 8 }}/>
                       <Text size={16} style={styles.tabTitle}>{tabTitleRight || 'TRIP'}</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  let renderHeader = () => {
    const { search, tabs,searchRes} = props;
    if (search || tabs || searchRes) {
      return (
        <Block center>
          {search ? renderSearch() : null}
          {tabs ? renderTabs() : null}
         
        </Block>
      )
    }
    return null;
  }


 
    const { back, title, white, transparent, navigation } = props;
    // const { routeName } = navigation.state;
    const noShadow = ["Search", "Categories", "Deals", "Pro", "Profile"].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title={title}
          style={styles.navbar}
          transparent={transparent}
          right={renderRight()}
          rightStyle={{ alignItems: 'center' }}
          leftStyle={{ flex: 0.3, paddingTop: 2  }}
          leftIconName={(back ? 'chevron-left' : 'navicon')}
          leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
          titleStyle={[
            styles.title,
            {color: theme.COLORS[white ? 'WHITE' : 'ICON']},
          ]}
          onLeftPress={handleLeftPress}
        /> 
                    
        {renderHeader()}
        <Modal  
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(modalVisible);
        }}
      >
        <Block   center style={styles.centeredView}>
          <Block  style={styles.modalView}>
            <Button onPress={()=>pickFromGallery()} style={[styles.button, styles.buttonClose]}>
               Add photo
            </Button>
            <Button onPress={()=>deletePP()} style={[styles.button, styles.buttonClose]} >
             Remove Photo
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
      <Modal  
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible1(!modalVisible1);
        }}
      >
        <Block   center style={styles.centeredView}>
          <Block  style={styles.modalView}>
          </Block>
          <Image source={{uri:image.uri}} style={{height:150,width:150}}/>
          <Button onPress={()=>editProfilePhoto()}>
          <Text color='white'>set Image</Text>
          </Button>
        </Block>
      </Modal>
      </Block>
    );
      
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
    backgroundColor:'blue'
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
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
})