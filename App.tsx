import React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import MarkerDetailsModal from "./MarkerDetailsModal"; // Make sure the path is correct

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 41.9160547;
const LONGITUDE = 12.4571116;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const API_URL = "https://2295a967-bf39-4526-948c-169b249616fd.mock.pstmn.io/api/locations";
const staticMarkers = [];

class MassiveCustomMarkers extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: staticMarkers, // Use the staticMarkers array here
    selectedMarker: null,
    isModalVisible: false,
    };
  }
  async componentDidMount() {
    try {
      const token = "1|x7itfYEG5dRb7XFjQp2wetQJbSyNAWsv4gHBw2yG";
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      const markers = data.map((item) => ({
        coordinate: {
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
        },
        key: item.id.toString(),
        name: item.name,
        description: item.description,
        website: item.website,
      }));

      this.setState({ markers });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
handleMarkerPress = (marker) => {
  const markerLatitude = marker.coordinate.latitude;
  const markerLongitude = marker.coordinate.longitude;

  // Calculate the new latitude and longitude for centering the map
  const centerLatitude = markerLatitude - (this.state.region.latitudeDelta * 0.2); // 10% from top
  const centerLongitude = markerLongitude;

  this.setState({
    region: {
      ...this.state.region,
      latitude: centerLatitude,
      longitude: centerLongitude,
    },
    selectedMarker: marker,
    isModalVisible: true,
  });
};

    handleModalClose = () => {
      this.setState({
        selectedMarker: null,
        isModalVisible: false,
      });
    };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          region={this.state.region} // Use the updated region value
        >
          {this.state.markers.map((marker: any) => (
            <Marker
              title={marker.key}
              key={marker.key}
              coordinate={marker.coordinate}
              onPress={() => this.handleMarkerPress(marker)}
            >
              <Image
                source={require("./assets/markers/location-pin.png")}
                style={{ width: 40, height: 40 }} // Change width and height as desired
              />
            </Marker>
          ))}
        </MapView>
                <MarkerDetailsModal
                  isVisible={this.state.isModalVisible}
                  marker={this.state.selectedMarker}
                  onClose={this.handleModalClose}
                />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

export default MassiveCustomMarkers;
