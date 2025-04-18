
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback } from "react-native";

import CustomButton from "../components/ui-kit/CustomButton";

// #todo lien externe vers le site d'Ecotable ? faudra importer expo-linking

export default function SearchScreen({ infoVisible, setInfoVisible }) {
  return (
    <Modal visible={infoVisible} animationType="fade" transparent>
      <View style={styles.centerView}>
        <TouchableWithoutFeedback onPress={() => setInfoVisible(false)}>
          <View style={styles.absoluteFill} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.card}>
            <Text>Infos sur le score d'Ecotable</Text>
            <CustomButton variant="outline" textSize={12} title="Retour" onPress={() => setInfoVisible(false)} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});