// screens/ChatScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChatingScreen({ route }) {
  const { user } = route.params;

  console.log("user from chating==>>" , user)
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello!', sender: 'me' },
    { id: '2', text: 'Hi! How are you?', sender: 'other' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: input, sender: 'me' }]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.headerAvatar} />
        <Text style={styles.headerName}>{user.name}</Text>
      </View>

      {/* Chat Area */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        style={styles.chatArea}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === 'me' ? styles.myMessage : styles.theirMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TouchableOpacity>
          <Icon name="happy-outline" size={26} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="camera-outline" size={26} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="image-outline" size={26} color="gray" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Icon name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007bff',
  },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  headerName: { fontSize: 18, color: '#fff', fontWeight: '600' },

  // Chat Area
  chatArea: { flex: 1, padding: 10 },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  myMessage: { backgroundColor: '#007bff', alignSelf: 'flex-end' },
  theirMessage: { backgroundColor: '#e5e5ea', alignSelf: 'flex-start' },
  messageText: { color: '#fff' },

  // Input Area
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
  },
});
