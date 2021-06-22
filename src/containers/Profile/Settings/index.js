import React, {useContext} from 'react';
import {Avatar, Button, Container, ListItem, NavBar, Text,} from 'components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, TouchableOpacity, View,} from 'react-native';
import Colors from 'themes/colors';
import {scale} from 'react-native-size-matters';
import {AuthContext} from 'contexts/AuthContext';
import {setAppState} from '../../../utils/NavigationRef';
import {APP_IS_LOGGED_IN, APP_TOKEN, APP_LOGIN} from '../../../utils/Constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: Colors.white,
        padding: scale(14),
        borderBottomWidth: 1,
        borderColor: Colors.gray10,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        marginHorizontal: scale(14),
        flex: 1,
    },
    label: {
        padding: scale(14),
    },
    signOut: {
        paddingVertical: scale(18),
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.gray10,
        marginBottom: scale(24),
    },
});
const avatar = require('../../../../assets/images/icons/6.jpg');

const Settings = ({navigation}) => {
    const {dispatch} = useContext(AuthContext);
    const {
        auth: {
            user: profile,
        }
    } = useContext(AuthContext);
    return (
        <Container>
            <NavBar
                title="Settings"
                onLeftIconPress={() => navigation.goBack()}
            />
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.profile}>
                        <Avatar size={45} source={profile.avatar_url ? {uri: profile.avatar_url} : avatar}/>
                        <View style={styles.name}>
                            <Text font="p1" weight="medium">{profile?.name || ' '}</Text>
                            <Text>{profile.phone}</Text>
                        </View>
                        <Button
                            size="tiny"
                            label="Edit"
                            onPress={() => navigation.navigate('EditProfile')}
                        />
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.label}>
                        <Text>Account Settings</Text>
                    </View>
                    <ListItem
                        title="My Profile"
                        leftIcon="account-outline"
                        onPress={() => navigation.navigate('EditProfile')}
                    />
                    <ListItem
                        title="Password Management"
                        leftIcon="key-outline"
                        onPress={() => navigation.navigate('ChangePassword')}
                    />

                    <View style={styles.label}>
                        <Text>Support</Text>
                    </View>

                    <ListItem
                        title="About Us"
                        leftIcon="information-outline"
                        onPress={() => navigation.navigate('AboutUs')}
                    />


                    <View style={styles.label}>
                        <Text centered font="h5" color="gray50">App version 1.0.0</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.signOut}
                        onPress={async () => {
                            setAppState({isLoggedIn: false});
                            await AsyncStorage.multiRemove([APP_TOKEN, APP_IS_LOGGED_IN, APP_LOGIN, APP_DB]);
                        }}
                    >
                        <Text>Sign Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Container>
    );
};
Settings.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Settings;
