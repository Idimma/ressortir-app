import React from 'react';
import {Image} from 'react-native';
import {viewStyles} from "../../utils/StylesGenerator";

export function Qmage(props) {
    const {contain, stretch, cover, center} = props
    let resize = null;
    if (contain) resize = 'contain';
    if (stretch) resize = 'stretch';
    if (cover) resize = 'cover';
    if (center) resize = 'center';
    const newProps = {props}
    delete newProps.flex;
    return (
        <Image {...newProps} resizeMode={resize} style={[viewStyles(props), props.style]}/>
    );
}
