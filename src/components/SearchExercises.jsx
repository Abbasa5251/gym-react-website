import React, { useState, useEffect } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import HorizontalScrollbar from "../components/HorizontalScrollbar";
import { exerciseOptions, fetchData } from "../utils/fetchData";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
	const [search, setSearch] = useState("");
	const [bodyParts, setBodyParts] = useState([]);

	useEffect(() => {
		const fetchExerciseData = async () => {
			const bodyPartsData = await fetchData(
				"https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
				exerciseOptions
			);
			setBodyParts(["all", ...bodyPartsData]);
		};

		fetchExerciseData();
	}, []);

	const handleSearch = async () => {
		if (search) {
			const exerciseData = await fetchData(
				"https://exercisedb.p.rapidapi.com/exercises",
				exerciseOptions
			);

			const filteredExercises = exerciseData.filter(
				(exercise) =>
					exercise.name
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					exercise.target
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					exercise.equipment
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					exercise.bodyPart
						.toLowerCase()
						.includes(search.toLowerCase())
			);
			setSearch("");
			setExercises(filteredExercises);
		}
	};

	return (
		<Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
			<Typography
				fontWeight={700}
				sx={{ fontSize: { lg: "44px", xs: "30px" } }}
				mb="50px"
				textAlign="center"
			>
				Awesome Exercises you <br />
				Should know
			</Typography>
			<Box position="relative" mb="72px">
				<TextField
					sx={{
						input: {
							fontWeight: "700",
							border: "none",
							borderRadius: "4px",
						},
						width: { lg: "800px", xs: "350px" },
						backgroundColor: "#fff",
						borderRadius: "40px",
					}}
					height="76px"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
					placeholder="Search Exercises"
					type="text"
				/>
				<Button
					sx={{
						bgcolor: "#FF2625",
						color: "#FFF",
						textTransform: "none",
						width: { lg: "175px", xs: "80px" },
						fontSize: { lg: "20px", xs: "14px" },
						height: "56px",
						position: "absolute",
						right: "0",
					}}
					onClick={handleSearch}
					className="search-btn"
				>
					Search
				</Button>
			</Box>
			<Box sx={{ position: "relative", width: "100%", p: "20px" }}>
				<HorizontalScrollbar
					data={bodyParts}
					bodyPart={bodyPart}
					setBodyPart={setBodyPart}
					isBodyParts={true}
				/>
			</Box>
		</Stack>
	);
};

export default SearchExercises;
