import { Button, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from '../components/Themed';
import { useDispatch } from 'react-redux';
import Payments from '../components/checkout/Payment';
import Shipping from '../components/checkout/Shipping';
import Review from '../components/checkout/Review';
import { Fragment, useState } from 'react';
import Order from '../components/checkout/Order';

const steps = [
  "payment",
  "shipping",
  "review",
];

function stepContent(props: { activeStep: Number, handleStep: Function, setOrderId: Function}) {
  const { activeStep, handleStep, setOrderId} = props;

  switch (activeStep) {
    case 0:
      return <Payments handleStep={handleStep} />
    case 1:
      return <Shipping handleStep={handleStep} />
    case 2:
      return <Review handleStep={handleStep} setOrderId={setOrderId}/>
    default:
      throw new Error("Unrecognized selection");
  }
}

export default function CheckoutScreen({ navigation, route }: any) {
  const [activeStep, setActiveStep] = useState(0);
  const [orderId, setOrderId] = useState(null);


  const handleBack = () => {
    setActiveStep(currentStep => (currentStep - 1));
  }

  const handleStep = () => {
    setActiveStep(currentStep => (currentStep + 1));
  }

  return (

    <View style={styles.container}>
      <Text style={styles.title}>{steps[activeStep]}</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {activeStep === steps.length ? (
            <View>
            <Order orderId={orderId} />
            <Button title='Shop some more!' onPress={()=>navigation.navigate('Categories')}/>
            </View>
          ) : (
            <Fragment>
              {stepContent({ activeStep, handleStep, setOrderId })}
              {activeStep !== 0 && <Button title='Back' onPress={() => handleBack()} />}

            </Fragment>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View >

  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  container: {
    flex: 1,

  },
  title: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#234fc7',
    fontFamily: 'merienda-bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInputField: {
    flex: 1,
  }
});
