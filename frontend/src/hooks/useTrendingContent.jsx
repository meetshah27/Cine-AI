import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
export const useTrendingContent = () => {
    const [trendingContent,setTrendingContent]=useState(null);
    const {contentType}=useContentStore();
    console.log("content Type: "+ contentType);
    useEffect(()=>{
        const getTrendingContent= async()=>{
            const response= await axios.get(`/api/v1/${contentType}/trending`);
            console.log("response: ",response);
            setTrendingContent(response.data.content);
        }
        getTrendingContent();
    },[contentType]);
    return { trendingContent } ;
}
export default useTrendingContent
