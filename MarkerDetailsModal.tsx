import React from "react";
import { View, Modal, Text, Button, StyleSheet, Dimensions } from "react-native";

const window = Dimensions.get("window");
const modalHeight = window.height * 0.5; // Set modal height to 80% of the screen height

const MarkerDetailsModal = ({ isVisible, marker, onClose }) => {
console.log(marker?marker.name:'');
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Marker Title: {marker?marker.name:''} </Text>
          <Text>Latitude: {marker?marker.coordinate.latitude:''}</Text>
          <Text>Longitude: </Text>
          {/* Add more details as needed */}
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    height: modalHeight,
  },
});

export default MarkerDetailsModal;
