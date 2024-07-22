import { ExpressResponse } from "./ReqRes";

function sendResponse(res:ExpressResponse,statusCode: number,message: string,data: any = null,error: any = null){
    const response = {
        success: statusCode >= 200 && statusCode <= 500,
        message,
        error,
        data: null,
    }

    if (data !== null && data !== undefined) {
        response.data = data;
      }
    
    res.status(statusCode).json(response);
}

export default sendResponse;