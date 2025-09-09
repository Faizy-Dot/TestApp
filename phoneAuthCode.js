import React, { useState, useEffect } from 'react';
import { Button, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';

function App() {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [user, setUser] = useState(null); // 👈 Track authenticated user

  function onAuthStateChanged(user) {
    setUser(user); // 👈 Save user in state
    if (user) {
      console.log("userr==>", user);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  async function logout() {
    try {
      await auth().signOut();
      setConfirm(null);
      setCode('');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  // 👇 Show logout if user is authenticated
  if (user) {
    return (
      <View>
        <Button title="Logout" onPress={logout} />
      </View>
    );
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+923133549863')}
      />
    );
  }

  return (
    <>
      <TextInput
        value={code}
        onChangeText={text => setCode(text)}
        placeholder="Enter OTP"
        keyboardType="number-pad"
      />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}

export default App;
