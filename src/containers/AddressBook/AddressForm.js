import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, KeyboardAvoidingView, Switch, Text, TextField, } from 'components';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import { ScrollView, TextInputField, View } from '../../widgets';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserService } from '../../services';
import { catchError, showSuccess } from '../../utils';
import { setAppState } from '../../utils/NavigationRef';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
  flex: {
    flex: 1,
  },
  buttonContainer: {
    padding: scale(14),
  },
  divider: {
    marginHorizontal: scale(7),
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
});

const AddressForm = ({
  navigation,
  uuid,
  ...address
}) => {
  const [locations, setLocation] = useState([]);
  const [isDeleting, setDeleting] = useState(false);
  const refs = {};
  return (
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView contentContainerStyle={styles.container}>
        <View flex>
          <Formik
            initialValues={{
              ...address,
              set_default: address.default
            }}
            enableReinitialize
            validationSchema={Yup.object()
              .shape({
                address: Yup.string()
                  .min(3, 'Address Name too short!')
                  .required('Address is required'),
                city: Yup.string()
                  .min(3, 'City name too short')
                  .required('City is required'),
                state: Yup.string()
                  .required('State Name is required'),
                nearest_bus_stop: Yup.string()
                  .required('Bus stop is required')

              })}
            onSubmit={(values, { setSubmitting, }) => {
              setSubmitting(true);
              return UserService.updateAddress(uuid, values)
                .then(({ data }) => {
                  showSuccess('Address Updated successfully');
                  setAppState({ user: data.data });
                  navigation.goBack();
                })
                .catch((e) => {
                  setSubmitting(false);
                  catchError(e);
                });
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              values,
              errors
            }) => (
              <View flex>
                <View flex>
                  <ScrollView showsVerticalScrollIndicator={false} bounce={false}>
                    <TextInputField
                      label="Address"
                      type={'search'}
                      data={locations}
                      onChange={(text) => {
                        if (text.length > 2) {
                          axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${text}&key=AIzaSyDdHMB87WgSAdWlbEiORryX6ttcBiIwJC8`)
                            .then(({ data }) => {
                              console.log(data);
                              setLocation(data.status === 'OK' ? data.results : []);
                            })
                            .catch(catchError);
                        }
                      }}
                      onChangeText={(text, item) => {
                        setFieldValue('address', text);
                        setFieldValue('long', item.geometry.location.lng);
                        setFieldValue('lat', item.geometry.location.lat);
                      }}
                      indexName={'formatted_address'}
                      onFocus={handleBlur('address')}
                      onBlur={handleBlur('address')}
                      initialValue={values.address}
                      value={values.address}
                      errorText={errors.address}
                      refs={r => refs.address = r}
                      onSubmitEditing={handleSubmit}
                      returnKeyType={'next'}
                    />
                    <TextField
                      label="City"
                      onChangeText={handleChange('city')}
                      onBlur={handleBlur('city')}
                      value={values.city}
                      error={errors.city}
                      refs={r => refs.city = r}
                      onSubmitEditing={() => {
                        if (refs.state) {
                          refs.state.focus();
                        }
                      }}
                      returnKeyType={'next'}
                    />
                    <View row spaced>
                      <View mr={8} flex>
                        <TextField
                          label="State"
                          onChangeText={handleChange('state')}
                          onBlur={handleBlur('state')}
                          value={values.state}
                          error={errors.state}
                          refs={r => refs.state = r}
                          onSubmitEditing={() => {
                            if (refs.nearest_bus_stop) {
                              refs.nearest_bus_stop.focus();
                            }
                          }}
                          returnKeyType={'next'}
                        />
                      </View>
                      <View flex>
                        <TextField
                          label="Nearest Bus Stop"
                          onChangeText={handleChange('nearest_bus_stop')}
                          onBlur={handleBlur('nearest_bus_stop')}
                          value={values.nearest_bus_stop}
                          error={errors.nearest_bus_stop}
                          refs={r => refs.nearest_bus_stop = r}
                          onSubmitEditing={handleSubmit}
                          returnKeyType={'done'}
                        />
                      </View>
                    </View>
                    <View style={styles.switch}>
                      <Text>Set as default</Text>
                      <Switch initialValue={values.set_default} onChange={(state) => {
                        setFieldValue('set_default', state);
                      }}/>
                    </View>
                  </ScrollView>
                </View>
                <View my={20}>
                  <Button onPress={handleSubmit} isLoading={isSubmitting} label={'Update'}/>
                </View>
                <View mb={20}>
                  <Button
                    onPress={() => {
                      setDeleting(true);
                      UserService.deleteAddress(uuid)
                        .then(({ data }) => {
                          setAppState({ user: data.data });
                          showSuccess('Deleted Successfully');
                          navigation.goBack();
                        })
                        .catch((e) => {
                          catchError(e);
                          setDeleting(false);
                        });
                    }}
                    variant={'solid'}
                    textColor={'white'}
                    color={'red'}
                    isLoading={isDeleting} label={'Delete Address'}/>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

AddressForm.propTypes = {
  name: PropTypes.string,
  phoneNumber: PropTypes.string,
  street: PropTypes.string,
  city: PropTypes.string,
  postalCode: PropTypes.string,
  state: PropTypes.string,
  isDefault: PropTypes.bool,
};

AddressForm.defaultProps = {
  name: '',
  phoneNumber: '',
  street: '',
  city: '',
  postalCode: '',
  state: '',
  isDefault: false,
};

export default AddressForm;
