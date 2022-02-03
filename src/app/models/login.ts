export interface login{
    username:string,
    password:string
} 


export interface LoginResponse {
    account: {
        accountid: number;
        accountnumber: string;
        address: string;
        balance: number;
        branchname: string;
        email: string;
        ifsccode: string;
        name: string;
        phonenumber: string;
        statusMessage?: string;
    }
    status: number;
}