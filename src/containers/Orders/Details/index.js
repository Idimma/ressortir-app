import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Linking, ScrollView, StyleSheet, View, } from 'react-native';
import {
  Card,
  Container,
  LineItem,
  NavBar,
  Tabs,
  Text,
  Timeline,
  TimelineBlock,
} from 'components';
import { scale } from 'react-native-size-matters';
import ShippingBlock from './Block/Shipping';
import OrderBlock from './Block/Order';
import CompletedBlock from './Block/Completed';
import { format } from 'date-fns';
import { catchError, formatMoney, isIOS, Naira, parseEmailOrPhone } from '../../../utils';

const order = {
  'id': 102,
  'uuid': '93178e63-8ab1-4d4a-bb10-db42976d0640',
  'user_id': 11,
  'user': {
    'id': 11,
    'uuid': '92d539d8-eb33-4a35-a513-40151601f79d',
    'first_name': 'Adebowale',
    'last_name': 'Akinfaderin',
    'display_name': 'Pampam2',
    'email': 'ritan360tech@gmail.com',
    'phone': '2348063436073',
    'email_verified_at': '2021-02-27T16:56:55.000000Z',
    'date_of_birth': null,
    'ip': '102.68.109.33',
    'last_login': '2021-04-25T19:43:36.000000Z',
    'deleted_at': null,
    'created_at': '2021-02-27T16:56:02.000000Z',
    'updated_at': '2021-04-25T19:43:36.000000Z',
    'final_verified_at': '2021-02-27T17:02:50.000000Z',
    'avatar_url': 'https://agroinnovate.fra1.digitaloceanspaces.com/assets/accounts/avatar/92d539d8_eb33_4a35_a513_40151601f79d_1617295982.png',
    'blocked': false,
    'avatar_path': 'assets/accounts/avatar/92d539d8_eb33_4a35_a513_40151601f79d_1617295982.png',
    'referral_code': 'AIG7778DFE',
    'parent_id': null,
    'username': 'pampam',
    'next_of_kin': {
      'name': 'Adebowale Akinfaderin',
      'phone': '08063436073',
      'email': 'ritan360tech@gmail.com',
      'address': '32 Kings Avenue, Ojodu, Nigeria',
      'city': 'Ojodu',
      'lga': 'Ifo',
      'state': 'Ogun State',
      'lat': 6.6540206,
      'long': 3.3627521
    },
    'delivery_address': [
      {
        'first_name': 'Prince',
        'last_name': 'Wale',
        'email': 'ritan360tech@gmail.com',
        'phone': '2348063436073',
        'address': '32 Kings Avenue, Ojodu, Nigeria',
        'nearest_bus_stop': 'Berger',
        'city': 'Ojodu',
        'state': 'Ogun State',
        'lat': 6.6540206,
        'long': 3.3627521,
        'default': false,
        'uuid': '92d53f5f-1ad0-4596-be47-3ba99e7c7be9'
      },
      {
        'first_name': 'AKINFADERIN',
        'last_name': 'ADEBOWALE',
        'phone': '2348063436073',
        'email': 'ritan360tech@gmail.com',
        'address': '32 Kings Avenue, Ojodu, Nigeria',
        'nearest_bus_stop': '',
        'city': 'Ojodu',
        'state': 'Ogun State',
        'lat': 6.6540206,
        'long': 3.3627521,
        'default': false,
        'uuid': '92e7bc0a-f2e7-4e10-94f6-dd0f53f24001'
      },
      {
        'first_name': 'Prince',
        'last_name': 'Wale',
        'email': 'ritan360tech@gmail.com',
        'phone': '2348069517490',
        'address': '5A Kudirat Abiola Way, Oregun, Ikeja, Lagos, Nigeria',
        'nearest_bus_stop': null,
        'city': 'Oregun',
        'state': 'Lagos',
        'lat': 6.6096625,
        'long': 3.3536969,
        'default': false,
        'uuid': '92f12ab9-0767-4159-93d0-be4656ee1ad0'
      },
      {
        'first_name': 'Adebowale',
        'last_name': 'Akinfaderin',
        'phone': '2348063436073',
        'email': 'ritan360tech@gmail.com',
        'address': '14 Ibironke Crescent, Lagos, Nigeria',
        'nearest_bus_stop': '',
        'city': 'Anthony',
        'state': 'Lagos',
        'lat': 6.5674827,
        'long': 3.3744242,
        'default': false,
        'uuid': '92f51e86-a438-4b3d-a097-fb246c679595'
      },
      {
        'first_name': 'Adebowale',
        'last_name': 'Akinfaderin',
        'phone': '2348063436073',
        'email': 'ritan360tech@gmail.com',
        'address': 'Kings Avenue, Ojodu, Nigeria',
        'nearest_bus_stop': '',
        'city': 'Ojodu',
        'state': 'Ogun State',
        'lat': 6.6539826,
        'long': 3.3656807,
        'default': true,
        'uuid': '92fd6c71-b9f3-4b9c-9f00-2c0bc571fe51'
      }
    ],
    'invited_by': null,
    'receive_commissions': true,
    'collected_level_bonus': 0,
    'preference': null
  },
  'total_price': 12250,
  'status': 3,
  'status_readable': 'delivered',
  'pended_at': 1617293824,
  'processed_at': 1617293908,
  'in_transit_at': 1617293953,
  'delivered_at': 1617293997,
  'rejected_at': null,
  'flagged_at': null,
  'payment': 1,
  'payment_type': 'card',
  'payment_readable': 'paid',
  'promo_code': null,
  'promo_value': 0,
  'promo_type': null,
  'items': [
    {
      'id': 120,
      'uuid': '93178e63-8d47-4b09-a916-a1a94a2f636f',
      'order_id': 102,
      'product_id': 21,
      'product': {
        'id': 21,
        'uuid': '92f4a5b0-796f-4b91-ae59-9f049c6dc244',
        'name': 'White Crayfish',
        'description': '<p>White Crayfish: Crayfish is very popular with its great taste and its essential vitamins and minerals. Cooked crayfish contains the abundant amount of vitamin B, copper, selenium, protein, iron, zinc, and amino acids. Hence, as crayfish is packed with essential vitamins and minerals, it will be beneficial to promote the overall body health. It promotes healthy skin, cures inflammation, promotes healthy joints, promotes eyes health, boosts energy levels, and so many more.</p>',
        'price': 2500,
        'discount': 2450,
        'unit': 'Derica',
        'weight': '1.00',
        'featured_image_id': 237,
        'featured_image': {
          'id': 237,
          'uuid': '92f4a59a-46a6-49ec-8254-3c9cd4fa2f1e',
          'thumbnail_url': 'https://agroinnovate.fra1.digitaloceanspaces.com/assets/gallery/images/thumbnails/green-eagles-agribusiness-solutions-farm2table-cheap-and-easy-food-items-771615794479.png',
          'thumbnail_path': 'assets/gallery/images/thumbnails/green-eagles-agribusiness-solutions-farm2table-cheap-and-easy-food-items-771615794479.png',
          'file_url': 'https://agroinnovate.fra1.digitaloceanspaces.com/assets/gallery/images/green-eagles-agribusiness-solutions-farm2table-cheap-and-easy-food-items-771615794479.png',
          'file_path': 'assets/gallery/images/green-eagles-agribusiness-solutions-farm2table-cheap-and-easy-food-items-771615794479.png',
          'filename': 'Green-Eagles-Agribusiness-Solutions-Farm2Table-cheap-and-easy-food-items-77.png',
          'description': '',
          'aggregator_id': null,
          'meta_data': {
            'name': 'Green-Eagles-Agribusiness-Solutions-Farm2Table-cheap-and-easy-food-items-77.png',
            'size': 218712,
            'readable_size': '213.59kB',
            'type': 'image/png'
          },
          'created_at': '2021-03-15T07:48:00.000000Z',
          'updated_at': '2021-03-15T07:48:00.000000Z'
        },
        'images': [
          {
            'id': 237,
            'uuid': '92f4a59a-46a6-49ec-8254-3c9cd4fa2f1e',
            'thumbnail_url': 'https://agroinnovate.fra1.digitaloceanspaces.com/assets/gallery/images/thumbnails/green-eagles-agribusiness-solutions-farm2table-cheap-and-easy-food-items-771615794479.png',
            'thumbnail_path': 'assets/gallery/images/thumbnails/green-eagles-agribusiness-solutions-farm2table-cheap-and-easy-food-items-771615794479.png',
            'file_url': 'https://agroinnovate.fra1.digitaloceanspaces.com/assets/gallery/images/green-eagles-agribusiness-solutions-farm2table-cheap-and-easy-food-items-771615794479.png',
            'file_path': 'assets/gallery/images/green-eagles-agribusiness-solutions-farm2table-cheap-and-easy-food-items-771615794479.png',
            'filename': 'Green-Eagles-Agribusiness-Solutions-Farm2Table-cheap-and-easy-food-items-77.png',
            'description': '',
            'aggregator_id': null,
            'meta_data': {
              'name': 'Green-Eagles-Agribusiness-Solutions-Farm2Table-cheap-and-easy-food-items-77.png',
              'size': 218712,
              'readable_size': '213.59kB',
              'type': 'image/png'
            },
            'created_at': '2021-03-15T07:48:00.000000Z',
            'updated_at': '2021-03-15T07:48:00.000000Z',
            'pivot': {
              'product_id': 21,
              'image_id': 237
            }
          }
        ],
        'sku': 'e72aabdea64494',
        'status': 1,
        'status_readable': 'active',
        'stock_status': 1,
        'featured': false,
        'categories': [
          {
            'id': 20,
            'uuid': '92f4a6c9-a2c1-4bef-a9c9-0085a70d0ed7',
            'name': 'Seafood',
            'description': 'seafood',
            'type': 'public',
            'image_id': 250,
            'status': 1,
            'deleted_at': null,
            'created_at': '2021-03-15T07:51:19.000000Z',
            'updated_at': '2021-03-28T16:13:28.000000Z',
            'min_amount': '2500.00',
            'max_amount': '2500.00',
            'slug': 'seafood',
            'pivot': {
              'product_id': 21,
              'category_id': 20
            }
          }
        ],
        'price_distribution': [
          {
            'price': 2500,
            'discount': 2450,
            'profit': 0,
            'unit': 'Derica',
            'weight': '1.00'
          }
        ],
        'views': 18,
        'average_rating': 0,
        'slug': 'white-crayfish',
        'metadata': [],
        'created_at': '03/15/2021 07:48 AM',
        'updated_at': '03/24/2021 09:08 PM'
      },
      'user': {
        'uuid': '92d539d8-eb33-4a35-a513-40151601f79d',
        'first_name': 'Adebowale',
        'last_name': 'Akinfaderin'
      },
      'distributor': {
        'uuid': '931156eb-35aa-44ac-9ca0-d7e3e03b1a99',
        'first_name': 'Zika',
        'last_name': 'Uche'
      },
      'distributor_id': 8,
      'price': 2500,
      'discount': 2450,
      'quantity': 5,
      'status': 3,
      'weight': 1,
      'unit': 'Derica',
      'status_readable': 'delivered',
      'pended_at': 1617293825,
      'processed_at': 1617293909,
      'in_transit_at': 1617293955,
      'delivered_at': 1617293997,
      'rejected_at': null,
      'flagged_at': null,
      'created_at': '04/01/2021 04:17 PM',
      'updated_at': '04/01/2021 04:19 PM'
    }
  ],
  'distributor_id': 8,
  'distributor': {
    'first_name': 'Zika',
    'last_name': 'Uche',
    'phone': '2348069517490',
    'email': 'hello@adebowalepro.com'
  },
  'delivery_fee': 0,
  'delivery_address': [],
  'delivery': false,
  'pickup_address': {
    'address': '5 Moshood Olugbani Street, Lagos, Nigeria',
    'state': 'Lagos',
    'city': 'Victoria Island',
    'lga': 'Eti Osa',
    'lat': '6.4279089',
    'long': '3.4383056'
  },
  'pickup': true,
  'delivery_code': '6146',
  'created_at': '04/01/2021 04:17 PM',
  'updated_at': '04/01/2021 04:19 PM'
};

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    padding: scale(14),
  },
  products: {
    padding: scale(14),
    marginBottom: scale(14),
  },
  scrollView: {
    padding: scale(14),
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
});

