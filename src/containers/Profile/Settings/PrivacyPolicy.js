import React from 'react';
import { Text, Container, NavBar } from 'components';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
  space: {
    marginTop: scale(14),
  },
});

const PrivacyPolicy = ({ navigation }) => (
  <Container>
    <NavBar
      title="Privacy Policy"
      onLeftIconPress={() => navigation.goBack()}
    />
    <ScrollView contentContainerStyle={styles.container}>
      <Text>
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

PrivacyPolicy.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PrivacyPolicy;
