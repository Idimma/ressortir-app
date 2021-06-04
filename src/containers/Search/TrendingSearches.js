import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import { Text } from 'components';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
        padding: scale(14),
    },
    header: {
        marginBottom: scale(4),
    },
    trending: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        backgroundColor: Colors.gray10,
        marginRight: scale(10),
        marginTop: scale(10),
        paddingHorizontal: scale(14),
        paddingVertical: scale(5),
        borderRadius: scale(4),
    },
});

const TrendingSearches = ({ navigation }) => {
    const { categories } = useContext(AuthContext).auth
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text weight="medium">Trending Searches</Text>
            </View>
            <View style={styles.trending}>
                {categories && categories.map((text) => (
                    <TouchableOpacity
                        key={text.id}
                        style={styles.button}
                        onPress={() => navigation.navigate('Category', { title: text.name, id: text.id, slug: text.slug })}
                    >
                        <Text color="gray75">{text.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
};

TrendingSearches.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default TrendingSearches;
