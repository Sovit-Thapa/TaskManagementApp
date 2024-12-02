import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import useAuth from "../hooks/useAuth";

const SignupScreen = ({ navigation }) => {
  const {
    email,
    password,
    displayName,
    error,
    setEmail,
    setPassword,
    setDisplayName,
    handleSignup,
  } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Image
        source={require("../../assets/login.png")}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSignup(() => navigation.replace("Login"))}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#355161",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    width: "50%",
    height: 45,
    backgroundColor: "#355161",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  loginText: {
    color: "#355161",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default SignupScreen;
