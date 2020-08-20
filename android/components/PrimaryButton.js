import React, {useState} from 'react';
import {View, TouchableNativeFeedback, Text, StyleSheet, ActivityIndicator} from 'react-native';

import {colors, fonts} from '../../styles';

const PrimaryButton = (props) => {
    
    const [loading, setLoading] = useState(false);
    const {color, action, text} = props;

    const primaryColor = color === 'green' ? colors.green : 
                         color === 'red' ? colors.red : 'blue';
    const darkColor = color === 'green' ? colors.darkGreen :
                        color === 'red' ? colors.darkRed : 'blue';


    return(
        <TouchableNativeFeedback onPressOut={()=> {setLoading(true); action();}}>
            <View style={[styles.container,{backgroundColor: darkColor,}]}>
                
                <View style={[styles.container,{backgroundColor: primaryColor}]}>
                    {loading 
                    ? <ActivityIndicator color={'white'} size={'small'}/>
                    : <Text style={styles.text}>{`${text}`}</Text>  
                    }
                </View>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    container:{
        borderRadius:10,
        paddingBottom:4,
    },
    text:{
        fontSize:16,
        fontFamily: fonts.retro_bold,
        color:'white',
        paddingTop:10,
        paddingBottom:6,
        paddingRight:25,
        paddingLeft:25,
    }
});

export default PrimaryButton;