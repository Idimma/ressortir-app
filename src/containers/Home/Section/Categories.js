import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';

import { CategoryService } from '../../../services';
import PropTypes from 'prop-types';
import { Spinner } from '../../../widgets';
import { Text } from 'components';
import { catchError } from '../../../utils';
import { getScreenWidth } from 'utils/size';
import { setAppState } from '../../../utils/NavigationRef';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        paddingVertical: verticalScale(10),
    },
    button: {
        width: getScreenWidth() / 5,
        aspectRatio: 1 / 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: scale(40),
        height: scale(40),
        flex: 1,
    },
});

const Categories = ({categories: _categories,navigation}) => {

    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        CategoryService.getAllCategories().then(({ data }) => {
            const newCategories = []
            const native = _categories.map(ca => ca.name.toLowerCase())
            data.data.forEach(category => {
                if (native.includes(category.name.toLowerCase())) {
                    const index = native.indexOf(category.name.toLowerCase())
                    category.image = _categories[index].image
                    newCategories.push(category)
                }
            })
            setAppState({categories: data.data})
            setCategories(newCategories)
        }).catch(catchError).finally(() => {
            setIsLoading(false)
        })
    }, [navigation])
    if (isLoading) {
        return <Spinner />
    }

    return (
        <View style={styles.container}>
            {categories.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    onPress={() => navigation.navigate('Category', { title: category.name,
                         id: category.id,  slug: category.slug,  })}
                >
                    <View style={styles.button}>
                        <Image
                            source={category.image}
                            resizeMode="contain"
                            style={styles.image}
                        />
                        <Text
                            color="gray75"
                            numberOfLines={1}
                        >
                            {category.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
};

Categories.propTypes = {
    categories: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
};

export default Categories;
