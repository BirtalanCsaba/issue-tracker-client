import { IPhase } from "../Models/phase";
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

export const comparePhases = (phase1: IPhase, phase2: IPhase): number => {
    return phase1.rank < phase2.rank ? -1 : phase1.rank === phase2.rank ? 0 : 1;
};

export const isUserAuthenticated = (): boolean => {
    return localStorage.getItem(JWTStorageName) != null && localStorage.getItem(JWTStorageName) != undefined;
};