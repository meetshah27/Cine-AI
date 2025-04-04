import {fetchFromTmdb} from "../service/tmdb.service.js";
import {fetchMovieUrl} from "../config/moviefetchurl.url.js";
export async function getTrendingMovie(req,res) 
{
    try
    {
        const response=await fetchFromTmdb(fetchMovieUrl.trending_movies);
        const RandomMovie=response.results[Math.floor(Math.random() * response.results?.length) - 1];
        res.send({success:true, content:RandomMovie});
    }
    catch (error) 
    {   
        console.error(error);
        res.status(500).send(error.message);
    }
}
export async function getMovieTrailers(req,res) 
{
    try
    {
        const movieId=req.params.id;
        const response=await fetchFromTmdb(fetchMovieUrl.movie_trailers.replace("movie_id",movieId));
        res.send({success:true, content:response.results});
    }
    catch (error) 
    {
        if(error.response?.status===404)
        {
            return res.status(404).send("Movie not found");
        }
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getMovieDetails(req,res) 
{
    try
    {
        const movieId=req.params.id;
        const response=await fetchFromTmdb(fetchMovieUrl.movie_details.replace("movie_id",movieId));
        res.send({success:true, content:response});
    }
    catch (error) 
    {
        if(error.response?.status===404)
        {
            return res.status(404).send("Movie Details not Available!!");
        }
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getSimilarMovies(req,res) 
{
    try
    {
        const movieId=req.params.id;
        const response=await fetchFromTmdb(fetchMovieUrl.similar_movies.replace("movie_id",movieId));
        res.send({success:true, content:response});
    }
    catch (error) 
    {
        if(error.response?.status===404)
        {
            return res.status(404).send("Movie Details not Available!!");
        }
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function getMoviesByCategory(req,res) 
{
    try
    {
        const category=req.params.category;
        const response=await fetchFromTmdb(fetchMovieUrl.movie_category.replace("category",category));
        res.send({success:true, content:response.results});
    }
    catch (error) 
    {
        if(error.response?.status===404)
        {
            return res.status(404).send("Movie Details not Available!!");
        }
        console.error(error);
        res.status(500).send(error.message);
    }
}