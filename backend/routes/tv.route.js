import express from 'express';
import {getTrendingTvShows,
    getTvShowsTrailers,
    getTvShowsDetails,
    getSimilarTvShows,
    getTvShowsByCategory} from '../controller/tv.controller.js';
const router = express.Router();
router.get("/trending",getTrendingTvShows);
router.get("/:id/trailers", getTvShowsTrailers);
router.get("/:id/details", getTvShowsDetails);
router.get("/:id/similartvshows", getSimilarTvShows);
router.get("/:category", getTvShowsByCategory);
export default router;