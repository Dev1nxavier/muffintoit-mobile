import { Text, StyleSheet } from "react-native";
import { View } from "../Themed";
import { useSelector } from 'react-redux';
import CustomButton from "../ui/CustomButton";

export default function Review({ handleStep}) {

    const live = useSelector((state) => state.cartState.live);

    const handleSubmit = () => {
        handleStep()
    }

    return (
        <View style={styles.container}>
            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Item Subtotal:
                </Text>
                <Text style={styles.text}>
                    ${live.subtotal.raw}
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Shipping &amp; handling:
                </Text>
                <Text style={styles.text}>
                    ${live.shipping.price.raw}
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Total before taxes:
                </Text>
                <Text style={styles.text}>
                    ${live.total.raw}
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.text}>
                    Tax:
                </Text>
                <Text style={styles.text}>
                    ${live.tax.amount.raw}
                </Text>
            </View>

            <View style={styles.lineItemsContainer}>
                <Text style={styles.title}>
                    Order total:
                </Text>
                <Text style={styles.title}>
                    ${live.total_with_tax.raw}
                </Text>
            </View>
            <CustomButton title={"Enter Shipping"} handlePress={handleSubmit}/>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    list: {
        alignSelf: 'stretch',
    },
    text:{
        fontSize: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'merienda'
    },
    lineItemsContainer: {
        flexDirection: 'row',
        alignItems:'space-evenly',
        justifyContent: 'space-between',
        width:'100%',
        marginVertical: 16,
    },
    button:{
        marginTop:24,
    }

})