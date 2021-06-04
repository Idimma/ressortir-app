import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Avatar } from 'components';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import { getRandomUser } from 'mocks/users';
import Icon from 'react-native-vector-icons/Feather';

const ICONS = Object.freeze({
  order: 'book',
  refund: 'arrow-down-left',
  package: 'truck',
  cancel: 'x',
  topup: 'dollar-sign',
});

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
    borderBottomWidth: 1,
    borderColor: Colors.gray10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
  },
  iconContainer: {
    backgroundColor: Colors.gray5,
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray5,
  },
  space: {
    marginHorizontal: scale(7),
  },
  unread: {
    backgroundColor: Colors.primaryBg,
  },
  unreadIcon: {
    borderColor: Colors.primary,
  },
});

const ActivityItem = ({
  title, subtitle, datetime, type, isRead,
}) => {
  const [read, setRead] = useState(isRead);
  const renderIcon = () => {
    if (type !== 'user') {
      return (
        <View style={[styles.iconContainer, !read && styles.unreadIcon]}>
          <Icon
            name={ICONS[type]}
            size={scale(20)}
            color={!read ? Colors.primary : Colors.gray50}
          />
        </View>
      );
    }
    const user = getRandomUser();
    return <Avatar source={user.image} size={50} />;
  };

  return (
    <TouchableOpacity onPress={() => setRead(!read)}>
      <View style={[styles.container, !read && styles.unread]}>
        {renderIcon()}
        <View style={styles.space} />
        <View style={styles.contentContainer}>
          <Text weight="medium">{title}</Text>
          <Text color="gray75">{subtitle}</Text>
          <Text color="gray50" font="h5">{datetime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ActivityItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isRead: PropTypes.bool.isRequired,
};

export default ActivityItem;
