import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Map from './android/screens/Map/Index';
import Home from './android/screens/Home/Index';
import Login from './android/screens/Login/Index';
import Loading from './android/screens/Loading';
import Leaderboard from './android/screens/Leaderboard/Index';

const Stack = createStackNavigator();
const config = {animation: 'timing', config: { duration:.1,},};
const transitionSpec = { open: config, close: config, };
const options = {header:()=> null, transitionSpec};

// function _Login() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Create" component={Login} options={options}/>
//     </Stack.Navigator>
//   );
// }


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={options}/>
        <Stack.Screen name="Loading" component={Loading} options={options}/>
        <Stack.Screen name="Home" component={Home} options={options}/>
        <Stack.Screen name="Map" component={Map} options={options}/>
        <Stack.Screen name="Leaderboard" component={Leaderboard} options={options}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;