import HttpStatusCode from "../constants/HttpStatusCode";
export default class RetornoRequest{
    

    public static Response(result: any, error: any, res: any, statusCode: HttpStatusCode){

        res.status(statusCode);
        var retorno = {
            obj: result,
            ok: res.statusCode == HttpStatusCode.OK,
            error: error
        }
        return res.json(retorno);
    }
}