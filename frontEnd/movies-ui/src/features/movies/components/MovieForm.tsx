
import { useForm, type SubmitHandler } from "react-hook-form"
import type MovieCreation from "../models/MovieCreation.model"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../components/Button";
import { NavLink } from "react-router";
import SelectImage from "../../../components/selectImage/SelectImage";

export default function MovieForm(props: MovieFormProps) {

    const { register, handleSubmit, setValue,
        formState: { errors, isValid, isSubmitting }
    } = useForm<MovieCreation>({
        resolver: yupResolver(validationRules),
        mode: 'onChange',
        defaultValues: props.model ?? { title: '' }
    });

    const currrentImageURL: string | undefined = props.model?.poster ? props.model.poster as string : undefined;

    return (
        <>
            <form onSubmit={handleSubmit(props.onSubmit)}>
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
}

const validationRules = yup.object({
    title: yup.string().required("The title is required"),
    releaseDate: yup.string().required("The release date is required")

})