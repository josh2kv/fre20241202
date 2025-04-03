import { RequestHandler } from "express";
import axios from "axios";
import "../core/evnConfig";
import logger, { loggerErr, loggerInfo } from "../core/loggerConfig";

const tmdbBaseUrl = process.env.TMDB_BASE_URL;
// const baseMovieImage = process.env.TMDB_BASE_MOVIE_IMG;
// const discoverTvPath = "discover/tv?";
const moviePath = "movie";
const tmdb_key = process.env.TMDB_KEY;

export const movieGetReqConvert = (PATH: string): RequestHandler => {
	return async (req, res) => {
		const queryObj = { ...req.query } as { [key: string]: string };

		const url = Object.entries(queryObj).reduce(
			(acc, [key, value]) => `${acc}&${key}=${value}`,
			`${tmdbBaseUrl}/${PATH}?api_key=${tmdb_key}`
		);

		const result = await axios.get(url).then((ele) => ele.data);

		logger.info(loggerInfo(`getMovie/${PATH}`, 200));
		res.status(200).json(result);
	};
};

export const getMovieById: RequestHandler = async (req, res) => {
	const url = `${tmdbBaseUrl}/${moviePath}/${req.params.id}?api_key=${tmdb_key}`;
	const result = await axios.get(url).then((ele) => ele.data);

	logger.info(loggerInfo(`getMovieById`, 200));
	res.status(200).json(result);
};

export const getDetails = (PATH: string): RequestHandler => {
	return async (req, res) => {
		const id = req.params.id;

		if (id) {
			const url = `${tmdbBaseUrl}/${moviePath}/${id}/${PATH}?api_key=${tmdb_key}`;
			const result = await axios.get(url).then((ele) => ele.data);

			logger.info(loggerInfo(`getDetails/${PATH}`, 200));
			res.status(200).json(result);
		} else {
			// expected err;
			logger.error(
				loggerErr(`getDetails/${PATH}`, 404, "Cannot found this id")
			);
			res.status(404).json({ message: "Cannot found this id" });
		}
	};
};
