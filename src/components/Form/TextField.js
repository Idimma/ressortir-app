import Colors, {colorProps} from 'themes/colors';
import {
    TextInput as RNTextInput,
    StyleSheet
} from 'react-native';
import React, {useRef, useState} from 'react';
import {TouchableOpacity, View} from '../../widgets';
import {scale, verticalScale} from 'react-native-size-matters';

import Fonts from 'themes/fonts';
import Icon from 'react-native-vector-icons/Feather';
import Label from './parts/Label';
import PropTypes from 'prop-types';
import Text from '../Text';
import {isNull} from '../../utils';

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: scale(5),
        borderWidth: 1,
        borderColor: Colors.gray10,
    },
    input: {
        height: scale(40),
        flex: 1,
        paddingHorizontal: scale(15),
        color: Colors.gray75,
        ...Fonts.p2(),
    },
    disabled: {
        color: Colors.gray75,
        backgroundColor: Colors.gray10
    },
    inputContainerActive: {
        borderColor: Colors.primary,
    },
    inputContainerError: {
        borderColor: Colors.red,
    },
    error: {
        // marginBottom: verticalScale(4),
    },
    rightContainer: {
        marginRight: scale(15),
    },
    textarea: {
        minHeight: scale(200),
    },
});

const TextField = ({
                       initialValue,
                       value: _value,
                       label,
                       error,
                       labelColor,
                       renderRightComponent,
                       hideError,
                       onChangeText,
                       onChange,
                       secureTextEntry,
                       multiline,
                       disabled, mb,
                       refs,
                       ...otherProps
                   }) => {
    const [isFocused, setFocused] = useState(false);
    const [value, setValue] = useState(_value || initialValue);
    const [isSecureVisible, setSecureVisible] = useState(secureTextEntry);

    const inputRef = useRef(null);
    refs && refs(inputRef && inputRef.current);
    const isActive = !isNull(_value || value);//  value !== null && value !== '';

    const labelProps = {
        isActive,
        isFocused,
        isError: error !== null,
        onPress: () => inputRef?.current?.focus(),
        labelColor: disabled ? 'gray10' : labelColor,
    };

    return (
        <View mb={mb}>
            <View style={[
                styles.inputContainer,
                isFocused && styles.inputContainerActive,
                error && styles.inputContainerError,
            ]}>
                <RNTextInput
                    defaultValue={initialValue}
                    value={_value || value}
                    style={[
                        styles.input,
                        multiline && styles.textarea,
                        disabled && styles.disabled
                    ]}
                    autoCapitalize="none"
                    onFocus={() => setFocused(true)}
                    onEndEditing={() => setFocused(false)}
                    ref={(ref) => {
                        inputRef.current = ref;
                    }}
                    onChangeText={(v) => {
                        onChangeText && onChangeText(v);
                        onChange && onChange(v);
                        setValue(v)
                    }}
                    disabled={disabled}
                    editable={!disabled}
                    underlineColorAndroid="transparent"
                    secureTextEntry={isSecureVisible}
                    multiline={multiline}
                    {...otherProps}
                />
                {renderRightComponent && (
                    <View
                        row aligned
                        style={styles.rightContainer}
                    >
                        {secureTextEntry && (
                            <TouchableOpacity mr={8} onPress={() => setSecureVisible(!isSecureVisible)}>
                                <Icon
                                    color={Colors.gray25}
                                    size={scale(18)}
                                    name={isSecureVisible ? 'eye' : 'eye-off'}/>
                            </TouchableOpacity>
                        )}
                        {renderRightComponent()}
                    </View>
                )}

                {!renderRightComponent && secureTextEntry && (
                    <View
                        style={styles.rightContainer}
                    >
                        <TouchableOpacity onPress={() => setSecureVisible(!isSecureVisible)}>
                            <Icon
                                name={isSecureVisible ? 'eye-off' : 'eye'}
                                color={Colors.gray25}
                                size={scale(18)}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {label && <Label  {...labelProps}>{label}</Label>}
            {(!hideError && error) && <Text danger pl={7} fs={12} style={styles.error}>{error}</Text>}
        </View>
    );
};

TextField.propTypes = {
    value: PropTypes.string,
    error: PropTypes.any,
    label: PropTypes.string,
    labelColor: PropTypes.oneOf(colorProps),
    initialValue: PropTypes.string,
    renderRightComponent: PropTypes.func,
    hideError: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    multiline: PropTypes.bool,
};

TextField.defaultProps = {
    value: null,
    error: null,
    label: '',
    mb:14,
    labelColor: 'white',
    initialValue: '',
    renderRightComponent: null,
    hideError: false,
    secureTextEntry: false,
    multiline: false,
};

export default TextField;
