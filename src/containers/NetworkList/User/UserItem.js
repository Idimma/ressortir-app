import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Text } from 'components';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import { Spinner, TouchableOpacity, View } from '../../../widgets';
import { UserService } from '../../../services';
import { catchError } from '../../../utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.gray10,
    padding: scale(14),
  },
  content: {
    marginHorizontal: scale(14),
    flex: 1,
  },
});

function Generation(props) {
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [downline, setDownline] = useState([]);
  useEffect(() => {
    if (props.children > 0) {
      setLoading(true);
      UserService.getDescendant(props.uuid)
        .then(({ data }) => {
          setDownline(data.data);
        })
        .catch(catchError)
        .finally(() => setLoading(false));
    }
  }, []);
  const image = props.avatar_url ? { uri: props.avatar_url } : require('../../../../assets/images/icons/6.jpg');

  return <View>
    <TouchableOpacity gray onPress={() => setShow(!show)} style={styles.container}>
      <Avatar source={image} size={50}/>
      <View style={styles.content}>
        <Text weight="medium" numberOfLines={1}>{props.displayName}</Text>
        <Text color="gray75" numberOfLines={1}>{props.username}</Text>
      </View>
      <Button size="tiny" label={props.referral_code} variant="ghost"/>
    </TouchableOpacity>
    {show && <View  mx={0} py={0}>
      {isLoading ? <Spinner/> :
        <View gray  ml={15}>
          {downline.map((item, i) => <Generation2 {...item} key={i}/>)}
        </View>
      }
    </View>}
  </View>;
}

function Generation2(props) {
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [downline, setDownline] = useState([]);
  useEffect(() => {
    if (props.children > 0) {
      setLoading(true);
      UserService.getDescendant(props.uuid)
        .then(({ data }) => {
          setDownline(data.data);
        })
        .catch(catchError)
        .finally(() => setLoading(false));
    }
  }, []);
  const image = props.avatar_url ? { uri: props.avatar_url } : require('../../../../assets/images/icons/6.jpg');

  return (
    <View gray>
      <TouchableOpacity gray onPress={() => setShow(!show)} style={styles.container}>
        <Avatar source={image} size={50}/>
        <View style={styles.content}>
          <Text weight="medium" numberOfLines={1}>{props.displayName}</Text>
          <Text color="gray75" numberOfLines={1}>{props.username}</Text>
        </View>
        <Button size="tiny" label={props.referral_code} variant="ghost"/>
      </TouchableOpacity>
      {show && <View mx={0} py={0}>
        {isLoading ? <Spinner/> :
          <View ml={15}>
            {downline.map((item, i) => <Generation {...item} key={i}/>)}
          </View>
        }
      </View>}
    </View>
  );
}

const UserItem = ({ ...props }) => {
  return (
    <Generation {...props}/>
  );
};

UserItem.propTypes = {
  image: PropTypes.any.isRequired,
  username: PropTypes.string.isRequired,
};

export default UserItem;
