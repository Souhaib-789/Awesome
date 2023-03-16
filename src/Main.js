import * as React from 'react';
import { View, Text } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawerContent from './Customdrawer';
import Hii from './screens/Hii';
import Food from './screens/Food';
import Details from './screens/Details';

const Drawer = createDrawerNavigator();

const Main = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="food"
                backBehavior="history"
                drawerContent={props => <CustomDrawerContent {...props} />} >
                <Drawer.Screen name="food" component={Food} options={{ drawerItemStyle: { display: 'none' } }} />
                <Drawer.Screen name="home" component={Hii} options={{ drawerItemStyle: { display: 'none' } }} />
                <Drawer.Screen name="details" component={Details} options={{ drawerItemStyle: { display: 'none' } }} />

            </Drawer.Navigator>
        </NavigationContainer>
    )
}
export default Main;

