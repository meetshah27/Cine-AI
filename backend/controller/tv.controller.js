import {fetchFromTmdb} from "../service/tmdb.service.js";
import {fetchTvUrl} from "../config/tvfetch.url.js";
export async function getTrendingTvShows(req,res) 
{
    try
    {
        const response=await fetchFromTmdb(fetchTvUrl.trending_tv_shows);
        const RandomMovie=response.results[Math.floor(Math.random() * response.results?.length) - 1];
        res.send({success:true, content:RandomMovie});
    }
    catch (error) 
    {   
        console.error(error);
        res.status(500).send(error.message);
    }
}
export async function getTvShowsTrailers(req,res) 
{
    try
    {
        const series_id=req.params.id;
        const response=await fetchFromTmdb(fetchTvUrl.tv_shows_trailers.replace("series_id",series_id));
        res.send({success:true, content:response.results});
    }
    catch (error) 
    {
        if(error.response?.status===404)
        {
            return res.status(404).send("Tv show not found");
        }
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getTvShowsDetails(req,res) 
{
    try
    {
        const series_id=req.params.id;
        const response=await fetchFromTmdb(fetchTvUrl.tv_shows_details.replace("series_id",series_id));
        res.send({success:true, content:response});
    }
    catch (error) 
    {
        if(error.response?.status===404)
        {
            return res.status(404).send("Tv Show Details not Available!!");
        }
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getSimilarTvShows(req,res) 
{
    try
    {
        const series_id=req.params.id;
        const response=await fetchFromTmdb(fetchTvUrl.similar_tv_shows.replace("series_id",series_id));
        res.send({success:true, content:response});
    }
    catch (error) 
    {
        if(error.response?.status===404)
        {
            return res.status(404).send("No similar Tv Show not Available!!");
        }
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getTvShowsByCategory(req,res) 
{
    try
    {
        const category=req.params.category;
        const response=await fetchFromTmdb(fetchTvUrl.tv_shows_category.replace("category",category));
        res.send({success:true, content:response.results});
    }
    catch (error) 
    {
        if(error.response?.status===404)
        {
            return res.status(404).send("Tv shows Category not Available!!");
        }
        console.error(error);
        res.status(500).send(error.message);
    }
}