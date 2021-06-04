import React from 'react';
import {
  NavBar, Container, Accordion, Text,
} from 'components';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
  question: {
    marginBottom: scale(14),
  },
});

const faqs = [
  'How long does it takes to ship my orders?',
  'How can I return my items?',
  'When do I get my refund?',
  'What is the return and refund policy?',
  'How do I make payment?',
  'Are the products listed authentic?',
];
const Faq = ({ navigation }) => (
  <Container>
    <NavBar
      title="Frequently Asked Questions"
      onLeftIconPress={() => navigation.goBack()}
    />
    <ScrollView contentContainerStyle={styles.container}>
      {faqs.map((faq) => (
        <View style={styles.question} key={faq}>
          <Accordion title={faq}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nam vel libero sed nulla elementum placerat.
            </Text>
          </Accordion>
        </View>
      ))}
    </ScrollView>
  </Container>
);

Faq.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Faq;
