// import { StyleSheet, Text, View } from "react-native";

// export default function QuizScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>QuizScreen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// test
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import CustomCheckbox from "../components/ui-kit/CustomCheckbox";

export default function QuizScreen() {
  const options = ["Test", "Prix", "Ville", "Test2"];
  const [selected, setSelected] = useState(["Test", "Prix"]);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "flex-start" }}>
        <Text>QuizScreen</Text>
        {options.map((option) => (
          <CustomCheckbox
            key={option}
            label={option}
            checked={selected.includes(option)}
            onPress={() =>
              setSelected((prev) =>
                prev.includes(option)
                  ? prev.filter((item) => item !== option)
                  : [...prev, option]
              )
            }
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
