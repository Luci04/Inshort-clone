import { View, Text, TextInput, StyleSheet, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import { NewsContext } from '../API/Context'
import { TouchableOpacity } from 'react-native';
import SingleNews from './SingleNews'
import { Entypo } from '@expo/vector-icons'

const Search = () => {

    const { news: { data }, darkTheme } = useContext(NewsContext);

    const [searchResult, setSearchResult] = useState([]);
    const [modalVisible, setmodalVisible] = useState(false);
    const [currentNews, setCurrentNews] = useState([]);


    const handleModal = (n) => {
        setmodalVisible(true);
        setCurrentNews(n);
    }

    const handleSearch = (text) => {
        if (!text) {
            setSearchResult([]);
            return;
        }

        setSearchResult(data.articles.filter(query => query.title.includes(text)))
    }

    return (
        <View style={{ width: "100%", position: "relative" }}>
            <TextInput style={{
                ...styles.search,
                backgroundColor: darkTheme ? "black" : "lightgrey",
                color: darkTheme ? "white" : "black"
            }}
                placeholder="Search for News"
                placeholderTextColor={darkTheme ? "white" : "black"}
                onChangeText={(text) => handleSearch(text)}
            />
            <View style={styles.searchResults}>
                {searchResult.slice(0, 10).map((n) => (
                    <TouchableOpacity
                        key={n.title}
                        onPress={() => handleModal(n)}
                        activeOpacity={0.7}>
                        <Text
                            style={{
                                ...styles.singleResult,
                                backgroundColor: darkTheme ? "black" : "white",
                                color: darkTheme ? "white" : "black"
                            }}
                        >
                            {n.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Modal style={{ height: '100%' }} animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setmodalVisible(!modalVisible)
                }}>
                <TouchableOpacity
                    onPress={() => setmodalVisible(!modalVisible)}
                    style={{
                        position: 'absolute',
                        zIndex: 10,
                        right: 0,
                        margin: 20
                    }}
                >
                    <Entypo name='circle-with-cross' size={30} color="white" />
                </TouchableOpacity>
                <View style={{ height: "100%", transform: [{ scaleY: -1 }] }}>
                    <SingleNews fullScreen={1} item={currentNews} />
                </View>
            </Modal>
        </View >
    )
}

const styles = StyleSheet.create({
    search: {
        padding: 10,
        paddinHorizontal: 15,
        borderRadius: 10,
        fontSize: 15,
        marginBottom: 15
    }, searchResults: {
        padding: 5,
        position: 'absolute',
        zIndex: 1,
        top: 50
    },
    singleResult: {
        borderRadius: 5,
        padding: 10,
        margin: 0.5,
        shadowColor: 'black',
        elevation: 5,
    }
})

export default Search