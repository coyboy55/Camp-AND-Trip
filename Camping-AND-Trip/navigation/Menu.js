import React,{useContext} from "react";
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Image, Button } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";

import { Icon, Drawer as DrawerCustomItem } from '../components/';
import { Images, materialTheme } from "../constants/";
import SessionContext from '../components/session/SessionContext'
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";


function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const {
    actions : {logout},
    session:{user:{isTeam,firstName,_id,lastName,username,email,photo}}
    } = useContext(SessionContext);
  const insets = useSafeArea();
  let screens=[];
isTeam ? ( screens = [
  "Home",
  "create",
  "reservation"
]):(
   screens = [
  "Home"])
  console.log(photo);
  return (

    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.25} style={styles.header}>
     <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Profile",{id:_id})}
        >
          <Block style={styles.profile}>
            <Image source={{ uri: 'http://192.168.43.220:3000/uploads/users/'+photo }} style={styles.avatar} />
            <Text h5 color={"white"}>
              {username}
            </Text>
          </Block>
        </TouchableWithoutFeedback> 
        <Block row>
          {/* <Block middle style={styles.pro}> */}
            {/* <Text size={16} color="white"> 
              {email}
            </Text>  */}
          {/* </Block> */}
          {/* <Text size={16} muted style={styles.seller}>
            {email}
          </Text>  */}
          <Text size={16} color={materialTheme.COLORS.WARNING}>
            {email}{" "}
            <Icon name="shape-star" family="GalioExtra" size={14} />
          </Text>
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.4,
              paddingLeft: drawerPosition === "left" ? insets.left : 0,
              paddingRight: drawerPosition === "right" ? insets.right : 0,
              marginTop: 5

            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
             
                focused={state.index === index ? true : false}
              />
            );
          })}
        </ScrollView>
      </Block>
      <Block flex={0.3} style={{ paddingLeft: 7, paddingRight: 14 }}>
        <TouchableNativeFeedback 
 
         // navigation={navigation}
          // focused={state.index === 8 ? true : false}
          onPress={logout}
          style={{width:150,height:50}}
        >
          <Block style={{marginLeft:30}} row>
               <Text muted size={20} bold>
            LOG OUT
          </Text>
          <Entypo style={{marginLeft:10}} color='gray' size={20} name='log-out'/>
          </Block>
       
        </TouchableNativeFeedback>
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0049bf',
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: 16,
  }
});

export default CustomDrawerContent;
