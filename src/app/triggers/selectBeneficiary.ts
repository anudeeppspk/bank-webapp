import { Subject } from "rxjs";


class SelectBeneficiary {

    private static subject = new Subject();

    static trigger = (value: any) => {
        SelectBeneficiary.subject.next(value)
    }

    static subscribe = (fn: any) => {
        SelectBeneficiary.subject.subscribe(fn);
    }
    
}

export default SelectBeneficiary;