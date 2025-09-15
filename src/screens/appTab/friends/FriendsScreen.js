import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import axiosInstance from '../../../config/axios';
import { useSelector } from 'react-redux';

const sampleFriends = [
  {
    id: '1',
    name: 'Michael Jordan',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    isFriend: false,
  },
  {
    id: '2',
    name: 'Emma Watson',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    isFriend: true,
  },
  {
    id: '3',
    name: 'Chris Evans',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    isFriend: false,
  },
];

export default function FriendsScreen() {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState(sampleFriends);

  const { user, token } = useSelector(state => state.login)

  const handleAddFriend = (id) => {
    setFriends(prev =>
      prev.map(friend =>
        friend.id === id ? { ...friend, isFriend: !friend.isFriend } : friend
      )
    );
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );


  const allUsers = async () => {
    try {
      const response = await axiosInstance.get("/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Users =>", response.data.users);
      return response.data.users;
    } catch (error) {
      console.log("Error fetching users:", error.response?.data || error);
    }
  }

  useEffect(() => {
    allUsers()
  }, [])

  const renderFriendItem = ({ item }) => (
    <View style={styles.friendItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
      <TouchableOpacity
        style={[styles.addButton, item.isFriend && styles.addedButton]}
        onPress={() => handleAddFriend(item.id)}
      >
        <Text style={styles.addButtonText}>
          {item.isFriend ? 'Added' : 'Add Friend'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search friends"
        value={search}
        onChangeText={setSearch}
      />

      {/* Friends List */}
      <FlatList
        data={filteredFriends}
        keyExtractor={item => item.id}
        renderItem={renderFriendItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchInput: {
    backgroundColor: '#f1f1f1',
    margin: 10,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  listContainer: { paddingHorizontal: 10 },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  name: { flex: 1, fontSize: 16, fontWeight: '500' },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addedButton: {
    backgroundColor: 'gray',
  },
  addButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
