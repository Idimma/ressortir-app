import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, } from 'react-native';
import { BottomSheet, Card, Text, } from 'components';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from 'themes/colors';
import { getScreenHeight } from 'utils/size';
import isEmpty from 'lodash/isEmpty';
import { catchError, formatMoney, isIOS, noAction } from '../../../../utils';
import { Spinner, TextInputField, TouchableOpacity, View } from '../../../../widgets';
import axios from 'axios';
import { CartService } from '../../../../services';

const styles = StyleSheet.create({
  card: {
    padding: scale(14),
    marginBottom: scale(14),
  },

  leftContainer: {
    minWidth: scale(40),
    minHeight: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    marginHorizontal: scale(14),
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginHorizontal: scale(14),
    flex: 1,
  },
  payment: {
    marginTop: scale(14),
  },
  divider: {
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: scale(14),
    borderColor: Colors.gray25,
    borderStyle: 'dashed',
  },
  method: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue,
    borderRadius: scale(8),
    marginTop: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(14),
    backgroundColor: Colors.blueAlt,
  },
  sheet: {
    padding: scale(14),
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  select: {
    marginBottom: scale(14),
  },
});

const NDC = ({ onChange }) => {

  const sheetRef = useRef(null);
  const [selected_address, setSelectedAddress] = useState('');
  const [address, setAddress] = useState({});
  const [locations, setLocation] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [centers, setCenters] = useState([]);

  const onSelectAddress = address => {
    setAddress(address);
    onChange(address)
    // sheetRef.current.close()
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.content}>
          <Text>Pickup Center</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => sheetRef.current.open()}>
            <Text color="gray50">Pick</Text>
          </TouchableOpacity>
          <Icon
            name="chevron-right"
            color={Colors.gray25}
            size={scale(20)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.method} onPress={() => sheetRef.current.open()}>
        {isEmpty(address)
          ? <Text color="blue">Please select a pickup point</Text>
          : (
            <>
              <View flex>
                <Text fs={16} weight="medium">{address.first_name + ' ' + address.last_name}</Text>
                <Text my={10} fs={13} color="gray75">{address.address}</Text>
                <Text fs={10} color="gray75">{formatMoney(address.distance / 1609, 2)} mile(s) form
                  your address </Text>
              </View>
              <Icon
                name="check-circle"
                size={scale(20)}
                color={Colors.blue}
              />
            </>
          )}
      </TouchableOpacity>
      <BottomSheet sheetRef={sheetRef} buttonText="Confirm" height={getScreenHeight() / 1.5}>
        <View style={styles.sheet}>
          <Text title fs={isIOS ? 18 : 16} weight="medium" style={styles.select}>Enter an address nearest to you/your preferred pickup point*</Text>
          <View mb={20} >
            <TextInputField
              label="Address"
              type={'search'}
              data={locations}
              onChange={(text) => {
                if (text.length > 2) {
                  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${text}&key=AIzaSyDdHMB87WgSAdWlbEiORryX6ttcBiIwJC8`)
                    .then(({ data }) => {
                      setLocation(data.status === 'OK' ? data.results : []);
                    })
                    .catch(catchError);
                }
              }}
              onChangeText={(address, item) => {
                const _long = item.geometry.location.lng;
                const _lat = item.geometry.location.lat;
                setFetching(true);
                CartService.location(_lat, _long)
                  .then(({ data }) => {
                    setCenters(data.data);
                  })
                  .catch(noAction)
                  .finally(() => setFetching(false));
              }}
              indexName={'formatted_address'}
              initialValue={selected_address}
              value={selected_address}
            />
            <Text mb={20} title fs={isIOS? 18:16}>Available Pickup Points</Text>
            {fetching ? <Spinner/> : <View/>}
            {centers.map((_address) => <View mb={14} card>
              <TouchableOpacity
                row spaced aligned p={14}
                onPress={() => onSelectAddress(_address)}
              >
                <View flex>
                  <Text fs={16}
                        weight="medium">{_address.first_name + ' ' + _address.last_name}</Text>
                  <Text my={10} fs={13} color="gray75">{_address.address}</Text>
                  <Text fs={10} color="gray75">{formatMoney(_address.distance / 1609, 2)} mile(s)
                    form your address </Text>
                </View>
                <Icon
                  name={address?.uuid === _address.uuid  ? 'check-circle' : 'circle-outline'}
                  size={scale(20)}
                  color={address?.uuid === _address.uuid ? Colors.blue : Colors.gray50}
                />
              </TouchableOpacity>
            </View>)}

          </View>
        </View>
      </BottomSheet>
    </Card>
  );
};

export default NDC;
