import React from 'react';
import {Text, View, StyleSheet, Image, } from 'react-native';

import { faTrophy, faStreetView, faMapMarkedAlt, faPlay } from '@fortawesome/free-solid-svg-icons';

import {colors, fonts} from '../../../styles';
import CustomButton from './Button';

export default Header = (props) => {
    const { width, height, title, goToMap, goToAdress, goToLeaderboard } = props;

    return(
        <View style={[styles.mainContainer,{width: width/2+20}]}>
            <View style={styles.titleContainer}>
                <View style={styles.titleGrap}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
            <View style={styles.mapContainer}>
                <View style={[styles.imageContainer, {width: width/2+20, height: height/10*3}]}>
                    <Image
                        source={require('../../../resources/images/maps/teul_home.jpeg')}
                        style={{
                            width: width/2+10 , height: (height/10*3)-10, borderRadius:10,
                        }}
                    />
                </View>
                {/* <Text style={styles.place}>{place}</Text> */}
                <View style={{flexDirection:'row', justifyContent:'space-around', 
                            padding:10, paddingBottom:0, paddingTop:20,}}
                >
                   <CustomButton ico={faPlay} action={goToMap}/>
                   <CustomButton ico={faTrophy} action={goToLeaderboard}/>
                   <CustomButton ico={faMapMarkedAlt} action={goToAdress}/>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer:{
        alignItems:'center',
    },
    icon:{
    },
    mapContainer:{
        backgroundColor:'#24ba8d',
        padding:8,
        borderRadius:20,
        paddingBottom:0,
    },
    imageContainer:{
        backgroundColor:'#11533e',
        padding:5,
        borderRadius:15,
    },
    image:{

    },
    titleContainer:{
        padding:3,
        paddingBottom:0,
        backgroundColor:'#24ba8d',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    titleGrap:{
        backgroundColor:'#353537',
        padding:5,
        paddingLeft:20,
        paddingRight: 20,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    title:{
        color:'white',
        fontFamily: fonts.retro_bold,
        fontSize: 18,
    },
    place:{
        fontFamily: fonts.retro_bold,
        fontSize:16,
        lineHeight:16,
        alignSelf:'center',
        padding:20,
        color:'#0c706c',
    },
});