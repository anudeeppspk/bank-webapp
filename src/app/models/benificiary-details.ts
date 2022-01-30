export interface benificiary {
    position: number;
    benAccNum: string;
    name: string;
    nickname: string;
}

export interface BenificiaryResponse {
    status: number;
    beneficiary: {
        receiverAccNo: string;
        name: string;
        nick_name: string;
        myAccountNumber: string;
    }[]
}

export interface BenificiaryPayload {
    receiverAccNo: string;
    name : string;
    nick_name: string;
    myAccountNumber: string;
}