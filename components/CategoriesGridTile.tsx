import React, { } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';


const CategoriesGridTile = ({ id, title, color, onPress, image }) => {

    return (
        <View style={styles.gridItem}>
            <TouchableOpacity style={[styles.pressable, { backgroundColor: color }]} onPress={onPress}>
                <ImageBackground source={image} resizeMode='cover' style={styles.image}>
                    <View style={[styles.innerContainer, { overflow: 'hidden' }]}>
                        <Text style={[styles.title, { textAlign: 'center' }]}>{title}</Text>
                    </View>
                </ImageBackground>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                </View>


            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        backgroundColor: 'white',
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
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
    title: {
        fontFamily: 'merienda-bold',
        fontWeight: 'bold',
        backgroundColor: "#000000c0",
        color:'white'
    },
    buttonPressed: {
        opacity: 0.5,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
})

export default CategoriesGridTile;