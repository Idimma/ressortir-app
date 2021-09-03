import {FlatList, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import React from 'react';
import {View} from "../../widgets";
import BasicTile from "../../components/Product/BasicTile";
import {Empty} from "../../components";

const styles = StyleSheet.create({
    card: {
        height: verticalScale(80),
        marginTop: verticalScale(-40),
        marginHorizontal: scale(20),
    },
    block: {},

    left: {
        marginLeft: scale(7),
    },
    right: {
        marginRight: scale(7),
    },
});
const services = [
    {
        name: 'Diesel Supply',
        uri: 'https://ressortir.com/images/icons/diesel.png',
        image: 'https://ressortir.com/images/sliders/diesel-m.jpg',
        path: 'Diesel',
    },
    {
        name: 'Domestic Gas Refill',
        uri: 'https://ressortir.com/images/icons/gas.png',
        image: 'https://ressortir.com/images/sliders/gas-refill.jpeg',
        path: 'Gas',
    },
    {
        name: 'LPG Tank Refill',
        image: 'https://ressortir.com/images/sliders/lpg.jpg',
        uri: 'https://ressortir.com/images/icons/gas.svg',
        path: 'Lpg'
    },
    {
        name: 'Freight Distribution',
        image: 'https://ressortir.com/images/sliders/freight-m.jpg',
        uri: 'https://ressortir.com/images/icons/freight.png',
        path: 'Freight'
    }
]

const Services = ({navigation}) => {
    return (
        <FlatList
            style={{
                padding: scale(14),
            }}
            data={services}
            numColumns={2}
            keyExtractor={(data) => data.name.toString()}
            renderItem={({item, index}) => (
                <BasicTile
                    onPress={() => navigation.navigate(item.path)}
                    key={item.name}
                    style={index % 2 === 0 ? styles.right : styles.left}
                    {...item}
                />
            )}
            ListEmptyComponent={Empty}
            onEndReachedThreshold={0.5}
            initialNumToRender={12}
            ListFooterComponent={<View style={styles.footer}/>}
        />);
}
export default Services;
