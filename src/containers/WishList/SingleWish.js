import React, { useEffect, useState } from 'react';
import { Container, NavBar, Card, LineItem, Text } from 'components';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, } from 'react-native';
import { Button, IconButton } from '../../components';
import { TouchableOpacity, View } from '../../widgets';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import WishMenu from './Partials/WishMenu';
import { BookingService } from '../../services';
import { catchError, loadWishList, showSuccess } from '../../utils';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeArea: {
    backgroundColor: Colors.white,
  },
  leftContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightContianer: {
    flex: 1,
  },
  icon: {
    marginRight: scale(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(4)
  },
  price: {
    padding: scale(14),
  },
  products: {
    padding: scale(14),
    marginBottom: scale(14),
  },
  scrollView: {
    paddingVertical: scale(14),
    paddingHorizontal: scale(5),
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  contentContainer: {
    padding: scale(14),
  },
  option: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(4),
    borderRadius: scale(4),
    backgroundColor: Colors.gray10,
    marginRight: scale(14),
    marginTop: scale(14),
    borderWidth: 1,
    borderColor: Colors.gray10,
  },
  selected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
});

const SingleWish = ({
  navigation,
  route
}) => {
  const { wish: _wish } = route.params;
  const [wish, setWish] = useState(_wish);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    return navigation.addListener('focus', () => {
      if (wish.type === 'wish') {
        BookingService.fetchBasketWishes(wish.uuid)
          .then(({ data }) => {
            setWish(data.basket);
            setProducts(data.wishes);
          })
          .catch(catchError);
      } else {
        BookingService.fetchBookingItems(wish.uuid)
          .then(({ data }) => {
            setProducts(data.wishes);
            setWish(data.basket);
          })
          .catch(catchError);
      }

    });
  }, [navigation]);

  return (
    <Container backgroundColor="white">
      <NavBar
        title={wish?.title}
        onLeftIconPress={() => navigation.goBack()}
        renderRightComponent={() => (
          <View row aligned>
            {/*<IconButton*/}
            {/*  icon="calendar"*/}
            {/*  size={scale(16)}*/}
            {/*  color="white"*/}
            {/*  style={styles.icon}*/}
            {/*  onPress={() => {*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<IconButton*/}
            {/*  icon="book"*/}
            {/*  size={scale(16)}*/}
            {/*  color="white"*/}
            {/*  style={styles.icon}*/}
            {/*  onPress={() => {*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<IconButton*/}
            {/*  icon="x-circle"*/}
            {/*  size={scale(16)}*/}
            {/*  color="red"*/}
            {/*  onPress={() => {*/}
            {/*  }}*/}
            {/*/>*/}
          </View>
        )}
      />

      <View p={scale(14)}>
        <ScrollView style={styles.scrollView}>
          <Card style={styles.products}>
            {products.map((product) => <LineItem product={product} key={product.id}/>)}
            {!products.length && <>
              <Text italic fs={14}>No Product found on {wish.type}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Home')} mt={scale(5)}>
                <Text bold fs={18}>Add Product</Text>
              </TouchableOpacity>
            </>
            }

          </Card>
          <Text fs={20} mb={scale(5)} mt={scale(10)} bold>Properties</Text>
          <Card style={styles.price}>
            <View style={styles.row}>
              <Text bold>Frequency</Text>
              <Text capitalize>{wish?.reminder?.frequency || 'NA'}</Text>
            </View>
            <View style={styles.row}>
              <Text bold>Time</Text>
              <Text>{wish?.reminder?.time || 'NA'}</Text>
            </View>
            <View style={styles.row}>
              <Text bold>Next</Text>
              <Text>{wish?.reminder?.next || 'NA'}</Text>
            </View>
            <View style={styles.row}>
              <Text bold>Previous</Text>
              <Text>{wish?.reminder?.previous || 'NA'}</Text>
            </View>
            <View style={styles.row}>
              <Text bold>Type</Text>
              <Text capitalize>{wish.type}</Text>
            </View>
            <View style={styles.row}>
              <Text bold>Created At</Text>
              <Text weight="italic">{wish.created_at}</Text>
            </View>
            <View style={styles.row}>
              <Text bold>Number od Products</Text>
              <Text>{products.length}</Text>
            </View>
          </Card>
        </ScrollView>

        <View>
          <WishMenu
            onChange={(selectValue, index) => {
              BookingService.setReminder(wish.uuid, selectValue.toString()
                .toLowerCase())
                .then(({ data }) => {
                  setWish(data.data);

                  showSuccess('Reminder updated successfully');
                })
                .catch(catchError);
            }}
            options={['Daily', 'Weekly', 'Monthly']}
            header={() => (<Text ml={scale(14)} mt={scale(14)} fs={16} bold>
              Select Option
            </Text>)}
            renderTouchable={({ onPress }) => (
              <Button label={'Update Reminder'} onPress={onPress}/>)}
          />
        </View>
        {wish.type === 'wish' && <View mt={20}>
          <Button
            label={'Convert to Booking'} textColor={'white'}
            variant={'solid'}
            color={'orange'} onPress={() => {
            BookingService.convertToBooking(wish.uuid)
              .then(({ data }) => {
                loadWishList();
                navigation.goBack();
                showSuccess('Converted to booking successfully');
              })
              .catch(catchError);
          }}/>
        </View>}
        <View mt={20}>
          <Button
            label={'Convert to Cart'} textColor={'white'}
            variant={'solid'}
            color={'tertiary'} onPress={() => {
            BookingService.convertToCart(wish.uuid)
              .then(({ data }) => {
                navigation.navigate('Cart');
                loadWishList();
                showSuccess('Converted Cart successfully');
              })
              .catch(catchError);
          }}/>
        </View>
        <View mt={20}>
          <Button
            label={'Delete ' + wish.type} textColor={'white'}
            variant={'solid'}
            color={'red'} onPress={() => {
            BookingService.deleteWish(wish.uuid)
              .then(({ data }) => {
                loadWishList();
                showSuccess('Deleted successfully');
                navigation.goBack();
              })
              .catch(catchError);
          }}
          />
        </View>

      </View>
    </Container>
  );
};

SingleWish.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SingleWish;
