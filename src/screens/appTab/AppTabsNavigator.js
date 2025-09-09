import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatsScreen from './chats/ChatsScreen';
import FriendsScreen from './friends/FriendsScreen';
import ProfileScreen from './profile/ProfileScreen';

// Screens

const Tab = createBottomTabNavigator();

export default function AppTabsNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Chats') {
              iconName = 'chatbubbles-outline';
            } else if (route.name === 'Friends') {
              iconName = 'people-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Chats" component={ChatsScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  );
}
