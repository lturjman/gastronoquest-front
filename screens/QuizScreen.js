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

//test
import React from "react";
import { View, Text } from "react-native";
import CustomButton from "../components/ui-kit/CustomButton";
import CustomCard from "../components/ui-kit/CustomCard";
import CustomInput from "../components/ui-kit/CustomInput";
import CustomCheckbox from "../components/ui-kit/CustomCheckbox";
import CustomRadio from "../components/ui-kit/CustomRadio";

import { useState } from "react";

export default function QuizScreen() {
  const optionscheckbox = ["Test", "Prix"];
  const [selected, setSelected] = useState(["Test"]);

  const optionsradio = ["lieu", "map"];

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <CustomButton title="Container Button" variant="light" />
      <CustomButton title="Container Button" variant="dark" />
      <CustomButton title="Container Button" variant="outline" />

      <CustomCard />
      <CustomInput placeholder="Placeholder" />
      <View>
        <View style={{ alignItems: "flex-start" }}>
          <Text>QuizScreen</Text>
          {optionscheckbox.map((option) => (
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

      <View>
        {optionsradio.map((option) => (
          <CustomRadio
            key={option}
            label={option}
            selected={selected === option}
            onPress={() => setSelected(option)}
          />
        ))}
      </View>
    </View>
  );
}
