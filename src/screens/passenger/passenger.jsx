import {
  ActivityIndicator,
  Alert,
  ImageComponent,
  Text,
  TextInput,
  View,
} from "react-native";
import MyButton from "../../components/mybutton/mybutton.jsx";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import { styles } from "./passenger.style.js";
import { useEffect, useState } from "react";
import icons from "../../constants/icons.js";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";

function Passanger(props) {

  const userId = 1;
  const [mylocation, setMylocation] = useState({});
  const [status,setStatus] =useState("") 
  const [title, setTitle] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [rideId,setRideId] = useState("0")
  const [driverName,setDriverName] = useState("")

  async function RequestRideFromUser() {

/*
    const response = {ride_id: 1,
        passenger_user_id: 1,
        passenger_name: "Heber Stein Mazutti",
        passenger_phone: "(11) 99999-9999",
        pickup_address: "Av. Paulista, 1500 - Jardim Paulista",
        pickup_date: "2025-02-17",
        dropoff_address: "Shopping Morumbi",
        status: "P",
        driver_user_id: null,
        driver_name: null,
        pickup_latitude: "-23.561747",
        pickup_longitude: "-46.656244"};
*/

    const response ={
        ride_id: 2,
        passenger_user_id: 3,
        passenger_name: "João da Silva",
        passenger_phone: "(11) 99999-9999",
        pickup_address: "Av. Ipiranga, 123 - Centro",
        pickup_date: "2025-02-16",
        dropoff_address: "MASP",
        status: "A",
        driver_user_id: 4,
        driver_name: "Fernando Assis",
        pickup_latitude: "-23.561747",
        pickup_longitude: "-46.656244",
        driver_phone: "(85)9 9659-5927"
    }
    return response;
  }

  async function RequestPermissonAndGetLocation() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted == true) {
      const currentPosition = await getCurrentPositionAsync();

      if (currentPosition.coords) {
        return currentPosition.coords;
      } else {
        return {};
      }
    } else {
      return {};
    }
  }

  async function RequestAddressName(lat, long) {
    const response = await reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });

    if (
      response[0].street &&
      response[0].streetNumber &&
      response[0].district
    ) {
      setPickupAddress(
        response[0].street +
          "," +
          response[0].streetNumber +
          "-" +
          response[0].district
      );
    }
  }

  async function LoadScreen() {
    const response = await RequestRideFromUser();

    if (!response.ride_id) {
      // const location = {latitude: -23.561747, longitude: -46.65624}
      const location = await RequestPermissonAndGetLocation();
      if (location.latitude) {
        setTitle("Encontre  Sua Carona ");
        setMylocation(location);
        RequestAddressName(location.latitude, location.longitude);
      } else {
        Alert.alert("Não foi possivel obter sua localização!!");
      }
    } else {
        setTitle(response.status == "P"? "Aguardando uma carona" : "Carona confirmada")
        setMylocation({
            latitude:response.pickup_latitude,
            longitude:response.pickup_longitude
        })
       setPickupAddress(response.pickup_address)
       setDropoffAddress(response.dropoff_address) 
       setStatus(response.status)
       setRideId(response.ride_id)
       setDriverName(response.driver_name + " -" + response.driver_phone)
    
    }
  }

  async function AskForRide() {
    const json ={ 
        Passanger_id: userId,
        pickup_address:pickupAddress,
        dropoff_address:dropoffAddress,
        pickup_latitude:mylocation.latitude,
        pickup_longitude:mylocation.longitude,

    }

    console.log(json)
     props.navigation.goBack()
  }

  async function CancelRide() {
    const json ={
        passenger_user_id:userId,
        ride_id:rideId
    }
    console.log("Cancelar carona", json)
    props.navigation.goBack()
  }
  async function FinishRide() {
    
    const json ={
        passenger_user_id:userId,
        ride_id:rideId
    }
    console.log("Finalizar carona", json)
    props.navigation.goBack()
  }

  useEffect(() => {
    LoadScreen();
  }, []);

  return (
    <View style={styles.container}>
      {mylocation.longitude ? (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={{
              latitude: mylocation.latitude,
              longitude: mylocation.longitude,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            }}
          >
            <Marker
              coordinate={{
                latitude: mylocation.latitude,
                longitude: mylocation.longitude,
              }}
              title="Vicente"
              description="Av.frei Cirilo, 4797 "
              image={icons.location}
              style={styles.marker}
            />
          </MapView>
          <View style={styles.footer}>
            <View style={styles.footertext}>
              <Text>{title}</Text>
            </View>
            <View style={styles.footerfilds}>
              <Text>Origem</Text>
              <TextInput
                style={styles.input}
                value={pickupAddress}
                onChangeText={(text) => setPickupAddress(text)}
                editable={ status == "" ? true : false}
              />
            </View>

            <View style={styles.footerfilds}>
              <Text>Destino</Text>
              <TextInput
                style={styles.input}
                value={dropoffAddress}
                onChangeText={(text) => setDropoffAddress(text)}
                editable={ status == "" ? true : false}
              />
            </View>
            {
                status == "A" &&  <View style={styles.footerfilds}>
                <Text>Motorista</Text>
                <TextInput
                  style={styles.input}
                  value={driverName}
                  editable={ false}
                />
              </View>
            }

           
          </View>

          {
            status == "" &&  <MyButton text="CONFIRMAR" theme="defaut" onClick={AskForRide} />
          } 
           {
            status == "P" &&  <MyButton text="CANCELAR" theme="red" onClick={CancelRide} />
          }
           {
            status == "A" &&  <MyButton text="FINALIZAR CARONA" theme="red" onClick={FinishRide} />
          }
         
        </>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

export default Passanger;
