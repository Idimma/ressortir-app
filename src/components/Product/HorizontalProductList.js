import { ScrollView, StyleSheet } from 'react-native';

import BasicTile from './BasicTile';
import PropTypes from 'prop-types';
import React from 'react';
import { scale } from 'react-native-size-matters';

const HorizontalProductList = ({ navigation, products, params }) => {
 
  const [productsList, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      
        ProductService.getAllProducts(page, params)
            .then(({ data }) => {
                setList(data.data.map(f => ({
                    ...f,
                    price: f.discount !== null ? `${Naira}${f.discount}` : `${Naira}${f.price}`,
                    id: f.uuid,
                    uuid: f.uuid,
                    name: f.name,
                    description: f.description,
                    beforeDiscount: f.discount ? `${Naira}${f.price}` : ' ',
                    sold: 30,
                    numberOfReviews: f.views || '0',
                    rating: f.average_rating || 0,
                    variants: f.price_distribution.map(s => `Price: ${Naira}${s.discount ? s.discount : s.price}`),
                    images: f.images.map(x => ({ uri: x.file_url })),
                })));
                setIsLoading(false);
            })
            .catch(catchError);
    }, [page]);

    if (isLoading) {
        return <Spinner />;
    }
 
 
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={products}
    >
      {productsList.map((product, index) => (
        <BasicTile
          key={product.id}
          style={StyleSheet.flatten([
            { marginRight: scale(14) },
            index === 0 && { marginLeft: scale(14) },
            index === productsList.length && { marginRight: scale(14) },
          ])}
          {...product}
          onPress={() => navigation.navigate('Product', { product })}
        />
      ))}
    </ScrollView>
  );
};

HorizontalProductList.propTypes = {
  navigation: PropTypes.object.isRequired,
  numberOfProducts: PropTypes.number,
  products: PropTypes.array,
};

HorizontalProductList.defaultProps = {
  numberOfProducts: 4,
  products: [],
  params:{},
};
export default HorizontalProductList;
