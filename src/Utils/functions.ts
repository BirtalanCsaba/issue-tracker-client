import Cookies from "js-cookie"

export const GetCurrentUserJWT = (): string | undefined => {
    return Cookies.get("userJWT");
};