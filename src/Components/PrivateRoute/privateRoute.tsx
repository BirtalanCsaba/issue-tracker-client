import { Navigate } from "react-router-dom";
import { IPrivateRouteProps } from "./privateRoute.types";

export default function PrivateRoute(props: IPrivateRouteProps) {
    const isAuthenticated: boolean = true;
    
    if (isAuthenticated) {
        return props.outlet;
    } else {
        return <Navigate to={{ pathname: props.authenticationPath }} />;
    }
};