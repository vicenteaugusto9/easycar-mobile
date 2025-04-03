import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/home/home.jsx";
import Passanger from "./screens/passenger/passenger.jsx";
import Ride from "./screens/ride/ride.jsx";
import RideDetail from "./screens/ride-detail/ride-detail.jsx";

const Stack = createNativeStackNavigator()

export default function Routes() {
    return<NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home}
            options={{
                headerShown: false
                
            }}/>

            <Stack.Screen name="passenger" component={Passanger}
            options={{
                headerShadowVisible:false,
                headerTitle:"",
                headerTransparent:true
            }}/>
              <Stack.Screen name="ride" component={Ride}
            options={{
                headerTitleAlign:"center",
                headerTitle:"Viagens Disponiveis",
                
            }}/>
             <Stack.Screen name="ride-detail" component={RideDetail}
            options={{
                headerShadowVisible:false,
                headerTitle:"",
                headerTransparent:true
            }}/>
        </Stack.Navigator>
    </NavigationContainer>
}