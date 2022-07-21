import { React, createContext, useState, useEffect } from "react";
import { getNewsAPI, getSourceAPI } from "./api";
import axios from "axios";

export const NewsContext = createContext();


const Context = ({ children }) => {

    const [news, setNews] = useState([]);
    const [category, setcategory] = useState("general")
    const [index, setIndex] = useState(1);
    const [source, setSource] = useState();
    const [darkTheme, setdarkTheme] = useState(true);

    const fetchNews = async (reset = category) => {
        console.log(reset);
        await axios.get(getNewsAPI(reset)).then((data) => {
            setNews(data);
            setIndex(1);
        });

    }

    const FetchNewsFromSource = async () => {
        try {
            await axios.get(getSourceAPI(source)).then((data) => {
                setNews(data);
                setIndex(1);
            })


        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchNews();
    }, [category])

    useEffect(() => {
        FetchNewsFromSource();
    }, [source])

    return (
        <NewsContext.Provider
            value={{ darkTheme, setdarkTheme, news, category, index, setIndex, category, setcategory, source, setSource, fetchNews }}>
            {children}
        </NewsContext.Provider>
    )
}

export default Context;