import { useParams } from "react-router";
import type MovieCreation from "../models/MovieCreation.model";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import MovieForm from "./MovieForm";
import Loading from "../../../components/Loading";

export default function EditMovie() {

    const { id } = useParams();
    const [model, setModel] = useState<MovieCreation | undefined>(undefined);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setModel({ title: 'Star Wars', releaseDate: '2019-12-25', trailer: 'https://cdn.displate.com/artwork/270x380/2025-04-07/ee2fc70d82d7b4f906d2b50b4f77f6a6_11b1e5be857d6a935815bc7ab915b29d.jpg' });
        }, 1000);

        return () => clearTimeout(timerId);
    }, [id]);

    const onSubmit: SubmitHandler<MovieCreation> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(data);
    }

    return (
        <>
            <h3>Edit Movie</h3>
            {model ? <MovieForm onSubmit={onSubmit} model={model} /> : <Loading />}
        </>
    )
}
