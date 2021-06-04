import { Avatar, Container, GradientBlock, IconButton, NavBar, Text } from 'components';
import { Naira, formatMoney, isIOS, loadProfile } from '../../utils';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import { AuthContext } from '../../contexts/AuthContext';
import MetaTab from './Section/MetaTab';
import MyOrders from './Section/MyOrders';
import ProfileStats from './Section/ProfileStats';
import PropTypes from 'prop-types';
import Referral from './Section/Referral';
import { View } from '../../widgets';
import { getNavBarHeight } from 'utils/size';
import random from 'lodash/random';

const avatar = require('../../../assets/images/icons/6.jpg');
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: scale(14),
  },
  container: {
    paddingHorizontal: scale(14),
    paddingTop: verticalScale(14),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginLeft: scale(14),
  },
  nameContainer: {
    marginVertical: scale(14),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});
const Profile = ({ navigation }) => {
  const [isVisible, setVisible] = useState(false);
  const {
    auth: {
      commissions,
      info,
      user,
      wish,
      network
    }
  } = useContext(AuthContext);

  useEffect(() => {
    return navigation.addListener('focus', loadProfile);
  }, [navigation]);
  const onScroll = (y) => {
    setVisible(y > getNavBarHeight());
  };

  return (
    <Container>
      <NavBar
        renderLeftComponent={() => {
          if (isVisible) {
            return (
              <View style={styles.row}>
                <Avatar
                  source={user.avatar_url ? { uri: user.avatar_url } : avatar} size={35}
                />
                <View style={styles.name}>
                  <Text color="white" weight="medium">{user?.display_name || ' '}</Text>
                  <Text color="white">{user?.username || ''}</Text>
                </View>
              </View>
            );
          }
          return null;
        }}
        renderRightComponent={() => (
          <IconButton
            icon="settings" color="white" size={22}
            onPress={() => navigation.navigate('Settings')}
          />
        )}
      />
      <ScrollView
        bounces={false}
        onScroll={({ nativeEvent: { contentOffset: { y } } }) => onScroll(y)}
        scrollEventThrottle={16}
      >
        <GradientBlock style={styles.header}>
          <View style={styles.row}>
            <Avatar source={user.avatar_url ? { uri: user.avatar_url } : avatar} size={60}/>
            <MetaTab tabs={[
              {
                name: 'Wish Basket',
                value: wish.length,
                route: 'WishList',
              },
              {
                name: 'Network',
                value: network.length,
                route: 'NetworkList',
              },
            ]} navigation={navigation}/>
          </View>

          <View style={styles.nameContainer}>
            <View>
              <Text font="h2" color="white" weight="medium">{user.display_name || ' '}</Text>
              <Text color="white">{user.username}</Text>
            </View>
            <Text white fs={14}>Ref ID: {user?.referral_code}</Text>
          </View>
        </GradientBlock>
        <View style={styles.container}>
          <MyOrders navigation={navigation}/>
          <Referral navigation={navigation}/>
          <ProfileStats stats={info} navigation={navigation}/>
          <View card py={10} mb={commissions.length ? 20 : 120} px={10}>
            <Text info bold fs={isIOS ? 18 : 15}>Commission Distribution</Text>
            {commissions.map((commission) => <View
            key={random(10000000, 99999999)}
            py={6} mt={5}>
              <View mt={4} row aligned spaced>
                <Text>{commission.name}</Text>
                <Text bold>{Naira}{formatMoney(commission.amount)}</Text>
              </View>
              <View h={2} gray>
                <View h={2} w={random(80, 99) + '%'} success/>
              </View>
            </View>)}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Profile;
