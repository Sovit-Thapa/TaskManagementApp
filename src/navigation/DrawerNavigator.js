import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const UserProfile = ({ handleLogout, userData, navigation }) => {
  return (
    <View style={styles.profileContainer}>
      {userData ? (
        <>
          <Text style={styles.userName}>{userData.displayName || "No Name"}</Text>
          <Text style={styles.userEmail}>{userData.email || "No Email"}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="sign-out" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>No user data available.</Text>
      )}
    </View>
  );
};

const DrawerNavigator = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: false,
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="Home Page"
        component={TabNavigator}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
              <Icon name="bars" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerTitle: () => <Text style={{ color: "#fff" }}>Task Management App</Text>,
          headerStyle: {
            backgroundColor: "#355161",
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerTintColor: "#fff",
        })}
      />
      <Drawer.Screen
        name="UserProfile"
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
              <Icon name="bars" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerTitle: () => <Text style={{ color: "#fff" }}>User Profile</Text>,
          headerStyle: {
            backgroundColor: "#355161",
          },
          headerTitleStyle: {
            color: "#fff",
          },
          headerTintColor: "#fff",
        })}
      >
        {({ navigation }) => (
          <UserProfile userData={userData} handleLogout={handleLogout} navigation={navigation} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 18,
    color: "#777",
    marginVertical: 10,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#ff4d4d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  menuButton: {
    marginLeft: 15,
    padding: 5,
  },
});

export default DrawerNavigator;