import React from 'react';
import {
    TouchableOpacity, ImageBackground, StyleSheet, View,
} from 'react-native';
import {getScreenWidth} from 'utils/size';
import {scale} from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Text from '../Text';
import Card from '../Card';
import Rating from '../Rating';
import {Image} from "../../widgets";

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: scale(8),
        borderTopRightRadius: scale(8),
        overflow: 'hidden',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    info: {
        padding: scale(10),
        justifyContent: 'space-between',
        flex: 1,
    },
    bg: {
        flex: 1,
    },
    between: {
        justifyContent: 'space-between',
    },
    rating: {
        marginVertical: scale(4),
    },
    discount: {
        textDecorationLine: 'line-through',
        marginLeft: scale(4),
    },
});

const BasicTile = ({
                       name,
                       uri,
                       image,
                       style,
                       parentMargin,
                       size,
                       onPress,
                       rating,
                       numberOfReviews,
                       beforeDiscount,
                   }) => {
    const width = size - scale(parentMargin) - scale(parentMargin / 2);
    return (
        <Card style={StyleSheet.flatten([
            {
                width,
                marginTop: scale(parentMargin),
            },
            style])}
        >
            <TouchableOpacity
                style={styles.container}
                onPress={onPress}
            >
                <View
                    style={{width, aspectRatio: 1 / 1,}}
                >
                    <ImageBackground
                        source={{uri: image}}
                        style={styles.bg}
                    />
                </View>

                <View style={styles.info}>
                    <Text numberOfLines={2} primary weight="bold">{name}</Text>
                    <View style={[styles.row, styles.between]}>

                        <Text italic color="gray50">{`Request Now`}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Card>
    );
};

BasicTile.propTypes = {
};

BasicTile.defaultProps = {
    style: null,
    parentMargin: 14,
    size: getScreenWidth() / 2,
    onPress: null,
    beforeDiscount: null,
};

export default BasicTile;
