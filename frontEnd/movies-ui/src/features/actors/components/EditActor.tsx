import { useParams } from "react-router";
import type ActorCreation from "../models/ActorCreation";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import ActorForm from "./ActorForm";
import type { SubmitHandler } from "react-hook-form";

export default function EditActor() {

    const { id } = useParams();


    const [model, setModel] = useState<ActorCreation | undefined>(undefined);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setModel({ name: 'Drama', dateOfBirth: '1990-01-01' });
        }, 1000);

        return () => clearTimeout(timerId);
    }, [id]);


    const onSubmit: SubmitHandler<ActorCreation> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(data);
    }



    return (
        <>
            <h3>Edit Actor</h3>
            {model ? <ActorForm onSubmit={onSubmit} model={model} /> : <Loading />}
        </>
    )
}
