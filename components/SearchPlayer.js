import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, TextInput, View } from "react-native"

export const SearchPlayer = () => {
    const [player, setPlayer] = useState('');
    const navigation = useNavigation();
    const handleSubmit = () => {
        navigation.navigate('Player', { id: player })
    }
    return (
        <View>
            <TextInput
                placeholder="Player tag"
                value={player}
                onChangeText={setPlayer}
            />
            <Button title="Envoyer" onPress={handleSubmit} />
        </View>
    )
}