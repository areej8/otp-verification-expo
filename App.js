import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

import { auth } from "./firebase";

export default function App() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [verified, setVerified] = useState(false);

  const sendOTP = async () => {
    try {
      const verifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );

      const result = await signInWithPhoneNumber(
        auth,
        phone,
        verifier
      );

      setConfirmation(result);
      Alert.alert("Success", "OTP sent successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      await confirmation.confirm(otp);
      setVerified(true);
      Alert.alert("Success", "Phone number verified!");
    } catch (error) {
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Phone Verification</Text>

      {!confirmation ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="+923001234567"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <TouchableOpacity style={styles.button} onPress={sendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : !verified ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit OTP"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity style={styles.button} onPress={verifyOTP}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.success}>
          Phone number verified successfully!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 35,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#5046e5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  success: {
    color: "green",
    fontSize: 18,
    textAlign: "center",
  },
});