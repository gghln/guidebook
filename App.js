import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Pressable, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Planer from './Components/Planer';
import Homepage from './Components/Homepage';
import SearchPage from './Components/SearchPage';
import MapScreen from './Components/MapScreen';
import data from './data/data.json';

const Tab = createBottomTabNavigator()

const App = () => {
  const [plan, setPlan] = useState({})
  const [allItems, setAllItems] = useState()

  // Set state for all Items from the data
  useEffect(() => {
    setAllItems(data)
  }, [])


  return (
    <NavigationContainer>
      <StatusBar
          barStyle="dark-content" 
        />
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerStyle: {
              height:80,
            },
            headerTintColor: '#4F6D9A',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'normal' },
            tabBarStyle: {
              backgroundColor: '#fff',
              width:'70%',
              height: 60,
              marginHorizontal: 16,
              marginVertical: 24,
              borderRadius: 32,
              borderTopWidth: 0,
              elevation: 10,
              position: 'absolute',
            },
            animation: 'fade',
            // 👇 This disables all touch feedback
            tabBarButton: (props) => (
              <TouchableWithoutFeedback onPress={props.onPress}>
                <View style={{ flex: 1, alignItems:'center', alignContent:'center', paddingTop:8 }}>{props.children}</View>
              </TouchableWithoutFeedback>
            ),
            tabBarItemStyle: route.name === 'Schedule' ? {
              position: 'absolute', 
              left:'100%',
              height: 60,
              width: 70,
              marginLeft:'5%',
              borderRadius: 20,
              backgroundColor: '#4F6D9A',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
            } : {},
            tabBarLabelStyle: route.name === 'Schedule' ? {
              color:'#fff'
            } : {},
            tabBarIcon: ({ focused, color}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'Map') {
                iconName = focused ? 'map': 'map-outline';
              } else if (route.name === 'Schedule') {
                iconName = focused ? 'calendar' : 'calendar-outline';
                color = '#fff'
              }

              return <Ionicons name={iconName} size={24} color={color} />
            },
            tabBarActiveTintColor: '#4F6D9A',
            tabBarInactiveTintColor: '#c5c3c3ff',
          })}
        >
          <Tab.Screen name="Home">
            {props => <Homepage {...props} allItems={allItems} />}
          </Tab.Screen>
          <Tab.Screen name="Search">
            {props => <SearchPage {...props} allItems={allItems} />}
          </Tab.Screen>
          <Tab.Screen name="Map">
            {() => <MapScreen allItems={allItems} />}
          </Tab.Screen>


          <Tab.Screen name="Schedule">
            {props => <Planer {...props} plan={plan} setPlan={setPlan} />}
          </Tab.Screen>
        </Tab.Navigator>
    </NavigationContainer>
  )

}
export default App;