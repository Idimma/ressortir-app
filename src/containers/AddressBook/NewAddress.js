import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, NavBar, } from 'components';
import PropTypes from 'prop-types';
import { AuthContext } from '../../contexts/AuthContext';
import { ScrollView, TextInputField, View } from '../../widgets';
import { Formik } from 'formik';
import { catchError, showSuccess } from '../../utils';
import * as Yup from 'yup';
import { UserService } from '../../services';
import { setAppState } from '../../utils/NavigationRef';
import { Button, KeyboardAvoidingView, Switch, Text, TextField } from '../../components';
import axios from 'axios';

const styles = StyleSheet.create({
  outer: {
    backgroundColor: 'white',
  },
});

const NewAddress = ({ navigation, route }) => {
  const { initialValues } = route?.params;
  const {
    auth: {
      user: profile,
    }
  } = useContext(AuthContext);
  const address = { address: '', };
  const refs = {};
  const [locations, setLocation] = useState([]);
  return (
    <Container
      style={styles.outer}
    >
      <NavBar
        title="New Address"
        onLeftIconPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView contentContainerStyle={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} bounce={false}>
          <View p={20} flex>
            <Formik
              initialValues={{
                ...profile, ...address,
                set_default: false
              }}
              enableReinitialize
              validationSchema={Yup.object()
                .shape({
                  last_name: Yup.string()
                    .min(3, 'Last Name too short!')
                    .required('Last Name is required'),
                  first_name: Yup.string()
                    .min(3, 'First Name too short!')
                    .required('First name is required'),
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
                UserService.addAddress(values)
                  .then(({ data }) => {
                    showSuccess('Profile Updated successfully');
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
                setFieldTouched,
                values,
                errors
              }) => (
                <>

                  <TextField
                    label="First Name"
                    onChangeText={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    value={values.first_name}
                    error={errors.first_name}
                    onSubmitEditing={() => {
                      if (refs.last_name) {
                        refs.last_name.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />
                  <TextField
                    label="Last Name"
                    onChangeText={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                    value={values.last_name}
                    error={errors.last_name}
                    refs={r => refs.last_name = r}
                    onSubmitEditing={() => {
                      if (refs.email) {
                        refs.email.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />

                  {/*<TextField*/}
                  {/*  label="Display Name"*/}
                  {/*  onChangeText={handleChange('display_name')}*/}
                  {/*  onBlur={handleBlur('display_name')}*/}
                  {/*  value={values.display_name}*/}
                  {/*  error={errors.display_name}*/}
                  {/*  refs={r => refs.display_name = r}*/}
                  {/*  onSubmitEditing={() => {*/}
                  {/*    if (refs.phone) {*/}
                  {/*      refs.phone.focus();*/}
                  {/*    }*/}
                  {/*  }}*/}
                  {/*  returnKeyType={'next'}*/}
                  {/*/>*/}
                  <TextField
                    label="Email"
                    // disabled
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType={'email-address'}
                    error={errors.email}
                    refs={r => refs.email = r}
                    onSubmitEditing={() => {
                      if (refs.phone) {
                        refs.phone.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />
                  <TextField
                    label="Phone number"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    keyboardType={'phone-pad'}
                    error={errors.phone}
                    refs={r => refs.phone = r}
                    onSubmitEditing={() => {
                      if (refs.city) {
                        refs.city.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />
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
                  <View >
                    <View flex>
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
                    </View>
                    <View  flex>
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
                  <View row spaced aligned>
                    <Text>Set as default</Text>
                    <Switch initialValue={false} onChange={(state) => {
                      setFieldValue('set_default', state);
                    }}/>
                  </View>
                  <View my={20}>
                    <Button onPress={handleSubmit} isLoading={isSubmitting} label={'Add Address'} />
                  </View>
                </>)}
            </Formik>
            </View>

          </ScrollView>
      </KeyboardAvoidingView>

    </Container>
  );
};

NewAddress.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default NewAddress;
