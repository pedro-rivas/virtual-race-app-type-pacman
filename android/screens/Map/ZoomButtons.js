import React from 'react';
import {Text, View, StyleSheet, TouchableNativeFeedback} from 'react-native';

import {colors, fonts} from '../../../styles';

export default ZoomButtons = (props) => (
    <View style={{position:'absolute', bottom:40, right:20, flexDirection:'column'}}>
        <TouchableNativeFeedback  onPress={props.in}>
            <View style={[styles.closeButton,{marginBottom:20}]}>
                <Text style={styles.closeButtonLabel}>+</Text>
            </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={props.out}>
            <View style={styles.closeButton}>
                <Text style={styles.closeButtonLabel}>-</Text>
            </View>
        </TouchableNativeFeedback>
    </View> 
);


const styles = StyleSheet.create({
 
    closeButton:{
        backgroundColor: colors.blueDark,
        width:50,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        borderWidth:4,
        borderColor: '#2fa3e0',
        zIndex:9,
    },
    closeButtonLabel:{
        fontFamily: fonts.retro_bold,
        fontSize:35,
        color: colors.yellow,
        lineHeight:35,
        textShadowOffset: {width: 0, height: 0},
        textShadowColor: 'black',
        textShadowRadius: 5,
    },
  });