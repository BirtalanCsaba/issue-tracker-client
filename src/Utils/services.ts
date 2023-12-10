import axios, { AxiosResponse } from "axios";
import { ILoginDTO } from "../DTO/loginDTO";
import { IRegisterDTO } from "../DTO/registerDTO";
import { IReadIssueDTO } from "../DTO/readIssueDTO";
import { IIsue } from "../Models/issue";
import { Priority } from "../Enums/priority";
import { IReadIssuePhaseDTO } from "../DTO/readIssuePhase";
import { IIssuePhase } from "../Models/issuePhase";

const BASE_URL = "https://localhost:44368/api/";

export namespace AuthorizationService {
    export const LoginUser = (loginDTO: ILoginDTO) => {
        return axios.post(`${BASE_URL}Authorization/login`, loginDTO);
    };

    export const RegisterUser = (registerDTO: IRegisterDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Authorization/register`, registerDTO);
    };

    export const LogoutUser = (): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}Authorization/logout`);
    };

    // export const RefreshToken = (dto: IBaseDTO): Promise<AxiosResponse<any, any>> => {
    //     return axios.post(`${BASE_URL}Authorization/refreshToken`, dto);
    // }
};

export namespace IssuesService {
    export const ReadIssue = (readIssueDTO: IReadIssueDTO) => {
        // return axios.post(`${BASE_URL}Issues/read`);
        const issue: IIsue = {
            issueId: 'here',
            title: 'Issue',
            description: 'Interesting\nNeed new implementation',
            priority: Priority.Priority3,
            hoursWorked: 25,
            notes: 'dsan dsabsua dbash\nhduasbdas dbaybasd bdyasbdas'
        }
        return issue;
    }
};

export namespace IssuePhasesService {
    export const ReadIssuePhase = (readIssuePhaseDTO: IReadIssuePhaseDTO) => {
        // return axios.post(`${BASE_URL}IssuePhases/read`);
        const issuePhase: IIssuePhase = {
            issuePhaseId: 'here',
            name: 'Testing',
            issues: [
                {
                    issueId: '1',
                    title: 'Problem 1'
                },
                {
                    issueId: '2',
                    title: 'Problem 2'
            }]
        };
        return issuePhase;
    }
};