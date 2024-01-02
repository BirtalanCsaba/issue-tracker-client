// import Cookies from "js-cookie"

export const GetCurrentUserJWT = (): string | undefined => {
    // return Cookies.get("userJWT");
    return 'jwt';
};

const avatarColors: string[] = ['#FF4500', '#0078d4', '#4CAF50', '#FFC107', '#9C27B0', '#E91E63',
    '#2196F3', '#FF5722', '#673AB7', '#03A9F4'];

export const getColorByFullName = (fullName: string): string => {
    const colorIndex: number = (fullName.length + fullName.charCodeAt(0) + fullName.charCodeAt(fullName.length - 1)) / 2 % avatarColors.length;
    return avatarColors[colorIndex];
};