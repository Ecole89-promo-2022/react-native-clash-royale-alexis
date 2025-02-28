import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, FlatList, Image, StyleSheet } from "react-native";

export default function ClanDetails({ route }) {
    const { tag } = route.params;
    const [clan, setClan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const query = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            axios.get(`https://api.clashroyale.com/v1/clans/%23${tag}`, { // %23 pour encoder le "#"
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    setClan(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => { query(); }, []);

    if (loading) return <Text>En cours de chargement...</Text>;
    if (error) return <Text>Erreur serveur</Text>;

    return (
        <View style={styles.container}>
            {clan && (
                <>
                    <Text style={styles.title}>{clan.name}</Text>
                    {clan.badgeUrls && (
                        <Image source={{ uri: clan.badgeUrls.large }} style={styles.badge} />
                    )}
                    <Text style={styles.text}>🏆 Trophées requis : {clan.requiredTrophies}</Text>
                    <Text style={styles.text}>👥 Membres : {clan.members}/50</Text>
                    <Text style={styles.text}>🔥 Score du clan : {clan.clanScore}</Text>

                    <Text style={styles.subtitle}>Membres du clan :</Text>
                    <FlatList
                        data={clan.memberList}
                        keyExtractor={(item) => item.tag}
                        renderItem={({ item }) => (
                            <View style={styles.memberItem}>
                                <Text>{item.name} - {item.role} ({item.trophies} 🏆)</Text>
                            </View>
                        )}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
    badge: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
    text: { fontSize: 16, marginBottom: 5 },
    subtitle: { fontSize: 20, fontWeight: "bold", marginTop: 15 },
    memberItem: { padding: 5, borderBottomWidth: 1, borderBottomColor: "#ddd" },
});
