import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import axiosInstance from '../../../config/axios';

export default function RequestsScreen() {
  const [activeTab, setActiveTab] = useState("requests"); // "requests" | "sent"
  const [requests, setRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const [incomingRes, sentRes] = await Promise.all([
        axiosInstance.get("/friendRequest/incoming"),
        axiosInstance.get("/friendRequest/sent"),
      ]);

      setRequests(incomingRes.data.requests || []);
      setSentRequests(sentRes.data.sentRequests || []);
    } catch (error) {
      console.log("Error fetching requests:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "requests" && styles.activeTab]}
          onPress={() => setActiveTab("requests")}
        >
          <Text style={styles.tabText}>Requests</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "sent" && styles.activeTab]}
          onPress={() => setActiveTab("sent")}
        >
          <Text style={styles.tabText}>Sent Requests</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {loading ? (
        <Text>Loading...</Text>
      ) : activeTab === "requests" ? (
        <FlatList
          data={requests}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No incoming requests</Text>}
        />
      ) : (
        <FlatList
          data={sentRequests}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No sent requests</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "blue",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
});
