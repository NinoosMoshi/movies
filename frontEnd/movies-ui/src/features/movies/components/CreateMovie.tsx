import type { SubmitHandler } from "react-hook-form";
import type MovieCreation from "../models/MovieCreation.model";
import MovieForm from "./MovieForm";

export default function CreateMovie() {

    const onSubmit: SubmitHandler<MovieCreation> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(data);
    }

    return (
        <>
            <h3>Create Movie</h3>
            <MovieForm onSubmit={onSubmit} />
        </>
    )
}
