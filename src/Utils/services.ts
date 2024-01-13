import axios, { AxiosResponse } from "axios";
import { ILoginDTO } from "../DTO/loginDTO";
import { IRegisterDTO } from "../DTO/registerDTO";
import { IReadIssueDTO } from "../DTO/readIssueDTO";
import { IIsue } from "../Models/issue";
import { Priority } from "../Enums/priority";
import { IReadIssuePhaseDTO } from "../DTO/readIssuePhase";
import { IPhase } from "../Models/phase";
import { url } from "inspector";
import { getCurrentUserJWT } from "./functions";
import { IKanbanShallow } from "./../Models/kanbanShallow";
import { IKanban } from "../Models/kanban";
import { ICreateKanbanDTO } from "../DTO/createKanbanDTO";
import { KanbanRole } from "../Enums/kanbanRole";

const BASE_URL = "http://localhost:8080/issue-tracker/api/v1/";

export namespace AuthorizationService {
    export const LoginUser = (loginDTO: ILoginDTO) => {
        return axios.post(`${BASE_URL}auth/login`, loginDTO);
    };

    export const RegisterUser = (registerDTO: IRegisterDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}auth/register`, registerDTO);
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
            hoursWorked: 25
        }
        return issue;
    }
};

export namespace IssuePhasesService {
    export const ReadIssuePhase = (readIssuePhaseDTO: IReadIssuePhaseDTO) => {
        // return axios.post(`${BASE_URL}IssuePhases/read`);
        const issuePhase: IPhase = {
            phaseId: 'here',
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

export namespace KanbanService {
    export const ReadAllKanbansByCurrentUser = () => {
        return axios.get(`${BASE_URL}kanban`, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });

        // const kanbans: IKanbanShallow[] = [
        //     {
        //         kanbanId: '1',
        //         title: 'Kanban 1',
        //         description: 'das dbansujda bdau dbabdas '
        //     },
        //     {
        //         kanbanId: '2',
        //         title: 'Kanban 2',
        //         description: 'dsan jdsanujdsa dasbuasd dasbudas '
        //     },
        //     {
        //         kanbanId: '3',
        //         title: 'Kanban 3',
        //         description: 'gijmri gjrngr grjngr ejdsn jef '
        //     },
        //     {
        //         kanbanId: '4',
        //         title: 'Kanban 4',
        //         description: 'jfinfer jfrnruenref refnbrubreubgr\ndasdsa daas\ndaasdasasd daas'
        //     },
        //     {
        //         kanbanId: '5',
        //         title: 'Kanban 5',
        //         description: 'enfifne fbeujebf fejebfujebfuef feberuj '
        //     },
        // ]

        // return kanbans;
    };

    export const ReadKanbanById = (kanbanId: string) => {
        // return axios.get(`${BASE_URL}kanban/readById/?id=${kanbanId}`, {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Authorization': `Bearer ${GetCurrentUserJWT()}`
        //     }
        // });

        const kanban: IKanban = {
            id: 1,
            title: 'Kanban 1',
            description: 'das dbansujda bdau dbabdas ',
            admins: [],
            participants: [],
            ownerId: 1,
            role: KanbanRole.OWNER,
            phases: [
                {
                    phaseId: '1',
                    name: 'Developing',
                    issues: [
                        {
                            issueId: '1',
                            title: 'Problem 1'
                        },
                        {
                            issueId: '2',
                            title: 'Problem 2'
                        },
                        {
                            issueId: '3',
                            title: 'Problem 3'
                        }]

                },
                {
                    phaseId: '2',
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

                },
                {
                    phaseId: '3',
                    name: 'Consulting',
                    issues: [
                        {
                            issueId: '1',
                            title: 'Problem 1'
                        },
                        {
                            issueId: '2',
                            title: 'Problem 2'
                        },
                        {
                            issueId: '3',
                            title: 'Problem 3'
                        }]

                },
                {
                    phaseId: '4',
                    name: 'Implementing',
                    issues: [
                        {
                            issueId: '1',
                            title: 'Problem 1'
                        },
                        {
                            issueId: '2',
                            title: 'Problem 2'
                        }]

                }
            ]
        }

        return kanban;
    };

    export const CreateKanban = (kanbanDTO: ICreateKanbanDTO) => {
        return axios.post(`${BASE_URL}kanban`, kanbanDTO, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });
    };

    export const DeleteKanban = (kanbanId: number) => {
        return axios.delete(`${BASE_URL}kanban/${kanbanId}`, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });
    };
};

export namespace UserService {
    export const ReadAllUsers = () => {
        return axios.get(`${BASE_URL}user/other`, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });
    }
};