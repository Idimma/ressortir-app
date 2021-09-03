import React from 'react';
import { Container, NavBar } from 'components';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';

const Chat = ({ navigation }) => (
  <Container backgroundColor="white">
    <NavBar
      title="Chat"
      onLeftIconPress={() => navigation.goBack()}
    />
    <WebView
      style={{
        width: '100%',
        flex: 1,
        // marginTop: scale(14)
      }}
      javaScriptCanOpenWindowsAutomatically
      javaScriptEnabled={true}
      domStorageEnabled={true}
      originWhitelist={['file://', 'https://*', '*']}
      source={ Platform.OS === 'ios' ? require('./chat.html') : { uri: "file:///android_asset/chat.html" }}
    />

    {/*<ConversationList*/}
    {/*  data={chats}*/}
    {/*  onChatPress={(id) => navigation.navigate('ChatRoom', { id })}*/}
    {/*/>*/}
  </Container>
);

Chat.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Chat;
