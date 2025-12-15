import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { db } from "./firebase"; // Your firebase.js file
import { ref, set } from "firebase/database";

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [page, setPage] = useState("home"); // "home" or "login"

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    const userRef = ref(db, "users/" + Date.now());
    set(userRef, {
      email,
      password,
      createdAt: new Date().toISOString(),
    })
      .then(() => {
        Alert.alert("Success", "User saved to Firebase!");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          {/* ------------------ NAVBAR ------------------ */}
          <View style={styles.navbar}>
            <View style={styles.brandRow}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1042/1042339.png",
                }}
                style={styles.logo}
              />
              <Text style={styles.logoText}>MoomTech</Text>
            </View>

            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Ionicons name="menu" size={32} color="black" />
            </TouchableOpacity>
          </View>

          {/* ------------------ HAMBURGER MENU ------------------ */}
          <Modal visible={menuVisible} transparent animationType="slide">
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setMenuVisible(false)}
            />

            <View style={styles.sideMenu}>
              <Text style={styles.menuHeading}>Menu</Text>

              {["Home", "Categories", "Offers", "Profile", "Login"].map(
                (item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.menuItem}
                    onPress={() => {
                      setMenuVisible(false);
                      if (item === "Login") setPage("login");
                      else setPage("home"); // can be customized
                    }}
                  >
                    <Text style={styles.menuText}>{item}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </Modal>

          {/* ------------------ PAGE CONTENT ------------------ */}
          <ScrollView contentContainerStyle={styles.pageContent}>
            {page === "home" ? (
              <>
                <Text style={styles.heading}>
                  Find the Best Electronic Gadgets
                </Text>

                {/* ------------------ SEARCH BAR ------------------ */}
                <View style={styles.searchBox}>
                  <Ionicons name="search" size={22} color="#888" />
                  <TextInput
                    placeholder="Search gadgets..."
                    style={styles.searchInput}
                  />
                </View>

                {/* ------------------ CATEGORY GRID ------------------ */}
                <Text style={styles.subHeading}>Categories</Text>

                <View style={styles.grid}>
                  <CategoryCard
                    title="Mobile Phones"
                    image="https://m.media-amazon.com/images/I/61cwywLZR-L._AC_UF1000,1000_QL80_.jpg"
                  />
                  <CategoryCard
                    title="Laptops"
                    image="https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UF1000,1000_QL80_.jpg"
                  />
                  <CategoryCard
                    title="Smart Watches"
                    image="https://m.media-amazon.com/images/I/61sZfcz2bnL._AC_UF1000,1000_QL80_.jpg"
                  />
                  <CategoryCard
                    title="Accessories"
                    image="https://m.media-amazon.com/images/I/61Fh2wKnwyL._AC_SL1500_.jpg"
                  />
                  <CategoryCard
                    title="Headphones"
                    image="https://m.media-amazon.com/images/I/71o8Q5XJS5L.__AC_SX300_SY300_QL70_FMwebp_.jpg"
                  />
                  <CategoryCard
                    title="Gaming"
                    image="https://m.media-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg"
                  />
                </View>

                {/* ------------------ SPECIAL BUTTON ------------------ */}
                <TouchableOpacity
                  style={styles.specialBtn}
                  onPress={() => Alert.alert("Signed In Successfully")}
                >
                  <Text style={styles.specialBtnText}>Sign In Test Button</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* ---------- LOGIN PAGE ---------- */}
                <Text style={styles.subHeading}>Login</Text>
                <View style={styles.formBox}>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                  <TextInput
                    style={styles.formInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                  <TouchableOpacity
                    style={styles.specialBtn}
                    onPress={handleLogin}
                  >
                    <Text style={styles.specialBtnText}>Login & Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginTop: 15 }}
                    onPress={() => setPage("home")}
                  >
                    <Text
                      style={{ color: "#007AFF", textAlign: "center" }}
                    >
                      ← Back to Home
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

/* ------------------ CATEGORY CARD COMPONENT ------------------ */
const CategoryCard = ({ title, image }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => Alert.alert(title, "Opening " + title)}
    >
      <Image source={{ uri: image }} style={styles.cardImage} />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

/* ---------------------------- STYLES ---------------------------- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F8FA",
  },
  container: {
    flex: 1,
  },
  navbar: {
    height: 65,
    backgroundColor: "white",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 6,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logo: { width: 35, height: 35 },
  logoText: { fontSize: 22, fontWeight: "700", color: "#007AFF" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  sideMenu: {
    width: "65%",
    height: "100%",
    backgroundColor: "white",
    position: "absolute",
    right: 0,
    paddingTop: 70,
    paddingHorizontal: 20,
    elevation: 20,
  },
  menuHeading: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  menuItem: { marginVertical: 12 },
  menuText: { fontSize: 18 },
  pageContent: { padding: 20 },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 15 },
  searchBox: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: { flex: 1, fontSize: 16 },
  subHeading: { fontSize: 18, fontWeight: "600", marginBottom: 15 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    width: "47%",
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  cardImage: { width: "100%", height: 120, borderRadius: 10 },
  cardText: { marginTop: 10, fontSize: 16, fontWeight: "600" },
  specialBtn: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  specialBtnText: { fontSize: 18, color: "white", fontWeight: "700" },
  formBox: { marginTop: 10 },
  formInput: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
