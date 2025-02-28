import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, TextInput, View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";

export const SearchClan = () => {
    const [query, setQuery] = useState('');
    const [clans, setClans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const handleSearch = async () => {
        if (query.trim() === '') return;
        setLoading(true);
        setError(null);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`https://api.clashroyale.com/v1/clans?name=${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setClans(response.data.items);
        } catch (err) {
            setError("Erreur lors de la récupération des clans.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Entrez le nom du clan"
                value={query}
                onChangeText={setQuery}
                style={styles.input}
            />
            <Button title="Rechercher" onPress={handleSearch} />

            {loading && <Text>Recherche en cours...</Text>}
            {error && <Text style={styles.error}>{error}</Text>}

            <FlatList
                data={clans}
                keyExtractor={(item) => item.tag}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ClanDetails', { tag: item.tag.substring(1) })}>
                        <Text style={styles.clanName}>{item.name} ({item.tag})</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, alignItems: 'center', justifyContent: 'center' },
    input: { width: "80%", padding: 10, borderWidth: 1, borderColor: "#ddd", marginBottom: 10, borderRadius: 5 },
    error: { color: 'red', marginTop: 10 },
    clanName: { fontSize: 16, color: "blue", marginVertical: 5 },
});
