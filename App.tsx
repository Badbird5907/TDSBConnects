import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="dark flex-1 items-center justify-center bg-gray-900">
      <StatusBar style="auto" />
    </View>
  );
}
