import React from "react";
// import {LinearGradient} from "expo-linear-gradient";
// import {WHITE} from "../utils/Colors";
// import {ActivityIndicator} from "react-native";
import {Qouch} from "./touch";
import {Qext} from "./text";
import {Button, TextField} from "../components";

export {Spinner} from './spinner';
export {Qiew as View} from './view';
export {Qouch as TouchableOpacity} from './touch';
export {NoFeedBack as TouchableWithoutFeedback} from './noEffect';
export {Qext as Text} from './text';
export {Qmage as Image} from './image';
export {Qcon as Icon} from './icon';
export {Qcroll as ScrollView} from './scroll';
export TextInputField from './TextInputField';

//
// export const Button = (props) => {
//     return (<LinearGradient
//         colors={['#019241',  '#04431F']}
//         start={[0.1, 0.6]}
//         end={[0.99, 0.9]}
//         locations={[0.1, 0.9]}
//         style={{height: 45, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
//         <Qouch disabled={props.isLoading} lightShadow h={45} w={'100%'} onPress={props.onPress} central>
//             {props.isLoading ? <ActivityIndicator animating color={WHITE} size={'small'}
//             /> : <Qext white center>{props.text}</Qext>}
//         </Qouch>
//     </LinearGradient>)
//
// };