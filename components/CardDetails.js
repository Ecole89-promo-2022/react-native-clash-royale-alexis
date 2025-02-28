import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

export default function CardDetails({ route }) {
    const { card } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{card.name}</Text>
            <FlatList
                data={card.variations || [card]} // Si pas de variations, on affiche la carte normale
                keyExtractor={(item) => item.id.toString()}
                horizontal
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                        <Image source={{ uri: item.iconUrls.medium }} style={styles.image} />
                        <Text>Rareté: {item.rarity}</Text>
                        <Text>Coût: {item.elixirCost} ⚡</Text>
                        <Text>Type: {item.type}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardContainer: {
        marginRight: 15,
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 180,
        borderRadius: 10,
    },
});
