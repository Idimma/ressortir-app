import React, { useEffect, useState } from 'react';
import { getNComments } from 'mocks/comments';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'components';
import PropTypes from 'prop-types';
import ReviewItem from './ReviewItem';
import { Spinner } from '../../../widgets';
import { ProductService } from '../../../services';
import { catchError } from '../../../utils';


const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const ReviewList = ({
  id,
  navigation,
  hideHeader,
  itemAsCard
}) => {
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReview] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  useEffect(() => {
    if (page !== lastPage) {
      setLoading(true);
      ProductService.getProductReviews(id, page)
        .then(({ data }) => {
          setReview(data.data);
          setPage(data.meta.current_page);
          setLastPage(data.meta.last_page);
        })
        .catch(catchError)
        .finally(() => setLoading(false));
    }
  }, [page]);

  if (isLoading) {
    return <Spinner text="Loading Review"/>;
  }
  if (!reviews.length) {
    return <View central py={30}><Text>No review on this product yet</Text></View>;
  }
  return (
    <>
      {!hideHeader && (
        <View style={styles.title}>
          <Text title weight="medium">Ratings & reviews</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Review', { id })}>
            <Text color="gray50">View all</Text>
          </TouchableOpacity>
        </View>
      )}
      {reviews.map((review, index) => (
        <ReviewItem
          review={review}
          key={`${review.id}${index}`}
          asCard={itemAsCard}
        />
      ))}
    </>
  );
};

ReviewList.propTypes = {
  numberOfReviews: PropTypes.number,
  navigation: PropTypes.object,
  itemAsCard: PropTypes.bool,
  hideHeader: PropTypes.bool,
  // product: PropTypes.isRequired,
};

ReviewList.defaultProps = {
  numberOfReviews: 2,
  itemAsCard: false,
  hideHeader: false,
  navigation: {},
};
export default ReviewList;
