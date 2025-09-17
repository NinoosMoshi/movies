import { NavLink } from "react-router";

export default function IndexTheater() {
    return (
        <>
            <h3>Create Theater</h3>
            <NavLink className="btn btn-primary" to="/theaters/create">Create Theater</NavLink>
        </>
    )
}
