import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import CardList from "./CardList";

export default function Player({ route, navigation }) {
    const [player, setPlayer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = route.params;
    const query = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            axios.get(`https://api.clashroyale.com/v1/players/%23${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    console.log(token)
                    console.log(response.data)
                    setPlayer(response.data)
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    console.warn(error.status)
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
            <View>
                {error.status == 404 ? (<Text>Auncun joueur trouvé</Text>) : (<Text>Erreur serveur</Text>)}
            </View>
        )
    } else {
        return (
            <View>
                <Text style={styles.title}>{player.name}</Text>
                {/* <View style={styles.description}>
                    <Text>{clan.description}</Text>
                    <Text>Score: {clan.clanScore}</Text>
                    <Text>Trophées: {clan.clanWarTrophies}</Text>
                </View> */}
                <Text>Deck actuel</Text>
                <CardList cardList={player.currentDeck} />

                <Text>Cartes du joueur</Text>
                <CardList cardList={player.cards} />
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
    description: {
        alignItems: 'center',
        marginVertical: 10
    }
})