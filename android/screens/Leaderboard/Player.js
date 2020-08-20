import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {colors, fonts} from '../../../styles';
import FastImage from 'react-native-fast-image';

export default Player = ({place, name, score, img}) => {

    const color = place === 1 ? 'gold' : 
                  place === 2 ? colors.pink : 
                  place === 3 ? colors.green : 'white';

    return(
    <View style={styles.mainContainer}>
         <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center',}}>      
            <Text style={[styles.position,{color}]}>{place}</Text>
            <FastImage
                style={{ height:18, width:18, borderRadius:50 }}
                source={{
                    uri: img,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
        </View>        
        <Text style={[styles.name,{color}]}>{name.length > 11 ? name.slice(0,11): name}</Text>
        <Text style={[styles.score,{color}]}>{score}</Text>
    </View>
)};

const styles = StyleSheet.create({
    mainContainer:{
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
       marginBottom: 10,
    },
    name:{
        fontFamily: fonts.retro,
        color:'white',
        fontSize:9,
        lineHeight:9,
    },
    score:{
        fontFamily: fonts.retro,
        color:'white',
        fontSize:9,
        lineHeight:9,
    },
    position:{
        fontFamily: fonts.retro,
        color:'white',
        fontSize:10,
        lineHeight:10,
        marginRight:10,
    },
});