const OrderDetails = ({navigation, route}) => {
  const order = route.params.order;
  console.log(order)
  // const products = order.items;


  const openTel = async (tel) => {
    const url = 'tel:/+' + parseEmailOrPhone(tel);
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url).catch(catchError);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }).catch(catchError);
  }

  return (
    <Container>
      <NavBar
        title={`Order #${order.order_no} Tracking`}
        onLeftIconPress={() => navigation.goBack()}
      />

        <ScrollView label="Tracking" contentContainerStyle={styles.container}>
          <Timeline currentIndex={4}>
            {/*['pending', processing transit delivered]*/}
            <TimelineBlock
              icon="package"
              title="Request Created"
              subtitle={order.created_at}
            >
              <OrderBlock
                icon={'navigation'} subtitle={'ORDER No.'}
                value={'#'+order.order_no} title={'Order No. generated'}
                id={'#' + order.order_no}/>
            </TimelineBlock>


            {order.pended_at && <TimelineBlock
              icon="package"
              title="Payment received"
              subtitle={format(order.pended_at * 1000, 'dd, MMMM Y, HH:mm')}
            >
              <OrderBlock
                value={order.payment_type} title={'Payment Method'} icon={'navigation'}
                subtitle={'Type'}
              />
            </TimelineBlock>}
            {order.processed_at &&   <TimelineBlock
              icon="package"
              title="Order Processing"
              subtitle={format(order.processed_at * 1000, 'dd, MMMM Y, HH:mm')}
            >
              <OrderBlock
                // onPress={() => }
                value={
                  <Text numberOfLines={3} fs={isIOS ?14 :12}>
                    Name: {order?.distributor?.first_name + ' ' + order?.distributor?.last_name}{'\n'}
                    <Text primary onPress={() => openTel(order?.distributor?.phone)}>Phone: {order?.distributor?.phone}{'\n'}</Text>
                    Email: {order?.distributor?.email}
                  </Text>
                }
                title={'NDC'}
                icon={'map-pin'}
                subtitle={'Delivery Agent'}
              />
            </TimelineBlock> }
            {order.in_transit_at &&   <TimelineBlock
              icon="truck"
              title="Order in transit"
              subtitle={format(order.in_transit_at * 1000, 'dd, MMMM Y, HH:mm')}
            >
              <ShippingBlock order={order}/>
            </TimelineBlock>}
            {order.delivered_at &&  <TimelineBlock
              icon="check"
              hideTrack
              title="Order successfully delivered"
              subtitle={format(order.delivered_at * 1000, 'dd, MMMM Y, HH:mm')}
            >
              <CompletedBlock navigation={navigation}/>
            </TimelineBlock> }
          </Timeline>
        </ScrollView>
    </Container>
  );
};
OrderDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default OrderDetails;
