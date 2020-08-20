import React,{useEffect, } from 'react';
import {StatusBar, View, Dimensions, ActivityIndicator } from 'react-native';

import {colors } from '../../styles';

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");
//GENERAL

export default Loading = ({route, navigation}) => {
  
  const {screen, user} = route.params;
 
  useEffect(()=>{
    console.log('init Loading');

    setTimeout(()=>{ navigation.navigate(screen, {user: user}); }, 400);
    
    return () => {
      
      console.log('quit Loading');
    }
  },[]);


  return (
    <>
        <StatusBar backgroundColor={'black'}/>
        <View style={{width: WIDTH, height: HEIGHT, backgroundColor:'black', justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator color={colors.blue} size={'large'}/>
        </View>
    </>
  );
};