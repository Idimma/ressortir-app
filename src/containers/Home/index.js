import { Carousel, Container, GradientBlock, IconButton, NavBar, Text } from 'components';
import { ScrollView, StyleSheet, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import { AppService } from '../../services';
import Categories from './Section/Categories';
import DailyDiscover from './Section/DailyDiscover';
import FlashSale from './Section/FlashSale';
import Popular from './Section/Popular';
import PropTypes from 'prop-types';
import React from 'react';
import SearchBar from './Section/SearchBar';
import { catchError } from '../../utils';
import { getCategories } from 'mocks/categories';

const styles = StyleSheet.create({
    card: {
        height: verticalScale(80),
        marginTop: verticalScale(-40),
        marginHorizontal: scale(20),
    },
    block: {
        paddingHorizontal: scale(14),
        paddingVertical: scale(10),
        flexDirection: 'row',
        alignItems: 'center',
    },
});

class Home extends React.Component {
    state = {
        slides: [
            require('images/banners/foods.png'),
        ],
    };

    componentDidMount() {
        AppService.getSlider()
            .then(({ data }) => {
                const slides = data.data.map(slide => ({
                    uri: slide.image
                }));
                this.setState({ slides })
            })
            .catch(catchError);

       
    }

    render() {
        let { navigation } = this.props;
        const { newCategories } = this.state;
        return (
            <Container>
                <NavBar
                    variant="gradient"
                    renderLeftComponent={() => (
                        <SearchBar navigation={navigation} />
                    )}
                    renderRightComponent={() => (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <IconButton
                                color="white"
                                icon="message-square"
                                size={22}
                                style={{ paddingLeft: scale(14) }}
                                // badge={2}
                                onPress={() => navigation.navigate('Chat')}

                            />
                            <IconButton
                                color="white"
                                icon="bell"
                                size={22}
                                style={{ paddingLeft: scale(14) }}
                                // badge={8}
                                onPress={() => navigation.navigate('Notification')}
                            />
                        </View>
                    )}
                />
                <ScrollView bounces={false}>
                    <GradientBlock style={styles.block}>
                     <Text weight="medium" color="white">Popular: </Text>
                     <Popular navigation={navigation}/>
                    </GradientBlock>
                    <Carousel
                        autoplayTimeout={5}
                        images={this.state.slides}
                    />
                    <Categories
                        categories={getCategories()}
                        navigation={navigation}
                    />
                    <FlashSale navigation={navigation} />
                    <DailyDiscover navigation={navigation} />
                </ScrollView>
            </Container>
        );
    }
}

Home.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Home;
