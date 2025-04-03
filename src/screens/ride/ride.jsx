import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./ride.style.js";
import { json_rides } from "../../constants/dados.js";
import icons from "../../constants/icons.js";
import { useEffect, useState } from "react";

function Ride(props) {
  const [rides, setRides] = useState([]);
  const userId = 4;
  function ClickRide(id) {
    props.navigation.navigate("ride-detail", {
      rideID: id,
      userId: userId,
    });
  }

  async function RequestRides() {
    setRides(json_rides);
  }

  useEffect(() => {
    RequestRides();
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={rides}
        keyExtractor={(ride) => ride.ride_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.ride}
              onPress={() => ClickRide(item.ride_id)}
            >
              <View style={styles.containerName}>
                <Image source={icons.car} style={styles.car} />
                <Text style={styles.name}>{item.passenger_name}</Text>
              </View>
              <Text style={styles.address}>Origem: {item.pickup_address}</Text>
              <Text style={styles.address}>
                Destino: {item.dropoff_address}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default Ride;
