import React from 'react';
import {View, StyleSheet, TouchableNativeFeedback} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import {colors, fonts} from '../../../styles';

export default CustomButto = (props) => {

    const {ico, action} = props;

    let circles = [];
    for (let i = 0; i < 16; i++) { circles.push([]); }
    let x = 0; let y = 0; let z = 0;
    let Decoration = () => circles.map((value, i) => {
            
            if(i > 4 && i < 8){x += 1; }
            if(i > 8 && i < 12){y += 1; }
            if(i > 12 && i < 16){z += 1; }

            return i < 4 ? 
                (<View key={i} style={{position:'absolute', zIndex:-1, left:4+(i), bottom: i*10+(2*i+4),
                borderRadius:10, backgroundColor:'#d9b988', width:8-(2*i), height:8-(2*i)}}></View>) 
                : i > 3 && i < 8 ? 
                (<View key={i} style={{position:'absolute', zIndex:-1, left:16+(x), bottom: x*10+(2*x+4),
                borderRadius:10, backgroundColor:'#d9b988', width:8-(2*x), height:8-(2*x)}}></View>) 
                : i > 7 && i < 12 ? 
                (<View key={i} style={{position:'absolute', zIndex:-1, left:28+(y), bottom: y*10+(2*y+4),
                borderRadius:10, backgroundColor:'#d9b988', width:8-(2*y), height:8-(2*y)}}></View>) 
                : i > 11 && i < 16 ? 
                (<View key={i} style={{position:'absolute', zIndex:-1, left:40+(z), bottom: z*10+(2*z+4),
                borderRadius:10, backgroundColor:'#d9b988', width:8-(2*z), height:8-(2*z)}}></View>) 
                : null
       
    });

    return(     
        <TouchableNativeFeedback onPress={action}>
            <View style={styles.button}>
                <FontAwesomeIcon 
                    icon={ ico } size={35} color={'black'} 
                    style={{position:'absolute', top:8}}
                />
                <FontAwesomeIcon 
                    icon={ ico } size={36} color={'#bd3e13'} 
                    style={{position:'absolute', bottom:6}}
                />
                <FontAwesomeIcon 
                    icon={ ico } size={35} color={'#ffd904'}
                />
                <Decoration/>
            </View>
        </TouchableNativeFeedback> 
    )
};

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#ffe0af',
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        height:52,
        width:52,
        justifyContent: 'center',
        alignItems:'center',
    },
});