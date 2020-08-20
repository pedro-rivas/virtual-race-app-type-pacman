import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts} from '../../../styles';

export default Header = ({score, coins}) => {

    return(
    <LinearGradient 
        colors={['rgba(0,0,0,1)','rgba(0,0,0,1)','rgba(0,0,0,.0)']} 
        style={styles.mainContainer}
    >
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Text style={[styles.scoreLabel,{marginRight:20}]}>{`SCORE`}</Text>
            <Text style={styles.scoreLabel}>{`${score}`}</Text>
        </View>
        {/* <View style={{width:70, alignItems:'center'}}>
            <Text style={styles.timeLabel}>{`${time}s`}</Text>
        </View> */}
        <View style={styles.points}>
            <View style={styles.pointsContainer}>
                <Text style={styles.bigLabel}>{coins}</Text>
                <View style={{width:24, height:24, backgroundColor: colors.orange_dark, borderRadius:50, alignItems:'center', justifyContent:'center'}}>
                    <View style={{width:4, height:4, backgroundColor: colors.yellow, borderRadius:50,}}>
                        
                    </View> 
                </View>
            </View>
        </View>
    </LinearGradient>
    )
};

const styles = StyleSheet.create({
    mainContainer:{
        position:'absolute', 
        width:'100%', 
        padding:20, 
        paddingBottom:40,
        paddingRight:0,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    points:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor: colors.pink,
        borderRightWidth:0,
        borderTopLeftRadius:25,
        borderBottomLeftRadius:25,
    },
    pointsContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:3,
        borderColor: colors.orange,
        borderRightWidth:0,
        padding:5,
        paddingLeft:20,
        paddingRight:20,
        borderTopLeftRadius:25,
        borderBottomLeftRadius:25,
    },
    bigLabel:{
        color:'white',
        fontSize:22,
        fontFamily: fonts.retro_bold,
        marginRight:5,
        lineHeight:24,
    },
    scoreLabel:{
        color:'white',
        fontSize:10,
        fontFamily: fonts.retro,
    },
    timeLabel:{
        color: colors.blue,
        fontSize:10,
        fontFamily: fonts.retro,
    },
});