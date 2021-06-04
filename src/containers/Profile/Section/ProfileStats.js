import React from 'react';
import { Text } from 'components';
import { View } from '../../../widgets';
import { formatMoney, isIOS } from '../../../utils';

const Referral = ({stats: _stats}) => {
  const stats = _stats ||{}
  return (
    <View py={20}>
      <View row spaced>
        <View r={10} flex central card mr={8}>
          <Text info bold fs={isIOS ? 16 : 13} my={6}>Total Referrals</Text>
          <Text  title fs={isIOS ? 22 : 18}  primary>{formatMoney(stats?.referrals || 0, 0)}</Text>
          <Text  >{' '}</Text>
        </View>
        <View r={10} flex central card ml={8}>
          <Text info bold fs={isIOS ? 16 : 13} my={6}>Total Earnings</Text>
          <Text  title fs={isIOS ? 22 : 18} primary>{formatMoney(stats?.all || 0, 2)}</Text>
          <Text fs={isIOS ? 15 : 13} >Agro Points</Text>

        </View>

      </View>
      <View mt={15} row spaced>
        <View r={10} flex central card mr={8}>
          <Text info bold fs={isIOS ? 16 : 13} my={6}>Referral Earnings</Text>
          <Text  title fs={isIOS ? 22 : 18}  numberOfLines={1} primary>{formatMoney(stats?.ref_earnings, 0)}</Text>
          <Text fs={isIOS ? 15 : 13} >Agro Points</Text>

        </View>
        <View r={10} flex central card ml={8}>
          <Text info bold fs={isIOS ? 16 : 13} my={6}>Network Earnings</Text>
          <Text  title fs={isIOS ? 22 : 18}  primary>{formatMoney(stats?.network_earnings, 2)}</Text>
          <Text fs={isIOS ? 15 : 13} >Agro Points</Text>
        </View>

      </View>
    </View>
  );
}

export default Referral;
