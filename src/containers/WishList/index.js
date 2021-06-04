import React, { useContext, useState } from 'react';
import { Container, NavBar, Tabs } from 'components';
import PropTypes from 'prop-types';
import { FlatList, } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { Empty, Text } from '../../components';
import { TouchableOpacity, View } from '../../widgets';
import { isIOS } from '../../utils';

const WishList = ({ navigation }) => {
  const {
    wish,
    bookings
  } = useContext(AuthContext).auth;
  return (
    <Container backgroundColor="white">
      <NavBar
        title={'Wish List'}
        onLeftIconPress={() => navigation.goBack()}
      />
      <Tabs>
        <View style={{ flex: 1 }} label={'Basket (' + wish.length + ')'}>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={() => <Empty/>}

            data={wish}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={({ item }) => {
              return (
                <View m={10} p={14} card>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SingleWish', { wish: item })}>
                    <View row spaced>
                      <Text title fs={isIOS ? 18 : 16}> {item.title}</Text>
                    </View>
                    <Text mt={8} capitalize gray>{item.reminder.frequency} reminder
                      at {item.reminder.time}</Text>

                    <View row spaced mt={8}>
                      <Text fs={12} capitalize gray>{item.type}</Text>
                      <Text fs={12} gray>{item.created_at}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <View style={{ flex: 1 }} label={'Bookings (' + bookings.length + ')'}>
          <FlatList
            data={bookings}
            keyExtractor={(item) => item?.id?.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={() => <Empty/>}
            renderItem={({ item }) => {
              return (
                <View m={10} p={14} card>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SingleWish', { wish: item })}>
                    <View row spaced>
                      <Text title fs={isIOS ? 18 : 16}> {item.title}</Text>
                    </View>
                    <Text mt={8} capitalize gray>{item.reminder.frequency} reminder
                      at {item.reminder.time}</Text>

                    <View row spaced mt={8}>
                      <Text fs={12} capitalize gray>{item.type}</Text>
                      <Text fs={12} gray>{item.created_at}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </Tabs>
    </Container>
  );
};

WishList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default WishList;
