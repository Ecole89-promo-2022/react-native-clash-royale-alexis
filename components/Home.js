import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Dimensions } from "react-native";

export default function Home() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const query = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            axios.get("https://api.clashroyale.com/v1/cards", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    setCards(response.data.items);
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
            <Text style={styles.title}>Bienvenue sur la page d'accueil</Text>
            <FlatList
                data={cards}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        setSelectedCard(item);
                        setModalVisible(true);
                    }}>
                        <Image source={{ uri: item.iconUrls.medium }} style={styles.image} />
                    </TouchableOpacity>
                )}
                numColumns={4}
                columnWrapperStyle={{ flexDirection: 'row', justifyContent: 'space-between' }}
            />

            {/* Modale pour afficher les détails */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedCard && (
                            <>
                                <Text style={styles.modalTitle}>{selectedCard.name}</Text>
                                <Image source={{ uri: selectedCard.iconUrls.medium }} style={styles.modalImage} />

                                {/* Affichage des caractéristiques */}
                                <Text style={styles.modalText}>🟡 Rareté : {selectedCard.rarity}</Text>
                                <Text style={styles.modalText}>⚡ Coût en élixir : {selectedCard.elixirCost}</Text>

                                {/* Affichage des variantes si disponibles */}
                                {selectedCard.variations && selectedCard.variations.length > 0 && (
                                    <>
                                        <Text style={styles.variationTitle}>Variantes :</Text>
                                        <FlatList
                                            data={selectedCard.variations}
                                            keyExtractor={(item, index) => index.toString()}
                                            numColumns={2} // Afficher les variantes en deux colonnes
                                            columnWrapperStyle={{ justifyContent: 'center' }}
                                            renderItem={({ item }) => (
                                                <View style={styles.variationCard}>
                                                    <Image source={{ uri: item.iconUrls.medium }} style={styles.variationImage} />
                                                    <Text style={styles.variationText}>{item.name}</Text>
                                                </View>
                                            )}
                                        />
                                    </>
                                )}

                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Text style={styles.closeButton}>Fermer</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    image: { width: 80, height: 100, margin: 5, borderRadius: 10 },

    // Styles pour la modale
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.8,
        maxHeight: height * 0.8,
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    modalImage: { width: 120, height: 140, borderRadius: 10 },
    modalText: { fontSize: 16, marginVertical: 5 },
    closeButton: { color: 'blue', fontSize: 16, marginTop: 10 },

    // Variantes affichées en grille
    variationTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
    variationCard: { alignItems: 'center', width: "50%", paddingVertical: 10 },
    variationImage: { width: 90, height: 110, borderRadius: 10 },
    variationText: { fontSize: 14, textAlign: 'center', marginTop: 5 },
});
