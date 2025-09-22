import { useParams } from "react-router";
import TheaterForm from "./TheaterForm";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import type TheaterCreation from "../models/TheaterCreation.model";
import type { SubmitHandler } from "react-hook-form";


export default function EditTheater() {

    const { id } = useParams();
    const [model, setModel] = useState<TheaterCreation | undefined>(undefined);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setModel({
                name: 'Chicago ' + id, latitude:
                    41.885489522211444, longitude: -87.62719452381134
            });
        }, 1000);

        return () => clearTimeout(timerId);
    }, [id]);

    const onSubmit: SubmitHandler<TheaterCreation> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(data);
    }

    return (
        <>
            <h3>Edit Theater</h3>
            {model ? <TheaterForm onSubmit={onSubmit} model={model} /> : <Loading />}
        </>
    )
}
