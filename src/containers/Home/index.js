import {Carousel, Container, GradientBlock, IconButton, NavBar, Text} from 'components';
import {ScrollView} from 'react-native';
import {scale} from 'react-native-size-matters';

import PropTypes from 'prop-types';
import React from 'react';
import {View} from "../../widgets";
import Services from "./Services";
import {loadProfile} from "../../utils";

class Home extends React.Component {
    state = {
        slides: [
            {
                uri: 'https://ressortir.com/images/sliders/s-lpg.jpg',
                text: <Text fs={30} bold white>Welcome to Ressortir</Text>
            },
            {
                uri: 'https://ressortir.com/images/sliders/s-freight.jpg',
                text: 'Our core business at Ressortir is the sole-distribution of Automotive Gas Oil and Liquefied Petroleum Gas. In addition, Ressortir offers freight distribution across cities in Nigeria.'
            },
            {
                uri: 'https://ressortir.com/images/sliders/dashboard.jpg',
                text: 'With reputable years of experience and reliable channel of distribution across the country, we always ensure fast and accurate delivery of your products. We can handle long and short term contracts for restaurants, factories, schools, offices, and other multinationals.'
            },
            {
                uri: 'https://ressortir.com/images/sliders/s-diesel-2.jpg',
                text: 'Our mission statement is simple, yet the foundation of everything we do at Ressortir , to provide outstanding services.'
            },
            // {
            //     uri: 'https://ressortir.com/images/sliders/diesel-m.jpg',
            //     text: 'Cooperate Style of leadership with the greatest possible individual autonomy for our employees'
            // },
        ],
    };

    componentDidMount() {
        loadProfile();
    }

    render() {
        let {navigation} = this.props;
        return (
            <Container>
                <View primary>
                    <NavBar
                        variant="ghost"
                        renderLeftComponent={() => (
                            <Text title white>Ressortir</Text>
                        )}
                        renderRightComponent={() => (
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>

                                {/*<IconButton*/}
                                {/*    color="white"*/}
                                {/*    icon="bell"*/}
                                {/*    size={22}*/}
                                {/*    style={{paddingLeft: scale(14),}}*/}
                                {/*    badge={8}*/}
                                {/*    onPress={() => navigation.navigate('Notification')}*/}
                                {/*/>*/}
                            </View>
                        )}
                    />
                </View>

                <ScrollView bounces={false}>
                    <GradientBlock>
                        <Carousel autoplayTimeout={8} images={this.state.slides}/>
                    </GradientBlock>
                    <Services navigation={navigation}/>
                </ScrollView>
            </Container>
        );
    }
}

Home.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Home;
