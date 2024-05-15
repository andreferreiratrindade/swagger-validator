export default class QueryPropertyDTO{
    /**
     *
     */
    constructor() {
        this.isExactlyValue = false;
    }
    value !: string;
    property !: string;
    isExactlyValue !: boolean
}