import React, { useContext } from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { AuthContext } from '../../../contexts/AuthContext';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import { Text } from 'components';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
    },
    pill: {
        paddingHorizontal: scale(10),
        paddingVertical: scale(2),
        backgroundColor: Colors.primary,
        borderRadius: scale(20),
        marginLeft: scale(5),
    },
});

const Popular = ({ navigation }) => {

    const { auth :{categories} } = useContext(AuthContext)
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {categories && categories.map((item) => (
                <TouchableOpacity
                    style={styles.pill}
                    key={item.name}
                    onPress={() => navigation.navigate('Category', { title: item.name, id: item.id })}
                >
                    <Text color="white">{item.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
};

Popular.propTypes = {
    navigation: PropTypes.object.isRequired,
};
export default Popular;
