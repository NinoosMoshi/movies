import { yupResolver } from "@hookform/resolvers/yup";
import firstLetterUppercase from "../../../validations/firstLetterUppercase";
import type TheaterCreation from "../models/TheaterCreation.model"
import * as yup from 'yup';
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router";
import Button from "../../../components/Button";
import Map from "../../../components/map/Map";
import type Coordinate from "../../../components/map/coordinate.model";


export default function TheaterForm(props: TheaterFormProps) {

    const { register, handleSubmit, setValue,
        formState: { errors, isValid, isSubmitting }
    } = useForm<TheaterCreation>({
        resolver: yupResolver(validationRules),
        mode: 'onChange',
        defaultValues: props.model ?? { name: '' }
    });


    function transformCoordinate(): Coordinate[] | undefined {
        if (props.model) {
            const response: Coordinate = {
                lat: props.model.latitude,
                lng: props.model.longitude
            }
            return [response];
        }
        return undefined;
    }


    return (
        <>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input autoComplete="off" className="form-control" id="name"  {...register("name")} />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>

                <div className="mt-2">
                    <Map coordinates={transformCoordinate()} setCoordinate={coordinate => {
                        setValue("latitude", coordinate.lat, {
                            shouldValidate: true
                        });

                        setValue("longitude", coordinate.lng, {
                            shouldValidate: true
                        });
                    }} />
                </div>

                <div className="mt-2">
                    <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Sending...' : 'Send'}</Button>
                    <NavLink className="btn btn-secondary ms-2" to="/theaters">Cancel</NavLink>
                </div>
            </form>
        </>
    )
}

interface TheaterFormProps {
    onSubmit: SubmitHandler<TheaterCreation>
    model?: TheaterCreation
}

const validationRules = yup.object({
    name: yup.string().required("The name is required").test(firstLetterUppercase()),
    latitude: yup.number().required("The latitude is required"),
    longitude: yup.number().required("The longitude is required")
})
