import axios, { AxiosResponse } from "axios";
import { IAddPhaseDTO } from "../DTO/addPhaseDTO";
import { ICreateKanbanDTO } from "../DTO/createKanbanDTO";
import { ILoginDTO } from "../DTO/loginDTO";
import { IReadIssueDTO } from "../DTO/readIssueDTO";
import { IRegisterDTO } from "../DTO/registerDTO";
import { Priority } from "../Enums/priority";
import { IIssue } from "../Models/issue";
import { getCurrentUserJWT } from "./functions";
import { ICreateIssueDTO } from "../DTO/createIssueDTO";
import { IUpdateIssueDTO } from "../DTO/updateIssueDTO";

const BASE_URL = "http://localhost:8080/issue-tracker/api/v1/";

export namespace AuthorizationService {
    export const LoginUser = (loginDTO: ILoginDTO) => {
        return axios.post(`${BASE_URL}auth/login`, loginDTO);
    };

    export const RegisterUser = (registerDTO: IRegisterDTO): Promise<AxiosResponse<any, any>> => {
        return axios.post(`${BASE_URL}auth/register`, registerDTO);
    };
};

export namespace IssuesService {
    export const CreateIssue = (createIssueDTO: ICreateIssueDTO) => {
        return axios.post(`${BASE_URL}kanban/issue`, createIssueDTO, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });
    }

    export const UpdateIssue = (updateIssueDTO: IUpdateIssueDTO) => {
        return axios.put(`${BASE_URL}kanban/issue`, updateIssueDTO, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });
    }

    export const DeleteIssue = (issueId: number) => {
        return axios.delete(`${BASE_URL}kanban/issue/${issueId}`, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });
    }
};

export namespace PhasesService {
    export const AddPhase = (addPhaseDTO: IAddPhaseDTO, kanbanId: number) => {
        return axios.post(`${BASE_URL}kanban/${kanbanId}/phase`, addPhaseDTO, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });
    }

    export const DeletePhase = (phaseId: number) => {
        return axios.delete(`${BASE_URL}kanban/phase/${phaseId}`, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });
    }
};

export namespace KanbanService {
    export const ReadAllKanbansByCurrentUser = () => {
        return axios.get(`${BASE_URL}kanban`, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });
    };

    export const ReadKanbanById = (kanbanId: number) => {
        return axios.get(`${BASE_URL}kanban/complete/${kanbanId}`, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });
    };

    export const CreateKanban = (kanbanDTO: ICreateKanbanDTO) => {
        return axios.post(`${BASE_URL}kanban`, kanbanDTO, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });
    };

    export const UpdateKanban = (kanbanDTO: ICreateKanbanDTO) => {
        return axios.put(`${BASE_URL}kanban`, kanbanDTO, {
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

    export const GetUserInfo = () => {
        return axios.get(`${BASE_URL}user/userId`, {
            headers: {
                'Authorization': `Bearer ${getCurrentUserJWT()}`
            }
        });
    }
};