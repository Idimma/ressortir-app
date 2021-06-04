import React from 'react';
import { Text, Container, NavBar } from 'components';
import PropTypes from 'prop-types';
import {
  ScrollView, StyleSheet, Image, View,
} from 'react-native';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
  bannerContainer: {
    flex: 1,
    borderRadius: scale(20),
    aspectRatio: 4 / 3,
    overflow: 'hidden',
  },
  banner: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  space: {
    marginTop: scale(14),
  },
});

const AboutUs = ({ navigation }) => (
  <Container backgroundColor="white">
    <NavBar
      title="About Us"
      onLeftIconPress={() => navigation.goBack()}
    />
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.bannerContainer}>
        <Image source={require('images/banners/12.jpg')} style={styles.banner} />
      </View>
      <Text style={styles.space}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam vel libero sed nulla elementum placerat.
        Nam non neque blandit, volutpat nunc sit amet, ultrices turpis.
        In posuere, dolor eget ultricies accumsan,
        libero erat sodales lorem, id suscipit dui felis ac quam.
        Praesent pellentesque est quis risus sodales, ut fermentum arcu luctus.
        Fusce fermentum laoreet dapibus. Mauris nec nulla nulla.
        Sed gravida condimentum sapien, non pulvinar massa efficitur sit amet.
        Cras ornare placerat finibus. Sed iaculis mauris in aliquet tristique.
        Nunc mollis fermentum dui eget sagittis.
        Curabitur mollis lobortis quam, ac ultrices magna facilisis eu.
        Quisque sodales dolor eget feugiat consectetur. Maecenas eget venenatis quam.
        Aliquam dictum volutpat tristique.
      </Text>
    </ScrollView>
  </Container>
);

AboutUs.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AboutUs;
