import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import App from "./App";
import Home from "./Home";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          //   headerStyle: {
          //    backgroundColor:'red',

          //   },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          options={{
            title: "Tic Tac Toe",
            headerStyle: {
              // backgroundColor: "#f4511e",
              backgroundColor: "#be975b",
              // borderBottomColor:'white'
            },
            // headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              color: "white",
              fontSize: 25,
            },
          }}
          name="Tic Tac Toe"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
