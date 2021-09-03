import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import Text from '../Text';
import BottomSheet from '../Layout/BottomSheet';
import { IconButton } from '../Touchable';
import { TextInputField, TouchableOpacity, View } from '../../widgets';
import { AuthContext } from '../../contexts/AuthContext';
import { BookingService } from '../../services';
import { catchError, showSuccess } from '../../utils';
import { setAppState } from '../../utils/NavigationRef';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray5,
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
    borderRadius: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(5),
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

const Option = ({
  label,
  value,
  onPress,
  option
}) => {
  const isSelected = label === value;
  return (
    <View
      row aligned spaced
      style={StyleSheet.flatten([
        styles.option,
        isSelected && styles.selected,
      ])}
    >
      <TouchableOpacity
        onPress={() => onPress(option)}
      >
        <Text color={isSelected ? 'primary' : 'gray100'}>{label}</Text>
      </TouchableOpacity>
      <IconButton
        icon="x-circle"
        size={scale(16)}
        color="gray50"
        style={{ marginLeft: 10 }}
        onPress={() => {
          BookingService.deleteWish(option.id)
            .then(() => {
              BookingService.fetchWish()
                .then(({ data }) => {
                  setAppState({ wish: data.data });
                })
                .catch(catchError);
            })
            .catch(catchError);
        }}/>
    </View>
  );
};

const WishForm = ({
  basket,
  renderTouchable,
}) => {
  const { wish } = useContext(AuthContext).auth;
  const sheetRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState({});
  const [index, setIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [title_error, setTitleError] = useState('');
  useEffect(() => {
    BookingService.fetchWish()
      .then(({ data }) => {
        setAppState({ wish: data.data });
      })
      .catch(catchError);
  }, []);
  return (
    <>
      {renderTouchable && renderTouchable({
        onPress: () => sheetRef.current.open(),
        value: selectedValue,
      })}
      {!renderTouchable && (
        <IconButton
          icon="heart"
          size={scale(16)}
          text="SAVE"
          color="gray50"
          style={styles.icon}
          onPress={() => sheetRef.current.open()}/>
      )}
      <BottomSheet sheetRef={sheetRef} onPress={() => {
        BookingService.addWishToBasket(selectedValue.id, basket)
          .then(({ data }) => {
            showSuccess('Wish added successfully.')
          }).catch(catchError);
      }}
                   buttonText="Confirm">
        <View h={'85%'}>
          <View pt={scale(14)} px={scale(14)}>
            <Text fs={16} bold>Add New Wish</Text>
            <View row pt={20}>
              <View flex>
                <TextInputField
                  mb={0}
                  label="Title"
                  placeholder="New Title"
                  onChangeText={(e) => {
                    setTitle(e);
                    if (title_error.length) {
                      setTitleError('');
                    }
                  }}
                  value={title}
                  errorText={title_error}
                  returnKeyType={'done'}
                />
              </View>
              <View ml={20} mt={16}>
                {
                  isLoading ? <ActivityIndicator color={colors.primary}/> :
                    <IconButton
                      icon="plus"
                      size={scale(16)}
                      color="gray50"
                      onPress={() => {
                        if (title.length <= 3) {
                          return setTitleError('Title cannot be less than 3 characters');
                        }
                        if (!isLoading) {
                          BookingService.createWish(title)
                            .then(({ data }) => {
                              const new_wish = [data.data, ...wish];
                              setTitle('');
                              setAppState({ wish: new_wish });
                            })
                            .catch(catchError);
                        }
                      }}
                      style={styles.icon}/>
                }
              </View>
            </View>
          </View>
          <View flex >
            <Text ml={scale(14)} mt={scale(14)} fs={16} bold>Add to previous wish</Text>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={styles.content}>
                {wish.map((option, i) => (
                  <Option
                    key={option.id}
                    label={option.title}
                    option={option}
                    value={selectedValue.title || null}
                    onPress={(v) => {
                      setSelectedValue(v);
                      setIndex(i);
                    }}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};


export default WishForm;
