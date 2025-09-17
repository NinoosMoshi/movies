import { useEffect } from "react";
import { Navigate, useLocation } from "react-router";

export default function HandleRouteNotFound() {

    const location = useLocation(); // get the current location

    useEffect(() => {
        console.log(`Route not found: ${location.pathname}`)
    }, [location]) // run this effect when the location changes

    return <Navigate to="/" />
}
