import { Navigate } from "react-router-dom";
import { IPrivateRouteProps } from "./privateRoute.types";
import { isUserAuthenticated } from "../../Utils/functions";

export default function PrivateRoute(props: IPrivateRouteProps) {
    if (isUserAuthenticated())
        return props.outlet;

    return <Navigate to={{ pathname: props.authenticationPath }} />;
};