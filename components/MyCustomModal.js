import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Pressable, Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

const { height, width } = Dimensions.get('window')
const MODAL_WIDTH = width * 0.8;
const MODAL_HEIGHT = height * 0.8;
const CustomModal = ({ setSelectOption, text, radioButtonsData, isDisabled = false }) => {



    const [modalVisible, setModalVisible] = useState(false);
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)

    let buttonTitle = text.buttonTitle;

    function onPressRadioButton(radioButtonsArray) {

        const selection = radioButtonsArray.filter((item, index) => item.selected === true)[0];
        console.log("Option:", selection.label);
        setRadioButtons(radioButtonsArray);
        setSelectOption(selection);
        setModalVisible(false);
    }

    // useEffect(() => {
    //     setRadioButtons(radioButtonsData)
    // }, [radioButtonsData])
    useLayoutEffect(()=>{
        setRadioButtons(radioButtonsData);
    },[radioButtonsData])

    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                

            >
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{text.title}</Text>
                        <ScrollView style={{ maxHeight: 300 }}>
                            <RadioGroup
                                radioButtons={radioButtons}
                                onPress={onPressRadioButton}
                                containerStyle={{ textAlign: 'left', alignItems: 'left' }}
                            />
                        </ScrollView>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>{text.confirm}</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen,]}
                onPress={() => setModalVisible(true)}
                disabled={isDisabled}
            >
                <Text style={styles.textStyle}>{buttonTitle}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignSelf: 'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop: 40,
        width: 300,
        maxHeight: MODAL_HEIGHT
    },
    modalView: {
        backgroundColor:'white',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom:15,
        textAlign: "center"
    }
})

export default CustomModal;