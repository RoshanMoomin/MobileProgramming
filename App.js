import React, { useState, useEffect } from "react";
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
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker"; // dropdown picker

// Firebase
import { db } from "./firebase";
import { ref, set, onValue } from "firebase/database";

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [search, setSearch] = useState("");

  // ---------- Form State ----------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");
  const [interest, setInterest] = useState("");
  const [notes, setNotes] = useState("");

  // ---------- Database State ----------
  const [users, setUsers] = useState([]);

  // ---------- Save Function ----------
  const saveToDatabase = () => {
    if (!name || !email) {
      Alert.alert("Error", "Please enter at least Name and Email");
      return;
    }

    const userRef = ref(db, "users/" + Date.now());

    set(userRef, {
      name,
      email,
      phone,
      address,
      gender,
      age,
      interest,
      notes,
      createdAt: new Date().toISOString(),
    })
      .then(() => {
        Alert.alert("Success", "Data saved to Firebase!");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setGender("Male");
        setAge("");
        setInterest("");
        setNotes("");
      })
      .catch((error) => Alert.alert("Error", error.message));
  };

  // ---------- Fetch Data from Firebase ----------
  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setUsers(parsed.reverse()); // latest first
      } else {
        setUsers([]);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* ---------- Navbar ---------- */}
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

          {/* ---------- Hamburger Menu ---------- */}
          <Modal visible={menuVisible} transparent animationType="slide">
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setMenuVisible(false)}
            />
            <View style={styles.sideMenu}>
              <Text style={styles.menuHeading}>Menu</Text>
              {["Home", "Categories", "Offers", "Profile", "Settings"].map(
                (item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.menuItem}
                    onPress={() => Alert.alert(item, item + " clicked")}
                  >
                    <Text style={styles.menuText}>{item}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </Modal>

          {/* ---------- Page Content ---------- */}
          <ScrollView contentContainerStyle={styles.pageContent}>
            <Text style={styles.heading}>Find the Best Electronic Gadgets</Text>

            {/* ---------- Search Bar ---------- */}
            <View style={styles.searchBox}>
              <Ionicons name="search" size={22} color="#888" />
              <TextInput
                placeholder="Search gadgets..."
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            {/* ---------- Extended Form ---------- */}
            <Text style={styles.subHeading}>Register / Submit Info</Text>
            <View style={styles.formBox}>
              <TextInput
                placeholder="Full Name"
                style={styles.formInput}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                placeholder="Email"
                style={styles.formInput}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                placeholder="Phone Number"
                style={styles.formInput}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <TextInput
                placeholder="Address"
                style={styles.formInput}
                value={address}
                onChangeText={setAddress}
              />
              {/* Gender Picker */}
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(val) => setGender(val)}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              <TextInput
                placeholder="Age"
                style={styles.formInput}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Product Interest"
                style={styles.formInput}
                value={interest}
                onChangeText={setInterest}
              />
              <TextInput
                placeholder="Additional Notes"
                style={[styles.formInput, { height: 80 }]}
                value={notes}
                onChangeText={setNotes}
                multiline
              />
              <TouchableOpacity style={styles.specialBtn} onPress={saveToDatabase}>
                <Text style={styles.specialBtnText}>Save to Firebase</Text>
              </TouchableOpacity>
            </View>

            {/* ---------- Display Saved Users ---------- */}
            <Text style={styles.subHeading}>Submitted Entries</Text>
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.userCard}>
                  <Text style={styles.userText}>
                    <Text style={{ fontWeight: "700" }}>Name:</Text> {item.name}
                  </Text>
                  <Text style={styles.userText}>
                    <Text style={{ fontWeight: "700" }}>Email:</Text> {item.email}
                  </Text>
                  {item.phone ? (
                    <Text style={styles.userText}>
                      <Text style={{ fontWeight: "700" }}>Phone:</Text> {item.phone}
                    </Text>
                  ) : null}
                  {item.address ? (
                    <Text style={styles.userText}>
                      <Text style={{ fontWeight: "700" }}>Address:</Text> {item.address}
                    </Text>
                  ) : null}
                  <Text style={styles.userText}>
                    <Text style={{ fontWeight: "700" }}>Gender:</Text> {item.gender}
                  </Text>
                  {item.age ? (
                    <Text style={styles.userText}>
                      <Text style={{ fontWeight: "700" }}>Age:</Text> {item.age}
                    </Text>
                  ) : null}
                  {item.interest ? (
                    <Text style={styles.userText}>
                      <Text style={{ fontWeight: "700" }}>Interest:</Text> {item.interest}
                    </Text>
                  ) : null}
                  {item.notes ? (
                    <Text style={styles.userText}>
                      <Text style={{ fontWeight: "700" }}>Notes:</Text> {item.notes}
                    </Text>
                  ) : null}
                  <Text style={styles.userText}>
                    <Text style={{ fontWeight: "700" }}>Submitted At:</Text>{" "}
                    {new Date(item.createdAt).toLocaleString()}
                  </Text>
                </View>
              )}
            />

          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

// ---------- CATEGORY CARD ----------
const CategoryCard = ({ title, image }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => Alert.alert(title, "Opening " + title)}
  >
    <Image source={{ uri: image }} style={styles.cardImage} />
    <Text style={styles.cardText}>{title}</Text>
  </TouchableOpacity>
);

// ---------- STYLES ----------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F8FA" },
  container: { flex: 1 },

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

  formBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  formInput: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
  },

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

  specialBtn: { marginTop: 10, backgroundColor: "#007AFF", padding: 15, borderRadius: 10, alignItems: "center" },
  specialBtnText: { fontSize: 18, color: "white", fontWeight: "700" },

  userCard: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 12 },
  userText: { fontSize: 14, marginBottom: 2 },
});
