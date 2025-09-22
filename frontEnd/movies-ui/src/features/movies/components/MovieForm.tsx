
import { useForm, type SubmitHandler } from "react-hook-form"
import type MovieCreation from "../models/MovieCreation.model"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../components/Button";
import { NavLink } from "react-router";
import SelectImage from "../../../components/selectImage/SelectImage";
import type Genre from "../../genres/models/Genre.model";
import type MultipleSelectionDTO from "../../../components/multipleSelection/MultipleSelectionDTO.model";
import { useState } from "react";
import MultipleSelection from "../../../components/multipleSelection/MultipleSelection";
import type Theater from "../../theaters/models/Theater.model";
import TypeAheadActors from "./TypeAheadActors";
import type MovieActor from "../models/MovieActor.model";



export default function MovieForm(props: MovieFormProps) {

    const [nonSelectedGenres, setNonSelectedGenres] = useState(toMultipleSelection(props.nonSelectedGenres));
    const [selectedGenres, setSelectedGenres] = useState(toMultipleSelection(props.selectedGenres));

    const [nonSelectedTheaters, setNonSelectedTheaters] = useState(toMultipleSelection(props.nonSelectedTheaters));
    const [selectedTheaters, setSelectedTheaters] = useState(toMultipleSelection(props.selectedTheaters));

    const [selectedActors, setSelectedActors] = useState(props.selectedActors);


    const { register, handleSubmit, setValue,
        formState: { errors, isValid, isSubmitting }
    } = useForm<MovieCreation>({
        resolver: yupResolver(validationRules),
        mode: 'onChange',
        defaultValues: props.model ?? { title: '' }
    });

    function toMultipleSelection(array: { id: number, name: string }[]): MultipleSelectionDTO[] {
        return array.map(value => {
            return {
                key: value.id,
                description: value.name
            }
        })
    }

    const currrentImageURL: string | undefined = props.model?.poster ? props.model.poster as string : undefined;

    const onSubmit: SubmitHandler<MovieCreation> = data => {
        data.genresIds = selectedGenres.map(item => item.key);
        data.theatersIds = selectedTheaters.map(item => item.key);
        data.actors = selectedActors;

        return props.onSubmit(data);
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Title</label>
                    <input autoComplete="off" className="form-control" id="name"  {...register("title")} />
                    {errors.title && <span className="text-danger">{errors.title.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Realese Date</label>
                    <input autoComplete="off" type="date" className="form-control" id="name"  {...register("releaseDate")} />
                    {errors.releaseDate && <span className="text-danger">{errors.releaseDate.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="trailer">Trailer (Youtube)</label>
                    <input autoComplete="off" className="form-control" id="trailer"  {...register("trailer")} />
                </div>

                <SelectImage imageUrl={currrentImageURL} selectedImage={image => setValue("poster", image)} />

                <div className="form-group">
                    <label >Genres:</label>
                    <MultipleSelection
                        selected={selectedGenres}
                        nonSelected={nonSelectedGenres}
                        onChange={(selected, nonSelected) => {
                            setSelectedGenres(selected);
                            setNonSelectedGenres(nonSelected);
                        }} />
                </div>

                <div className="form-group">
                    <label >Theaters:</label>
                    <MultipleSelection
                        selected={selectedTheaters}
                        nonSelected={nonSelectedTheaters}
                        onChange={(selected, nonSelected) => {
                            setSelectedTheaters(selected);
                            setNonSelectedTheaters(nonSelected);
                        }} />
                </div>

                <div className="form-group">
                    <TypeAheadActors
                        actors={selectedActors}
                        onAdd={actors => {
                            setSelectedActors(actors);
                            setValue("actors", actors);
                        }}
                        onRemove={(actor) => {
                            const actors = selectedActors.filter(ca => ca != actor);
                            setSelectedActors(actors);
                            setValue("actors", actors);
                        }}
                        onCharacterChange={(id, character) => {
                            const index = selectedActors.findIndex(ca => ca.id === id);

                            const actors = [...selectedActors];
                            actors[index].character = character;
                            setSelectedActors(actors);
                            setValue("actors", actors);
                        }}
                    />
                </div>

                <div className="mt-2">
                    <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Sending...' : 'Send'}</Button>
                    <NavLink className="btn btn-secondary ms-2" to="/">Cancel</NavLink>
                </div>
            </form>
        </>
    )
}

interface MovieFormProps {
    onSubmit: SubmitHandler<MovieCreation>
    model?: MovieCreation
    nonSelectedGenres: Genre[];
    selectedGenres: Genre[];
    nonSelectedTheaters: Theater[];
    selectedTheaters: Theater[];
    selectedActors: MovieActor[];
}

const validationRules = yup.object({
    title: yup.string().required("The title is required"),
    releaseDate: yup.string().required("The release date is required")

})