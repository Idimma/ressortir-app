import { StyleSheet, View } from 'react-native';

import Colors from 'themes/colors';
import React from 'react';
import { Text } from 'components';
import WebView from 'react-native-webview';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    card: {
        padding: scale(14),
        marginBottom: scale(14),
        backgroundColor: Colors.white,
    },
    text: {
        marginTop: scale(14),
    },
});

const htmlStyles = body =>  `<meta name="viewport" content="width=device-width, initial-scale=1.0"><style>html {margin: 0;padding: 0;}</style>${body}`;

const Details = ({ product }) => (
    <View style={styles.card}>
        <Text bold fs={17} weight="medium">Product details</Text>
        <WebView 
         style={{ height: 180, width: '100%', marginTop: scale(14) }}
            source={{ html: htmlStyles(product.description || 'No description found '), origin:'*' }} />
    </View>
);

export default Details;
