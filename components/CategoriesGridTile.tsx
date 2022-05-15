import React, {  } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';


const CategoriesGridTile = ({ id, title, color, onPress}) => {
    return (
        <View style={styles.gridItem}>
            <TouchableOpacity style={[styles.pressable, {backgroundColor: color}]} onPress={onPress}>
                <View style={[styles.innerContainer, {overflow:'hidden'}]}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={[styles.title,{textAlign:'center'}]}>{title}</Text>
                    </View>
                </View>


            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        backgroundColor:'white',
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowOffset:{width:0, height:2},
        shadowRadius:8,
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressable: {
        flex: 1,
    },
    title:{
        fontFamily: 'merienda-bold',
        fontWeight:'bold',
    },
    buttonPressed:{
        opacity:0.5,
    }
})

export default CategoriesGridTile;