
import { useForm, type SubmitHandler } from "react-hook-form";
import type FilterMoviesDTO from "../models/FilterMoviesDTO.model";
import type Genre from "../../genres/models/Genre.model";
import Button from "../../../components/Button";

export default function FilterMovies() {

    const initialValues: FilterMoviesDTO = {
        title: '',
        genreId: 0,
        upcaomingReleases: false,
        inTheaters: false
    }

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FilterMoviesDTO>({
        defaultValues: initialValues
    });

    const onSubmit: SubmitHandler<FilterMoviesDTO> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(data);
    }

    const genres: Genre[] = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Comedy' },
        { id: 3, name: 'Drama' },
        { id: 4, name: 'Horror' },
        { id: 5, name: 'Romance' },
        { id: 6, name: 'Sci-Fi' },
        { id: 7, name: 'Thriller' },
        { id: 8, name: 'War' },
        { id: 9, name: 'Western' },
    ]

    return (
        <>
            <h3>Filter Movies</h3>
            <form className="row row-cols-lg-auto g-3 align-items-center"
                onSubmit={handleSubmit(onSubmit)}>

                <div className="col-12">
                    <input className="form-control" autoComplete="off" placeholder="Movie title" {...register("title")} />
                </div>
                <div className="col-12">
                    <select className="form-select" {...register("genreId")}>
                        <option value="0">--Select a genre--</option>
                        {genres.map((genre) => {
                            return <option key={genre.id} value={genre.id}>{genre.name}</option>
                        })}
                    </select>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="upcaomingReleases"
                            {...register("upcaomingReleases")} />
                        <label className="form-check-label" htmlFor="upcaomingReleases">
                            Upcoming Releases
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="inTheaters"
                            {...register("inTheaters")} />
                        <label className="form-check-label" htmlFor="inTheaters">
                            In Theaters
                        </label>
                    </div>
                </div>

                <div className="col-12">
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Filtering...' : 'Filter'}</Button>
                    <Button className="btn btn-danger ms-2" onclick={() => reset()} >Reset</Button>
                </div>

            </form>
        </>
    )
}
