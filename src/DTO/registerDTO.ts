import { ILoginDTO } from "./loginDTO";

export interface IRegisterDTO extends ILoginDTO {
    firstName: string;
    lastName: string;
};