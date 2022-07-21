import React, { useContext, useState } from 'react'

import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import { NewsContext } from '../API/Context'
import { categories, sources } from '../API/api'
import Search from '../components/Search'

const DiscoverScreen = () => {

    const { setcategory, setSource, darkTheme } = useContext(NewsContext)
    const windowWidth = Dimensions.get("window").width;
    const slideWidth = Math.round(windowWidth / 3.5);


    return (
        <View style={{ ...styles.discover, backgroundColor: darkTheme ? '#282C35' : "white" }}>
            {/* Search */}

            <Search />

            {/* Categories */}
            <Text style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}>
                Categories
            </Text>

            <Carousel
                sliderWidth={windowWidth}
                itemWidth={slideWidth}
                layout={'default'}
                data={categories}
                firstItem={0}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={styles.category}
                        onPress={() => setcategory(item.name)}
                    >
                        <Image
                            source={{ uri: item.pic }}
                            style={styles.categoryImage}
                        />
                        <Text style={{ ...styles.name, color: darkTheme ? "white" : "black" }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Sources */}
            <Text style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}>
                Sources
            </Text>
            <View style={styles.sources}>
                {sources.map((s) => (
                    <TouchableOpacity
                        onPress={() => {
                            setSource(s.id)
                        }
                        }
                        key={s.id}
                        style={styles.sourceContainer}>

                        <Image source={{ uri: s.pic }}
                            style={styles.sourceImage} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    discover: {
        padding: 10,
        alignItems: 'center'
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 8,
        marginHorizontal: 5,
        borderBottomColor: "#007FFF",
        borderBottomWidth: 5,
        alignSelf: "flex-start",
        borderRadius: 10
    }, categoryImage: {
        height: '70%',
        width: '100%',
        resizeMode: "contain"
    },
    name: {
        fontSize: 16,
        textTransform: "capitalize"
    },
    category: {
        height: 130,
        margin: 10,
        alignItems: "center",
        justifyContent: "space-evenly"
    }, sourceImage: {
        height: "100%",
        borderRadius: 10,
        resizeMode: "cover"
    }, sources: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingVertical: 15
    },
    sourceContainer: {
        height: 150,
        width: "40%",
        margin: 15,
        borderRadius: 10,
        backgroundColor: '#cc313d'
    },

})

export default DiscoverScreen