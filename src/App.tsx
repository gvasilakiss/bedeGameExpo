import React, { useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

type Game = {
  id: string;
  title: string;
  description?: string;
  url: string;
};

// fetching games and adding them to the list
const GAMES: Game[] = [
  {
    id: "marble-shooter",
    title: "Marble Shooter",
    description: "A fun and addictive marble shooting game",
    url: "https://www.htmlgames.com/game/Marble+Shooter/",
  },
  {
    id: "higher-or-lower",
    title: "Higher or Lower",
    description: "Guess if the next card is higher or lower",
    url: "https://www.htmlgames.com/game/Higher+or+Lower/",
  },
  {
    id: "bubble-shooter",
    title: "Bubble Shooter",
    description: "Pop bubbles to clear the screen",
    url: "https://www.htmlgames.com/game/Bubble+Shooter/",
  },
  {
    id: "chess",
    title: "Chess",
    description: "Classic chess game",
    url: "https://www.htmlgames.com/game/Chess/",
  },
];

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const renderGameItem = ({ item }: { item: Game }) => {
    return (
      <TouchableOpacity
        style={styles.gameItem}
        onPress={() => setSelectedGame(item)}
        accessibilityLabel={`Play ${item.title}`}
        accessibilityRole="button"
      >
        <Text style={styles.gameTitle}>{item.title}</Text>
        {item.description && (
          <Text style={styles.gameDescription}>{item.description}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <StatusBar />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bede Expo Games</Text>
          <Text style={styles.headerSubtitle}>{GAMES.length} games</Text>
        </View>

        <FlatList
          data={GAMES}
          keyExtractor={(item) => item.id}
          renderItem={renderGameItem}
          contentContainerStyle={styles.listContent}
        />

        {selectedGame && (
          <View style={styles.webviewContainer}>
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#333" />
                <Text style={styles.loadingText}>Loading game...</Text>
              </View>
            )}

            <WebView
              source={{ uri: selectedGame.url }}
              style={styles.webview}
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
            />

            <TouchableOpacity
              onPress={() => setSelectedGame(null)}
              style={styles.floatingCloseButton}
              activeOpacity={0.7}
              accessibilityLabel="Close game"
            >
              <Text style={styles.floatingCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

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
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
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
  gameDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
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
    backgroundColor: "#d9534f",
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
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});
