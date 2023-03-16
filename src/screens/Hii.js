import React from "react";
import { View, Text, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import apple from '../assets/apple.png'
import mango from '../assets/mango.png'
import bnana from '../assets/bnana.png'
import orange from '../assets/orange.png'
import grapes from '../assets/grapes.png'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInUp, useAnimatedScrollHandler } from "react-native-reanimated";

const Hii = () => {


    const handler = useAnimatedScrollHandler({
        onScroll: (event) => {
            console.log(event.contentOffset.y);
        }
    })
    const navigation = useNavigation();
    const products = [
        {
            id: 1,
            name: 'Apple',
            img: apple
        },
        {
            id: 2,
            name: 'Mango',
            img: mango
        },
        {
            id: 3,
            name: 'Banana',
            img: bnana
        },
        {
            id: 4,
            name: 'Orange',
            img: orange
        },
        {
            id: 5,
            name: 'Grapes',
            img: grapes
        },
    ]
    const renderItem = ({ item }) => {
        return (
            <View >
                <TouchableOpacity style={{
                    marginLeft: 70,
                    marginVertical: 15,
                    backgroundColor: '#fff',
                    width: '50%',
                    padding: 5,
                    borderRadius: 10,
                    alignItems: 'center',
                    elevation: 10
                }}
                    onPress={() => navigation.navigate('details', { item })}>
                    <Image source={item?.img} style={{ resizeMode: 'contain', width: 150, height: 150 }} />
                    <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold', margin: 10 }}>{item?.name}</Text>
                </TouchableOpacity>
            </View >
        )
    }

    return (
        <View
            style={{ flex: 1, padding: 15, backgroundColor: '#ffff' }} >
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Entypo name="menu" size={30} color={'black'} />
            </TouchableOpacity>
            <Animated.FlatList
                data={products}
                renderItem={renderItem}
                decelerationRate={"fast"}
                showsVerticalScrollIndicator={false}
                onScroll={handler}
                keyExtractor={(item, index) => index.toString()} />
        </View>
    )
}

export default Hii;