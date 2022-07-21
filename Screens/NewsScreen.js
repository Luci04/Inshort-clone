import React, { useContext, useState } from "react";

import {
    Dimensions,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import Carousel from "react-native-snap-carousel";
import { NewsContext } from "../API/Context";
import SingleNews from "../components/SingleNews";

const NewsScreen = () => {
    const { news: { data }, darkTheme } = useContext(NewsContext);

    const [activeIndex, setActiveIndex] = useState();

    const windowHeight = Dimensions.get("window").height;

    return (
        <View style={styles.carousel}>
            {
                data && (
                    <Carousel
                        layout={"stack"}
                        data={data.articles.slice(0, 10)}
                        sliderHeight={300}
                        itemHeight={windowHeight}
                        vertical={true}
                        renderItem={({ item, index }) => (
                            <SingleNews darkTheme={darkTheme} item={item} index={index} />
                        )}
                        onSnapToItem={(index) => setActiveIndex(index)}
                    />
                )
            }
        </View>
    )
};


const styles = StyleSheet.create({
    carousel: {
        flex: 1,
        transform: [{ scaleY: -1 }]
    },
});

export default NewsScreen;