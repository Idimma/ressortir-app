import {
    Container,
    NavBar,
    SearchBar
} from 'components';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { setAppState, storeJsonData } from '../../utils/NavigationRef';

import { AuthContext } from '../../contexts/AuthContext';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import RecentSearches from './RecentSearches';
import TrendingSearches from './TrendingSearches';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        borderTopLeftRadius: scale(10),
        borderTopRightRadius: scale(10),
    },
});

const Search = ({ navigation }) => {
    const { searches } = useContext(AuthContext).auth
    return (
        <Container asGradient>
            <NavBar
                onLeftIconPress={() => navigation.goBack()}
                renderLeftComponent={() => (
                    <SearchBar
                        onSearch={async (value) => {
                            if (value) {
                                navigation.navigate('Category', { title: value, search: value });
                                if (!searches.includes(value)) {
                                    setAppState({ 'searches': [...searches, value] })
                                    await storeJsonData('searches', [...searches, value])
                                }
                            }
                        }}
                    />
                )}
            />
            <View style={styles.container}>
                <RecentSearches navigation={navigation} />
                <TrendingSearches navigation={navigation} />
            </View>
        </Container>
    )
};

Search.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Search;
