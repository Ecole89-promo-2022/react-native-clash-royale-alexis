import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";

export default function Countries({ navigation }) {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const query = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            axios.get("https://api.clashroyale.com/v1/locations", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    console.log(token)
                    console.log(response.data.items)
                    setCountries(response.data.items)
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    console.warn(error)
                    setLoading(false)
                })
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }


    useEffect(() => { query() }, [])

    if (loading) {
        return (
            <Text>Encours de chargement...</Text>
        )
    } else if (error) {
        return (
            <Text>Server error</Text>
        )
    } else {
        return (
            <View>
                <Text style={styles.title}>Liste des pays</Text>
                <FlatList
                    data={countries}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity onPress={() => { navigation.navigate('Clans', { id: item.id, name: item.name }) }}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    contentContainerStyle={styles.list}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    list: {
        alignItems: 'center',
    }
})