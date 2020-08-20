import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts} from '../../../styles';

export default Lines = (props) => {
    const {width, height } = props;
    return(
        <View style={{position:'absolute', zIndex:-1, height: height, width:width, flexWrap:'wrap'}}>
            <View style={{borderWidth:1, borderColor:'#212177', borderLeftWidth:0, borderTopWidth:0,
            width: width/2-20, height: height/3-30, marginBottom:20, marginLeft:0}}></View>
            <View style={{borderWidth:1, borderColor:'#212177', width: width/2-20, 
            height: height/3-30, marginBottom:20, marginLeft:20,}}></View>
            <View style={{borderWidth:1, borderColor:'#212177', width: width/2-20, borderLeftWidth:0, 
            height: height/3-10, marginBottom:20, marginLeft:0}}></View>
            <View style={{borderWidth:1, borderColor:'#212177', width: width/2, height: height/3-30,
             marginBottom:20, marginLeft:0, borderTopWidth:0, borderRightWidth:0}}></View>
            <View style={{borderWidth:1, borderColor:'#212177', width: width/2-20, borderRightWidth:0,
             height: height/6-30, marginBottom:20, marginLeft:20}}></View>
            <View style={{borderWidth:1, borderColor:'#212177', width: width/2-20, height: height/2, 
            marginBottom:20, marginLeft:20, borderRightWidth:0, borderBottomWidth:0,}}></View>
        </View>
    )
};

const styles = StyleSheet.create({
    title:{
        fontFamily: fonts.retro,
        color: colors.yellow,
        fontSize:20,
        lineHeight:20
    },
    
});