import type { SubmitHandler } from "react-hook-form";
import type MovieCreation from "../models/MovieCreation.model";
import MovieForm from "./MovieForm";
import type Genre from "../../genres/models/Genre.model";
import type Theater from "../../theaters/models/Theater.model";

export default function CreateMovie() {

    const onSubmit: SubmitHandler<MovieCreation> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(data);
    }

    const nonSelectedGenres: Genre[] = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Comedy' },
        { id: 3, name: 'Drama' },
        { id: 4, name: 'Horror' },
        { id: 5, name: 'Thriller' },
        { id: 6, name: 'Sci-Fi' },
        { id: 7, name: 'Fantasy' },
        { id: 8, name: 'Adventure' },
        { id: 9, name: 'Animation' },
        { id: 10, name: 'Children' },
        { id: 11, name: 'Musical' },
        { id: 12, name: 'Romance' },
        { id: 13, name: 'Western' },
    ]

    const nonSelectedTheaters: Theater[] = [
        { id: 1, name: 'chicago', latitude: 0, longitude: 0 },
        { id: 2, name: 'Arora', latitude: 0, longitude: 0 },
    ]



    return (
        <>
            <h3>Create Movie</h3>
            <MovieForm
                onSubmit={onSubmit}
                nonSelectedGenres={nonSelectedGenres} selectedGenres={[]}
                nonSelectedTheaters={nonSelectedTheaters} selectedTheaters={[]}
                selectedActors={[]}
            />
        </>
    )
}
