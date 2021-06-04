import {
    Container,
    NavBar,
    ProductList
} from 'components';
import React, { useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import { isNull } from '../../utils';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: scale(10),
        borderTopRightRadius: scale(10),
        flex: 1,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controls: {
        flexDirection: 'row',
        paddingHorizontal: scale(14),
        justifyContent: 'space-between',
        paddingVertical: scale(14),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.gray25,
    },
    divider: {
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.gray25,
    },
    filter: {
        marginLeft: scale(5),
    },
});

const Category = ({ navigation, route }) => {
    const { title, id, search } = route.params;
    const [display, setDisplay] = useState('grid');
    let params = { 'category': id, };
    if(!isNull(search)){
        params = { 'q': search, };
    }
    return (
        <Container backgroundColor="primary" asGradient>
            <NavBar
                title={title}
                onLeftIconPress={() => navigation.goBack()}
            // renderRightComponent={() => <Filter />}
            />
            <View style={styles.container}>
                <ProductList
                    params={params}
                    navigation={navigation}
                     variant={display} />
            </View>

        </Container>
    );
};

Category.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

export default Category;
