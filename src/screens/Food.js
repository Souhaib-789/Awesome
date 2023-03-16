import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator, FlatList } from "react-native";
import Voice from '@react-native-community/voice';
import apple from '../assets/apple.png'
import mango from '../assets/mango.png'
import bnana from '../assets/bnana.png'
import orange from '../assets/orange.png'
import grapes from '../assets/grapes.png'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Tts from 'react-native-tts';
import { RefreshControl } from "react-native-gesture-handler";


const Food = () => {

    const Fruits = [
        {
            id: 1,
            name: 'apple',
            description: 'Apples are high in fiber and water. Apples have been linked to a lower risk of heart disease . Eat an apple a day , keeps a doctor away.',
            image: apple
        },
        {
            id: 2,
            name: 'mango',
            description: 'One cup (165 grams) of fresh mango contains fewer than 100 calories and has a very low calorie density.',
            image: mango
        },
        {
            id: 3,
            name: 'banana',
            description: 'Helps in weight loss , protect you against type-2 diabetes, helps in production of white blood cells.',
            image: bnana
        },
        {
            id: 4,
            name: 'orange',
            description: "Boosts your immune system, your body's defense against germs. Protects your cells from damage.  improve the appearance of your skin",
            image: orange
        },
        {
            id: 5,
            name: 'grapes',
            description: 'May improve memory, attention, and mood. May protect against diabetes and lower blood sugar levels. May benefit eye health.',
            image: grapes
        },
    ]

    const [result, setResult] = useState('')
    const [UpdatedList, setUpdatedList] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, [])

    const fetchData = (text) => {
        fetch(`https://api.calorieninjas.com/v1/nutrition?query=${text}`, {
            method: 'GET',
            headers: { 'X-Api-Key': '3/qyI7C16cPnkL3MFbZe3g==GWNP8EirfWNo067t' },
            contentType: 'application/json',
        })
            .then((response) => response.json())
            .then((json) => {
                setUpdatedList(json?.items)
                if (json?.items?.length > 0) {
                    for (let i = 0; i < json?.items?.length; i++) {
                        // console.log('==================>>>>>', json?.items[i]);
                        Tts.getInitStatus().then(() => {
                            Tts.speak(json?.items[i]?.name);
                            Tts.speak(`${json?.items[i]?.name} has ${json?.items[i]?.calories} total calories in it `);
                            console.log('Existed in speak function');
                        }).catch((err) => {
                            console.log(err.message);
                            Tts.speak('Sorry no results found');
                        })
                    }
                }
                if (json?.items?.length == 0) {
                    Tts.speak('Sorry no results found');
                }
            })
            .catch((err) => {
                console.log('something went wrong', err);
            })

    }

    const onSpeechStartHandler = (e) => {
        console.log("start handler==>>>", e)
    }

    const onSpeechEndHandler = (e) => {
        setLoading(false)
        console.log("stop handler", e)
    }

    const onSpeechResultsHandler = (e) => {
        let text = e.value[0]
        setResult(text)
        fetchData(text)
        console.log('------------------', text);
        // let arrayofTexts = e?.value?.[0]?.split(' ')
        // for (let s = 0; s < arrayofTexts.length; s++) {
        //     for (let t = s; t < Fruits.length; t++) {
        //         console.log('--------------, ', arrayofTexts[s].toLowerCase(), '_______', t);
        //         if (arrayofTexts[s].toLowerCase() == Fruits[t].name) {
        //             console.log("Match found!");
        //             let newArr = Fruits.filter(e => e.name == Fruits[t].name)
        //             console.log('ksdmksndjksndfkl', newArr, 'pppppppppp', Fruits[t].name);
        //             setUpdatedList(newArr)
        //             Speak(newArr)
        //             break;
        //         }
        //         else {
        //             console.log("No match found.");
        //             setUpdatedList([])
        //         }
        //     }
        // }
    }

    const startRecording = async () => {
        setLoading(true)
        try {
            await Voice.start('en-Us')
        } catch (error) {
            console.log("error raised  in starting", error)
        }
    }

    const stopRecording = async () => {
        try {
            await Voice.stop()
            setLoading(false)
        } catch (error) {
            console.log("error raised in stoping", error)
        }
    }

    const resetData = () => {
        setResult(''),
            setUpdatedList([])
    }

    const Item = ({ item }) => {
        return (
            <View style={styles.item}>
                {/* <Image source={item?.image} style={styles.item_image} /> */}
                <View style={styles.item_subview}>
                    <Text style={styles.text}>{item?.name.toUpperCase()}</Text>
                    <Text style={styles.textx}>Present calories : {item?.calories}</Text>
                    <Text style={styles.textx}>Carbohydrates : {item?.carbohydrates_total_g} g</Text>
                    <Text style={styles.textx}>Cholesterol : {item?.cholesterol_mg} mg</Text>
                    <Text style={styles.textx}>Fat saturated : {item?.fat_saturated_g} g</Text>
                    <Text style={styles.textx}>Fiber : {item?.fiber_g} g</Text>
                    <Text style={styles.textx}>Potassium : {item?.potassium_mg} mg</Text>
                    <Text style={styles.textx}>Sugar : {item?.sugar_g} g </Text>
                    <Text style={styles.textx}>Serving size : {item?.serving_size_g} g</Text>
                </View>
            </View>
        )
    };

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={false}
                onRefresh={resetData} />}>

                <View style={styles.header}>
                    <Text style={styles.headingText}>Search Food by Speech Recoginition</Text>
                    <AntDesign name='search1' color={'#5D3FD3'} size={40} />
                    <MaterialCommunityIcons name='food-apple' color={'#5D3FD3'} size={20} style={styles.apple_icon} />
                </View>

                <View style={styles.textInputStyle}>
                    <TextInput
                        value={result}
                        placeholder="Search here"
                        style={{ flex: 1 }}
                        onChangeText={text => setResult(text)}
                    />
                </View>

                <View style={styles.mini_view}>
                    {isLoading ?
                        < View style={styles.loader_view}>
                            <ActivityIndicator size={90} color='#5D3FD3' />
                        </View>
                        :
                        <TouchableOpacity onPress={startRecording} style={styles.mic_view} disabled={result ? true : false}  >
                            <FontAwesome5 name='microphone' size={50} color={result ? 'grey' : '#5D3FD3'} />
                        </TouchableOpacity>}

                    <View>
                        <TouchableOpacity style={styles.btn} onPress={stopRecording}  >
                            <Text style={styles.btn_text}>STOP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={resetData}  >
                            <Text style={styles.btn_text}>RESET</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <Text style={styles.subheading}>Your Collection</Text>

                    <FlatList
                        data={UpdatedList}
                        renderItem={Item}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={
                            <Text style={styles.no_data_found}>No results found</Text>
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Food;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    headingText: {
        marginVertical: 30,
        width: '70%',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#5D3FD3',
    },
    btn: {
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#5D3FD3',
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: '100%',
        alignItems: "center",
        borderRadius: 20
    },
    subheading: {
        marginTop: 30,
        marginLeft: 30,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: '#000'
    },
    mini_view: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    btn_text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    },
    text: {
        fontSize: 18,
        color: '#000',
        marginVertical: 10,
    },
    textx: {
        fontSize: 13,
        lineHeight: 20
    },
    mic_view: {
        backgroundColor: 'white',
        elevation: 5,
        alignSelf: "center",
        marginVertical: 20,
        paddingVertical: 40,
        paddingHorizontal: 50,
        borderRadius: 100
    },
    loader_view: {
        marginVertical: 60
    },
    textInputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 55,
        borderRadius: 20,
        marginHorizontal: 20,
        paddingHorizontal: 16,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 0.4
    },
    item: {
        backgroundColor: '#fff',
        elevation: 5,
        width: '90%',
        alignSelf: "center",
        marginVertical: 10,
        padding: 15,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    item_image: {
        width: 55,
        height: 55,
        resizeMode: "contain"
    },
    item_subview: {
        marginLeft: 10,
        width: '80%'
    },
    apple_icon: {
        position: "absolute",
        right: 35,
        top: 42
    },
    no_data_found: {
        alignSelf: "center",
        marginTop: 20
    }
});