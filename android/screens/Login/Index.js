import React, {useEffect, useState} from 'react';
import {StatusBar, View, Dimensions, Text, TouchableNativeFeedback} from 'react-native';

import {GraphRequest, GraphRequestManager, LoginManager} from 'react-native-fbsdk';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

import {colors, fonts} from '../../../styles';
import {showToast, } from '../../../actions';

//GENERAL
const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

export default Login = ({route, navigation}) => {
  
  useEffect(()=>{
    console.log('init login');
  
    getUser();

    return () => {
     
      console.log('quit login');
    }
  },[]);

  const [login, setLogin] = useState(false);

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@user')
      if(value !== null) {
        const user = JSON.parse(value);
        navigation.navigate('Loading', {screen: 'Home', user: JSON.stringify(user)});
      }else{
        setLogin(true);
      }
    } catch(e) {
       console.log(e);
    }
  }

  function _createAccount(){

    LoginManager.logInWithPermissions(["public_profile"]).then((result) => {
        if (result.isCancelled) { 
          showToast('Login cancelled');
        }
        else { 
          //showToast('Login_successful');
          fetchProfileInfo(); 
        }
      }, (error) => {
          showToast(`Login fail with error: ${error}`);
      }
    );
  }

  function fetchProfileInfo(){
    let request = new GraphRequest('me?fields=id,name,picture', null, (error, result) => {
      if (result) { 
        const user = {
          name: result.name, 
          id: result.id,
          img: result.picture.data.url,
          timeStamp: new Date().valueOf(),
        }
        database().ref(`users/${user.id}/account/`).once('value', snapshot => {
            if(snapshot.val()){
              const _user = snapshot.val();
              storeUser(_user);
            }else{
              database().ref(`users/${user.id}/account`).update(user).then(() => {storeUser(user);});
            }
        });
        
      }
      else {showToast(`error: ${error}`)}
    });
    new GraphRequestManager().addRequest(request).start()
  }

  const storeUser = async (user) => {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('@user', jsonValue);
      navigation.navigate('Loading', {screen: 'Home', user: JSON.stringify(user)});
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
        <StatusBar backgroundColor={'black'}/>
        {login ? 
        <View 
          style={{backgroundColor: colors.darkBackground, width: WIDTH, height: HEIGHT,
                alignItems:'center', justifyContent:'center',
          }}
        >

          <Text style={{fontFamily: fonts.retro_bold, color:'white', 
          fontSize:28, padding:20, paddingBottom:HEIGHT/10*5, textAlign:'center'}}>
            Create an account and start playing</Text>

          <TouchableNativeFeedback onPress={()=> _createAccount()}>
          <View style={{backgroundColor:'#1877f2', padding:20, borderRadius:50, 
          flexDirection:'row', width: WIDTH-40, alignItems:'center', justifyContent:'center'}}>
            <FontAwesomeIcon icon={faFacebookSquare} size={24} color={'white'}/>
            <Text style={{fontFamily: fonts.retro_bold, color:'white', paddingLeft:10, 
            fontSize:16}}>Create account with Facebook</Text>
          </View>
          </TouchableNativeFeedback>

          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingTop:40,}}>
              <FontAwesomeIcon icon={faExclamationTriangle} size={12} color={colors.orange}/>
              <Text style={{fontFamily: fonts.retro_regular, color: colors.orange, fontSize:13, paddingLeft:10}}>Be aware while playing this game</Text>
          </View>
        </View>
        : <View style={{width: WIDTH, height: HEIGHT, backgroundColor:'black'}}></View>}
    </>
  );
};

