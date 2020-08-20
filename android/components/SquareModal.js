import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';

import {colors, fonts} from '../../styles';


export default App = (props) => {
    
    const {width, height, message, title, close, closeAction, children} = props;
    
    return(
        <View style={{position:'absolute', zIndex:10, top:height/3, right:40, width:width -80,
          backgroundColor: colors.blue, borderRadius:25, padding:4}}>
            {close ? 
                <TouchableNativeFeedback onPress={closeAction}>
                    <View style={styles.closeButton}>
                        <Text style={styles.closeButtonLabel}>x</Text>
                    </View>
                </TouchableNativeFeedback>
            : null}
            <View style={[styles.grapTitle,{width:width -80}]}>
                <Text style={styles.title}>{`${title}`}</Text>
            </View>
            <View style={{backgroundColor: colors.red, width: width-88, borderRadius:22, padding:4}}>
                <View style={{backgroundColor: colors.orange, width: width-96, borderRadius:19, padding:4}}>
                    <View 
                        style={{backgroundColor: colors.darkBackground, width: width-104,
                         alignItems:'center', justifyContent:'center', 
                         borderRadius:16, paddingLeft:20, paddingRight:20, paddingTop:110, paddingBottom:40,
                        }}>
                        <Text style={[styles.label,{ marginBottom: children ? 40 : 0}]}>{`${message ? message : ':('}`}</Text>
                        {children ? children : null}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label:{
        fontFamily: fonts.retro_bold,
        color: colors.orange,
        fontSize:16,
        textAlign:'center',
    },
    grapTitle:{
        position:'absolute',
        top: 50,
        right: 0,
        zIndex:9,
        backgroundColor: colors.blue,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
    },
    closeButton:{
        position:'absolute',
        top: -20,
        right: - 15,
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
    title:{
        fontFamily: fonts.retro,
        color: 'black',
        fontSize:18,
        lineHeight:18,
    },
});