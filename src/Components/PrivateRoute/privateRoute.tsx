import { Navigate } from "react-router-dom";
import { IPrivateRouteProps } from "./privateRoute.types";
import { JWTStorageName } from "../../Utils/functions";

export default function PrivateRoute(props: IPrivateRouteProps) {
    const isAuthenticated: boolean = localStorage.getItem(JWTStorageName) != null && localStorage.getItem(JWTStorageName) != undefined;
    
    if (isAuthenticated) {
        return props.outlet;
    } else {
        return <Navigate to={{ pathname: props.authenticationPath }} />;
    }
};