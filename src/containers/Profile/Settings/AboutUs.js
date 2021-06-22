import React from 'react';
import {Text, Container, NavBar} from 'components';
import PropTypes from 'prop-types';
import {
    ScrollView, StyleSheet, Image, View,
} from 'react-native';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
        padding: scale(14),
    },
    bannerContainer: {
        flex: 0.7,
        borderRadius: scale(20),
        aspectRatio: 4 / 3,
        overflow: 'hidden',
    },
    banner: {
        flex: 1,
        alignSelf: 'center',
        width: '80%',
        height: undefined,
        resizeMode: 'contain',
    },
    space: {
        marginTop: scale(14),
    },
});

const AboutUs = ({navigation}) => (
    <Container backgroundColor="white">
        <NavBar title="About Us" onLeftIconPress={() => navigation.goBack()}/>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.bannerContainer}>
                <Image source={{uri: 'https://ressortir.com/images/logo/ressortir-logo.png'}} style={styles.banner}/>
            </View>
            <Text style={styles.space}>
                Our core business at Ressortir is the sole-distribution of Automotive Gas Oil and Liquefied Petroleum
                Gas. In addition, Ressortir offers freight distribution across cities in Nigeria.
                {'\n\n\n'}
                With reputable years of experience and reliable channel of distribution across the country, we always
                ensure fast and accurate delivery of your products. We can handle long and short term contracts for
                restaurants, factories, schools, offices, and other multinationals.
                {'\n\n\n'}
                <Text title>Our Mission{'\n'}</Text>
                Our mission statement is simple, yet the foundation of everything we do at Ressortir , to provide
                outstanding services.
                {'\n\n\n'}
                <Text title>Company Policy{'\n'}</Text>
                1. Cooperate Style of leadership with the greatest possible individual autonomy for our employees
                {'\n'}
                2. Satisfied Customers and employees are prime company targets
                {'\n'}
                3. Permanent innovative adaption to industry changes and economic development
                {'\n\n'}
            </Text>
        </ScrollView>
    </Container>
);

AboutUs.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default AboutUs;
