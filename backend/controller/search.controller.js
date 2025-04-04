import { SearchFetchUrl } from "../config/searchfetch.url.js";
import {User} from "../models/user.models.js";
import { fetchFromTmdb } from "../service/tmdb.service.js";
export async function searchPerson (req, res)
{
    try
    {
        const query = req.params.query;
        const response =await fetchFromTmdb(SearchFetchUrl.searchByPerson.replace("queryval", query));
        if (!response)
        {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {$push: {searchHistory:{id:response.results[0].id,
            image:response.results[0].profile_path,
            title:response.results[0].name,
            searchType:"Person",
            createdAt:new Date(),
        }}});
        res.status(200).json({success: true, content: response.results});
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send({error: 'Internal Server Error'});
    }
}
export async function searchMovie (req, res)
{
    try
    {
        const query = req.params.query;
        const response =await fetchFromTmdb(SearchFetchUrl.searchByMovie.replace("queryval", query));
        if (!response)
        {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {$push: {searchHistory:
            {id:response.results[0].id,
            image:response.results[0].poster_path,
            title:response.results[0].title,
            searchType:"Movie",
            createdAt:new Date(),
        }}});
        res.status(200).json({success: true, content: response.results});
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send({error: 'Internal Server Error'});
    }
}
export async function searchTv (req, res)
{
    try
    {
        const query = req.params.query;
        const response =await fetchFromTmdb(SearchFetchUrl.searchByTv.replace("queryval", query));
        if (!response)
        {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {searchHistory:
            {id:response.results[0].id,
            image:response.results[0].poster_path,
            title:response.results[0].name,
            searchType:"Tv",
            createdAt:new Date(),
        }}});
        res.status(200).json({success: true, content: response.results});
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send({error: 'Internal Server Error'});
    }
}

export async function searchHistory (req, res)
{
    try{
        res.status(200).json({success: true, content:req.user.searchHistory});
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send({error: 'Internal Server Error'});
    }
}

export async function deleteSearchHistory (req, res)
{
    try
    {
        let id=req.params.id
        id=parseInt(id);
        await User.findByIdAndUpdate(req.user._id, 
            {$pull: 
                {searchHistory:{id:id,}}});
        res.status(200).json({success: true, message: "Search history deleted successfully"});
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send({error: 'Internal Server Error'});
    }   
}
