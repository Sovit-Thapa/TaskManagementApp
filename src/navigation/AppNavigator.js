import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen"; 

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen} />
    </Stack.Navigator>
);

export default AppNavigator;
