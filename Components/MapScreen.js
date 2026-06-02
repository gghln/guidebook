import { useState } from 'react';
import MapView, { Marker} from 'react-native-maps';
import { View, StyleSheet, Image} from 'react-native';
import MapCard from './MapCard';

const  MapScreen = ({allItems}) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const location = {
    latitude: 55.6761,  
    longitude: 12.5683,
  }



  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        toolbarEnabled={false} 
        showsMyLocationButton={false}
        showsCompass={false} 
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        >
        {allItems.map((marker) => (
          <Marker
            onPress={() => {setSelectedLocation(marker)}}
            key={marker.id}
            coordinate={{ latitude: Number(marker.latitude), longitude: Number(marker.longitude) }}
          >
            <View style={[styles.circle,  selectedLocation?.id === marker.id && styles.circleSelected]}>
              <Image source={{ uri: marker.image }} style={styles.image} />
            </View>
          </Marker>
        ))}
      </MapView>

      {selectedLocation && <MapCard location={selectedLocation}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  map: { 
    flex: 1 
  },
  circle: {
    width:30,
    height:30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius:10,
  },
  circleSelected: {
    borderWidth: 3,
    borderColor: '#4F6D9A',
  },
  image:{
    width:25,
    height:25
  }
})

const mapStyle = [
  {
    elementType: 'labels',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
];

export default MapScreen
