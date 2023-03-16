import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo'
import * as Animatable from 'react-native-animatable';
const DURATION = 300;

const animation = {
    0: { opacity: 0, translateY: 400 },
    1: { opacity: 1, translateY: 0 }
}

const createAnimation = (from) => ({
    0: { opacity: 0, translateY: -100, translateX: -1 },
    1: { opacity: 1, translateY: 0, translateX: 0 }
})

const animations = [
    createAnimation(100),
    createAnimation(0),
    createAnimation(-100)
]

const Details = (props) => {
    const data = props?.route?.params?.item;
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: '#ffb07c' }}>
            <Pressable style={{ alignSelf: 'flex-end', margin: 15 }} onPress={() => navigation.goBack()}>
                <Entypo name="cross" size={30} color={'black'} />
            </Pressable>

            <Image style={{
                width: 210, height: 210, resizeMode: 'contain'
                , alignSelf: 'center', marginTop: '30%'
            }} source={data?.img} />

            <Animatable.Text
                useNativeDriver
                animation={animation}
                delay={DURATION + 100}
                style={{ fontSize: 35, fontWeight: "bold", color: 'black', alignSelf: 'center', marginTop: 50 }} >{data?.name}</Animatable.Text>

        </View>
    )
}

export default Details;