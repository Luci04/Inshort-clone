import React, { useContext } from 'react'
import NewsContext from '../API/Context'
import { View, Image, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Linking, } from 'react-native'

const SingleNews = ({ item, index, fullScreen = 0, darkTheme }) => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


    return (
        <View style={{
            height: windowHeight,
            width: windowWidth,
            transform: [{ scaleY: -1 }]
        }} >

            <Image
                source={{ uri: item.urlToImage }}
                style={{
                    marginTop: fullScreen ? 0 : 45,
                    width: windowWidth,
                    resizeMode: "cover",
                    height: "45%"
                }}
            />
            <View
                style={{ ...styles.description, backgroundColor: darkTheme ? '#282C35' : "white" }}>
                <Text style={{ ...styles.title, color: darkTheme ? "white" : "black" }}>
                    {item.title}</Text>
                <Text style={{ ...styles.content, color: darkTheme ? "white" : "black" }} >
                    {item.description}
                </Text>
                <Text style={{ marginLeft: 10, color: darkTheme ? "white" : "black" }}>Short by
                    <Text> {item.author ?? "unknown"} </Text>
                </Text>
                <ImageBackground
                    blurRadius={30}
                    style={{ ...styles.footer, width: windowWidth }}

                    source={{ uri: item.urlToImage }}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(item.url)}
                    >
                        <Text style={{ fontSize: 15, color: "white" }}>
                            `{item?.content?.slice(0, 45)}...`
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>
                            Read More
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        padding: 10,
        textAlign: 'justify'
    }, content: {
        fontSize: 18,
        padding: 10,
        textAlign: 'justify'
    }, footer: {
        height: 70,
        position: "absolute",
        bottom: 0,
        backgroundColor: '#d7be69',
        justifyContent: "center",
        paddingHorizontal: 20
    }, description: {
        padding: 10,
        textAlign: 'justify',
        flex: 1
    }
})


export default SingleNews