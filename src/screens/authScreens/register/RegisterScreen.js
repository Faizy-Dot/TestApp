import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import Metrix from '../../../config/Metrix';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      return Alert.alert('All fields are required');
    }

    if (!email.endsWith('@whyapp.com')) {
      return Alert.alert('Email must be a @whyapp.com address');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Passwords do not match');
    }

    try {
      const response = await axios.post('http://192.168.1.100:5000/auth/register', {
        username,
        email,
        password,
      });

      console.log("response==>>", response)

      if (response.status === 201) {
        Alert.alert('Registration Successful', `Welcome ${username}!`);
        // Optionally, navigate to Login screen here
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.log('Registration error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    }
  };

  console.log(username)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Name */}
      <View style={styles.inputContainer}>
        <Icon name="account" size={Metrix.FontLarge} color="#aaa" />
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Icon name="email" size={Metrix.FontLarge} color="#aaa" />
        <TextInput
          placeholder="Email (@gmail.com)"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={Metrix.FontLarge} color="#aaa" />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock-check" size={Metrix.FontLarge} color="#aaa" />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
          <TouchableOpacity onPress={() => setShowConfirmPassword(prev => !prev)}>
    <Icon
      name={showConfirmPassword ? 'eye' : 'eye-off'}
      size={20}
      color="#aaa"
    />
  </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
