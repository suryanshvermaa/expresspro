declare module "express-response"{
    export interface IRes {
        success: boolean;
        message: string;
        data: object;
    }
}

