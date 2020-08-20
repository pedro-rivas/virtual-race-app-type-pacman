import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts} from '../../../styles';

export default Footer = (props) => (
    <LinearGradient 
        colors={['rgba(0,0,0,.0)', 'rgba(0,0,0,1)',]} 
        style={styles.mainContainer}
    >
    </LinearGradient>
    
);

const styles = StyleSheet.create({
    mainContainer:{
        position:'absolute', 
        bottom:0,
        left:0,
        width:'100%', 
        padding:20, 
        paddingTop:40,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
});