import { useEffect, useState } from "react";
import { useContentStore } from "../store/content"
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMAGE_BASE_URL } from "../utils/constants";

const MovieSlider =({category})=>
{
    const {contentType}=useContentStore();
    const formattedCategory=category.replaceAll("_", " ")[0].toUpperCase()+category.replaceAll("_", " ").slice(1);
    const formattedContentType=contentType==="movie" ? "Movie" : "TV Shows";
    const [content,setContent]=useState([])
	useEffect(() => {
		const getContent = async () => {
			const res = await axios.get(`/api/v1/${contentType}/${category}`);
            console.log(res.data.content);
			setContent(res.data.content);
		};
		getContent();
	}, [contentType, category]);
    return(
        <div className=" bg-black text-white relative px-5 md:px-20">
            <h2>
                {formattedCategory} {formattedContentType}
            </h2>
            <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' >
                    {content.map((item) => (
                        <Link to={`/watch/${item?.id}`} className='min-w-[250px] relative group' key={item?.id}>
                            <div className='rounded-lg overflow-hidden'>
                                <img
                                    src={SMALL_IMAGE_BASE_URL + item?.backdrop_path}
                                    alt='Movie image'
                                    className='transition-transform duration-300 ease-in-out group-hover:scale-125'
                                />
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    )
}
export default MovieSlider