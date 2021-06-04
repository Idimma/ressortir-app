import { IconButton, Text } from 'components';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { setAppState, storeJsonData } from '../../utils/NavigationRef';

import { AuthContext } from '../../contexts/AuthContext';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
        padding: scale(14),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: scale(4),
    },
    recent: {
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

const RecentSearches = ({ navigation }) => {
    const { searches } = useContext(AuthContext).auth
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text weight="medium">Recent Searches</Text>
                <IconButton
                    icon="trash"
                    size={scale(14)}
                    color="gray50"
                    onPress={async () => {
                        setAppState({ 'searches': [] })
                      await  storeJsonData('searches', [])
                    }}
                />
            </View>
            <View style={styles.recent}>
                {searches && searches.map((text) => (
                    <TouchableOpacity
                        key={text}
                        style={styles.button}
                        onPress={() => navigation.navigate('Category', { title: text, search: text })}
                    >
                        <Text color="gray75">{text}</Text>
                    </TouchableOpacity>
                ))}
                {!searches.length && <Text italic color="gray75">No search yet</Text>}
            </View>
        </View>
    )
};

RecentSearches.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default RecentSearches;
