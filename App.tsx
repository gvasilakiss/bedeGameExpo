import React, { useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

type Game = {
  id: string;
  title: string;
  url: string;
};

// fetching games and adding them to the list
const GAMES: Game[] = [
  {
    id: "marble-shooter",
    title: "Marble Shooter",
    url: "https://www.htmlgames.com/game/Marble+Shooter/",
  },
  {
    id: "higher-or-lower",
    title: "Higher or Lower",
    url: "https://www.htmlgames.com/game/Higher+or+Lower/",
  },
  {
    id: "bubble-shooter",
    title: "Bubble Shooter",
    url: "https://www.htmlgames.com/game/Bubble+Shooter/",
  },
];

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const renderGameItem = ({ item }: { item: Game }) => {
    return (
      <TouchableOpacity
        style={styles.gameItem}
        onPress={() => setSelectedGame(item)}
      >
        <Text style={styles.gameTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <StatusBar />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bede Expo Games</Text>
        </View>

        <FlatList
          data={GAMES}
          keyExtractor={(item) => item.id}
          renderItem={renderGameItem}
          contentContainerStyle={styles.listContent}
        />
        {selectedGame && (
          <View style={styles.webviewContainer}>
            <WebView
              source={{ uri: selectedGame.url }}
              style={styles.webview}
            />

            <TouchableOpacity
              onPress={() => setSelectedGame(null)}
              style={styles.floatingCloseButton}
              activeOpacity={0.7}
            >
              <Text style={styles.floatingCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
// some clean styling and x button
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  listContent: {
    padding: 16,
  },
  gameItem: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  gameTitle: {
    fontSize: 18,
  },
  webviewContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },
  floatingCloseButton: {
    position: "absolute",
    top: 50,
    right: 12,
    width: 40,
    height: 40,
    backgroundColor: "#333",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  floatingCloseText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
