import React from 'react';
import { getRandomUser } from 'mocks/users';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  Text
} from 'components';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import random from 'lodash/random';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { View } from '../../../widgets';

const styles = StyleSheet.create({
  container: {
    marginVertical: scale(14),
  },
  card: {
    padding: scale(14),
    marginBottom: scale(14),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginHorizontal: scale(14),
    flex: 1,
  },
  content: {
    marginVertical: scale(14),
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  rate: {
    marginLeft: scale(4),
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(14),
  },
  helpful: {
    marginLeft: scale(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const ReviewItem = ({
  review,
  asCard
}) => {

  // const Component = asCard ? Card : View;
  return (
    <View card my={10} p={8}>
      <View row aligned spaced>
        {/*<Avatar source={user.image} size={40} />*/}
        <View>
          <Text weight="medium" style={{ textTransform: 'capitalize' }}
                font="h2">{review.user_name}</Text>
          <Text gray py={4} style={{fontStyle: 'italic', }}>"{review.comment}"</Text>
        </View>
        <View style={styles.rating}>
          <Icon
            name="star"
            size={scale(16)}
            color={Colors.primary}
          />
          <Text
            weight="medium"
            style={styles.rate}
            color="primary"
          >
            {review.rating.toFixed(1)}
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end', }}>
        <Text italic color="gray75">{review.added}</Text>
      </View>
      {/*<View style={styles.control}>*/}
      {/*  <View style={styles.row}>*/}
      {/*    <TouchableOpacity style={styles.icon}>*/}
      {/*      <Icon*/}
      {/*        name="thumb-up-outline"*/}
      {/*        size={scale(16)}*/}
      {/*        color={Colors.gray75}*/}
      {/*      />*/}
      {/*      <Text style={styles.helpful} color="gray75">Helpful</Text>*/}
      {/*    </TouchableOpacity>*/}
      {/*    <TouchableOpacity style={styles.icon}>*/}
      {/*      <Icon*/}
      {/*        name="thumb-down-outline"*/}
      {/*        size={scale(16)}*/}
      {/*        color={Colors.gray75}*/}
      {/*      />*/}
      {/*      <Text style={styles.helpful} color="gray75">Not helpful</Text>*/}
      {/*    </TouchableOpacity>*/}
      {/*  </View>*/}
      {/*  <IconButton*/}
      {/*    icon="more-horizontal"*/}
      {/*    size={scale(16)}*/}
      {/*    color="gray75"*/}
      {/*  />*/}
      {/*</View>*/}
    </View>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
  asCard: PropTypes.bool,
};

ReviewItem.defaultProps = {
  asCard: false,
};

export default ReviewItem;
