import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import useAuthState from "./src/hooks/useAuthState";

const Stack = createNativeStackNavigator();

export default function App() {
  const user = useAuthState();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ?
          (
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
          ) : (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
