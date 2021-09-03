import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors, { colorProps } from 'themes/colors';

import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';
import Text from '../Text';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
        padding: scale(12),
        alignItems: 'center',
        borderRadius: 25,//,scale(21),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ghost: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.gray25,
    },
    disabled: {
        backgroundColor: Colors.gray10,
        borderColor: Colors.gray10,
    },
    tiny: {
        paddingHorizontal: scale(10),
        paddingVertical: scale(4),
        borderRadius: 14,
    },
});

const Button = ({
    children,
    label,
    variant,
    textColor,
    color,
    onPress,
    size,
    isLoading
}) => {
    let view = null;
    if (children) {
        view = children;
    }
    if (label) {
        view = <Text
            color={textColor || (variant === 'gradient' ? 'white' : textColor) || (variant === 'disabled' ? 'white' : 'gray50')}
            weight="bold"
        >{label}</Text>;
    }
    if (isLoading) {
        view = <ActivityIndicator
            color={textColor || (variant === 'gradient' ? 'white' : textColor) || (variant === 'disabled' ? 'white' : 'gray50')}
        />;
    }

    return (
        <TouchableOpacity
        
            disabled={variant === 'disabled' || isLoading} onPress={onPress}>
            {variant === 'gradient' && (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={[Colors.tertiary, Colors.primaryAlt, Colors.primary]}
                    style={StyleSheet.flatten([
                        styles.container,
                        size === 'tiny' ? styles.tiny : {},
                                      
                    ])}
                >
                    {view}
                </LinearGradient>
            )}
            {(variant !== 'gradient') && (
                <View
                    style={StyleSheet.flatten([
                        styles.container,
                        styles.ghost,
                        variant === 'solid' && {
                            backgroundColor: Colors[color],
                            borderColor: Colors[color]
                        },
                        variant === 'disabled' && styles.disabled,
                        size === 'tiny' && styles.tiny,
                    ])}
                >
                    {view}
                </View>
            )}
        </TouchableOpacity>

    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(['gradient', 'ghost', 'solid', 'disabled']),
    size: PropTypes.oneOf(['tiny', 'regular']),
    label: PropTypes.string,
    textColor: PropTypes.oneOf(colorProps),
    color: PropTypes.oneOf(colorProps),
    children: PropTypes.any,
    onPress: PropTypes.func,
};

Button.defaultProps = {
    variant: 'gradient',
    size: 'regular',
    color: 'primary',
    textColor: null,
    children: null,
    onPress: null,
};

export default Button;
