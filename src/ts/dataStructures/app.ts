import { DispatchAction } from "../globalTypes";

export class Action implements DispatchAction {
    type : string;
    payload : any;

    constructor(type : string, payload : any) {
        this.type = type;
        this.payload = payload;
    }
}