/**
 * This module exports an object containing HTTP status codes.
 * Each property of the object corresponds to a specific HTTP status code
 * and its associated numeric value.
 * @module statusCodes
 */
const statusCodes={
    // 2XX Successful responses
    OK : 200,
    CREATED : 201,
    ACCEPTED : 202,
    NO_CONTENT : 204,
    PARTIAL_CONTENT : 206,
    Already_Reported : 208,
    IM_USED : 226,
    // 3XX Redirection responses
    MULTIPLE_CHOICES : 300,
    MOVED_PERMANENTLY : 301,
    FOUND : 302,
    SEE_OTHER : 303,
    NOT_MODIFIED : 304,
    TEMPORARY_REDIRECT : 307,
    PERMANENT_REDIRECT : 308,
    // 4XX Client error responses
    BAD_REQUEST : 400,
    UNAUTHORIZED : 401,
    FORBIDDEN : 403,
    NOT_FOUND : 404,
    CONFLICT : 409,
    Method_Not_Allowed : 405,
    REQUEST_TIMEOUT : 408,
    PRECONDITION_FAILED : 412,
    UNPROCESSABLE_ENTITY : 422,
    TOO_MANY_REQUESTS : 429,

    // 5XX Server error responses
    INTERNAL_SERVER_ERROR : 500,
    SERVICE_UNAVAILABLE : 503,
    GATEWAY_TIMEOUT : 504,
    NOT_IMPLEMENTED : 501,
    BAD_GATEWAY : 502,
    NETWORK_AUTHENTICATION_REQUIRED : 511
}

export default statusCodes;
module.exports=statusCodes;