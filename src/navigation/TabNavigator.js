import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from "../screens/HomeScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen"; 

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#355161", 
          },
          tabBarActiveTintColor: "#fff", 
          tabBarInactiveTintColor: "#b0b0b0", 
          headerShown: false, 
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Completed Tasks"
          component={CompletedTasksScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Icon name="check-circle" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    );
  };
  

export default TabNavigator; 
