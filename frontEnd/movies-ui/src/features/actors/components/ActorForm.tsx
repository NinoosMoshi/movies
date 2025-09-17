import { useForm, type SubmitHandler } from "react-hook-form"
import type ActorCreation from "../models/ActorCreation"
import Button from "../../../components/Button";
import { NavLink } from "react-router";
import firstLetterUppercase from "../../../validations/firstLetterUppercase";
import * as yup from 'yup';
import dateMustNotBeInTheFuture from "../../../validations/dateMustNotBeInTheFuture";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ActorForm(props: ActorFormProps) {

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<ActorCreation>({
        resolver: yupResolver(validationRules),
        mode: 'onChange',
        defaultValues: props.model ?? { name: '' }
    });

    return (
        <>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input autoComplete="off" className="form-control" id="name"  {...register("name")} />
                    {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input type="date" autoComplete="off" className="form-control" {...register("dateOfBirth")} />
                    {errors.dateOfBirth && <span className="text-danger">{errors.dateOfBirth.message}</span>}
                </div>

                <div className="mt-2">
                    <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Sending...' : 'Send'}</Button>
                    <NavLink className="btn btn-secondary ms-2" to="/actors">Cancel</NavLink>
                </div>
            </form>
        </>
    )
}

interface ActorFormProps {
    onSubmit: SubmitHandler<ActorCreation>;
    model?: ActorCreation;
}

const validationRules = yup.object({
    name: yup.string().required("The name is required").test(firstLetterUppercase()),
    dateOfBirth: yup.string().required("The date of birth is required").test(dateMustNotBeInTheFuture())
})


