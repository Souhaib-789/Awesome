import { TouchableOpacity, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'

function CustomDrawerContent(props) {
    const navigation = useNavigation();

    const screens = [
        {
            id: 1,
            screenName: 'Home',
            goto: 'home',
            icon: 'home-outline'
        },
        {
            id: 2,
            screenName: 'Food',
            goto: 'food',
            icon: 'fast-food-outline'
        }
    ]

    return (
        <>
            <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
                <DrawerItemList {...props} />
                {
                    screens.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate(item.goto)}
                                style={{
                                    flexDirection: 'row',
                                    margin: 10,
                                    paddingVertical: 15,
                                    paddingHorizontal: 20,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    backgroundColor: 'white',
                                    elevation: 2,
                                }}>
                                <Ionicons name={item?.icon} color={'black'} size={20} />
                                <Text style={{ marginLeft: 20, fontSize: 16, color: 'black' }}>{item?.screenName}</Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </DrawerContentScrollView>
        </>
    );
}
export default CustomDrawerContent;