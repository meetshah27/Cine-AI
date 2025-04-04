import { Link } from "react-router-dom"
import Navbar from "../../components/navbar"
import { Info, Loader, Play } from "lucide-react"
import useTrendingContent from "../../hooks/useTrendingContent"
import { MOVIE_CATEGORIES, ORIGINAL_IMAGE_BASE_URL, TV_CATEGORIES } from "../../utils/constants"
import { useContentStore } from "../../store/content"
import MovieSlider from "../../components/movieslider"

const HomeScreen = () => {
  const { trendingContent }= useTrendingContent();
  const {contentType}=useContentStore();
  if(!trendingContent) return(
    <div className='h-screen'>
    <div className="flex justify-center items-center bg-black h-full">
      <Loader className='animate-spin text-red-600 size-10'/>
    </div>
  </div>
  )
  return (
    <>
        <div className="relative h-screen text-white">
      <Navbar/>
      <img src={ORIGINAL_IMAGE_BASE_URL+trendingContent?.backdrop_path}
      alt="hero img" 
      className="absolute top-0 left-0 w-full h-full object-cover -z-50"
      />
      <div className="absolute top-0 left-0 w-full h-full  bg-black/50 object-cover -z-50"
       aria-hidden="true" 
      /> 
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:p-32">
        <div
              className='bg-gradient-to-b from-black via-transparent to-transparent 
            absolute w-full h-full top-0 left-0 -z-10'
            />
        <div className="max-w-2xl">
          <h1 className="mt-4 text-6xl font-extrabold text-balance">
            {trendingContent?.title|| trendingContent?.name}
          </h1>
          <p className="mt-2 text-lg">{trendingContent?.release_date?.split("-")[0] ||
								trendingContent?.first_air_date.split("-")[0]}{" "}
							| {trendingContent?.adult ? "18+" : "PG-13"}</p>
          <p className="mt-4 text-lg">
          {trendingContent?.overview.length > 250
								? trendingContent?.overview.slice(0, 200) + "..."
								: trendingContent?.overview}
          </p>
        </div>
        <div className="flex mt-8">
          <Link to={`/watch/${trendingContent?.id}`}
          className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
							 items-center">
          <Play className="size-6 mr-2 fill-black"/>
          Play
          </Link>
          <Link to={`/watch/${trendingContent?.id}`}
          className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded-none flex items-center">
          <Info className="size-6 mr-2"/>
          More Info
          </Link>
        </div>
      </div>
      <div/>
    </div>
    <div className="flex flex-col col-10 bg-black py-10">
      {contentType==="movie"?(MOVIE_CATEGORIES.map((category)=><MovieSlider key={category} category={category}/>)):(TV_CATEGORIES.map((category)=><MovieSlider key={category} category={category}/>))}
    </div>
    </>
  )
}

export default HomeScreen
