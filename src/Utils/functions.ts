import { IUser } from "../Models/user";

export const JWTStorageName: string = "jwtUser";

export const getCurrentUserJWT = (): string | null => {
    return localStorage.getItem(JWTStorageName);
};

const avatarColors: string[] = ['#FF4500', '#0078d4', '#4CAF50', '#FFC107', '#9C27B0', '#E91E63',
    '#2196F3', '#FF5722', '#673AB7', '#03A9F4'];

export const getColorByFullName = (fullName: string): string => {
    const colorIndex: number = (fullName.length + fullName.charCodeAt(0) + fullName.charCodeAt(fullName.length - 1)) % avatarColors.length;
    return avatarColors[colorIndex];
};

export const getInitialsFromUser = (user: IUser): string => {
    return `${user.firstName.charAt(0)} ${user.lastName.charAt(0)}`;
};

export const getFullNameUser = (user: IUser): string => {
    return `${user.firstName} ${user.lastName}`;
};

export const compareStringsLexicographically = (str1: string, str2: string): number => {
    const minLength = Math.min(str1.length, str2.length);

    for (let i = 0; i < minLength; i++) {
        const charCode1 = str1.charCodeAt(i);
        const charCode2 = str2.charCodeAt(i);

        if (charCode1 < charCode2) {
            return -1;
        } else if (charCode1 > charCode2) {
            return 1;
        }
    }

    if (str1.length < str2.length) {
        return -1;
    } else if (str1.length > str2.length) {
        return 1;
    }

    return 0;
};