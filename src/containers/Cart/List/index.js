import React, { useState } from 'react';
import {
  StyleSheet, Image, ActivityIndicator,
} from 'react-native';
import {
  Text, Card, Checkbox, Pill, Select,
} from 'components';
import { scale, verticalScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Colors from 'themes/colors';
import { catchError, formatMoney, Naira, refactorProductList } from '../../../utils';
import { TouchableOpacity, View } from '../../../widgets';
import { IconButton } from '../../../components';
import { CartService } from '../../../services';
import { isIOS } from '../../../utils';

const styles = StyleSheet.create({
  card: {
    padding: scale(10),
    marginBottom: verticalScale(14),
  },
  imageContainer: {
    borderRadius: scale(8),
    overflow: 'hidden',
    width: scale(80),
    aspectRatio: 1 / 1,
    marginHorizontal: scale(14),
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  flex: {
    flex: 1,
  },
  content: {
    marginTop: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: verticalScale(14),
  },
  contentHeader: {
    flexDirection: 'row',
    padding: scale(14),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray25,
  },
});

const CartCard = ({
  item,
  onRefresh
}) => {
  const product = refactorProductList(item.product);
  let _price_index = 0;
  const price_dis = product.price_distribution.filter((i, index) => {
    if (Number(i.weight) === Number(item.weight)) {
      _price_index = index;
      return i;
    }
  });

  const [price_index, setIndex] = useState(_price_index);
  const [details, setDetails] = useState(price_dis[0] || {});
  const [qty, setQty] = useState(item.quantity);
  const [isDeleting, setDelete] = useState(false);

  return (<Card style={styles.card}>
      <View row key={product.id}>
        <View style={styles.imageContainer}>
          <Image
            source={product.images[0]}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.flex}>
          <Text numberOfLines={1} fs={isIOS ? 19: 17}>{product.name}</Text>
          <View>
            <View mb={isIOS ? 8 : 4} row aligned spaced>
              <Text mt={4} fs={15}>Quantity: {qty}</Text>
              <Text mt={4}
                    fs={isIOS? 15: 13}>{details.weight || item.weight} {details.unit || product.unit}</Text>
            </View>
            <View my={4} row aligned spaced>
              <Text fs={isIOS ? (24) : 20}
                    color="primary">{Naira}{formatMoney(qty * Number(details.price || product._price))}</Text>
              <View ml={4} mt={6} >
                {isDeleting ? <ActivityIndicator /> :
                  <IconButton
                    onPress={() => {
                      setDelete(true);
                      CartService.delete(item.id)
                        .then(() => {
                          onRefresh();
                        })
                        .catch(catchError)
                        .finally(() => {
                          setDelete(false);
                        });
                    }}
                    color="red" icon="x-circle"/>}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View mb={8} row aligned spaced>
        {/*<Pill onChange={setQty} min={1} initialValue={qty}/>*/}
        {/*<Select*/}
        {/*  options={product.variants}*/}
        {/*  value={product.variants[price_index]}*/}
        {/*  optionTitle="Select options:"*/}
        {/*  onChange={(value, index) => {*/}
        {/*    setIndex(index);*/}
        {/*    setDetails(product.price_distribution[index]);*/}
        {/*  }}*/}
        {/*  renderContentHeader={() => (*/}
        {/*    <View style={styles.contentHeader}>*/}
        {/*      <View style={[styles.imageContainer, { marginLeft: 0 }]}>*/}
        {/*        <Image*/}
        {/*          source={product.images[0]}*/}
        {/*          style={styles.image}*/}
        {/*          resizeMode="cover"*/}
        {/*        />*/}
        {/*      </View>*/}
        {/*      <View>*/}
        {/*        <Text numberOfLines={1}>{product.name}</Text>*/}
        {/*        <Text flex color="primary" weight="medium" font="h2">{product.price}</Text>*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*  )}*/}
        {/*/>*/}

      </View>
    </Card>
  );
};

const CartList = ({
  carts,
  onRefresh
}) => {

  return (
    <>
      {carts.map((item, i) => {
        return (<CartCard onRefresh={onRefresh} item={item} key={i}/>);
      })}
    </>
  );
};

CartList.propTypes = {
  carts: PropTypes.array.isRequired,
};

export default CartList;
