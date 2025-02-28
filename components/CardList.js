import React from "react";
import { FlatList, Image, View } from "react-native";

export default function CardList({ cardList }) {
    return (
        <FlatList
            data={cardList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View>
                    <Image source={{ uri: item.iconUrls.medium }} style={{ width: 100, height: 150 }} />
                </View>
            )}
            numColumns={4}
            columnWrapperStyle={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        />
    )
}