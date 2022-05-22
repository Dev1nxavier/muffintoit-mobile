import { View, Image, Text } from 'react-native';
import logo from '../assets/images/muffintoit_logo.png';

const CustomHeader=(props)=>{
    return(
        <View>
            <Image source={logo} style={{width:50, height:50}}/>
        </View>
    )
}

export default CustomHeader;