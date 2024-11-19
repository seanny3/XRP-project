import { HttpStatus } from '@nestjs/common';

export enum HttpExceptionStatus {
  BAD_REQUEST = HttpStatus.BAD_REQUEST,
  UNAUTHORIZED = HttpStatus.UNAUTHORIZED,
  PAYMENT_REQUIRED = HttpStatus.PAYMENT_REQUIRED,
  FORBIDDEN = HttpStatus.FORBIDDEN,
  NOT_FOUND = HttpStatus.NOT_FOUND,
  METHOD_NOT_ALLOWED = HttpStatus.METHOD_NOT_ALLOWED,
  NOT_ACCEPTABLE = HttpStatus.NOT_ACCEPTABLE,
  PROXY_AUTHENTICATION_REQUIRED = HttpStatus.PROXY_AUTHENTICATION_REQUIRED,
  REQUEST_TIMEOUT = HttpStatus.REQUEST_TIMEOUT,
  CONFLICT = HttpStatus.CONFLICT,
  GONE = HttpStatus.GONE,
  LENGTH_REQUIRED = HttpStatus.LENGTH_REQUIRED,
  PRECONDITION_FAILED = HttpStatus.PRECONDITION_FAILED,
  PAYLOAD_TOO_LARGE = HttpStatus.PAYLOAD_TOO_LARGE,
  URI_TOO_LONG = HttpStatus.URI_TOO_LONG,
  UNSUPPORTED_MEDIA_TYPE = HttpStatus.UNSUPPORTED_MEDIA_TYPE,
  REQUESTED_RANGE_NOT_SATISFIABLE = HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
  EXPECTATION_FAILED = HttpStatus.EXPECTATION_FAILED,
  I_AM_A_TEAPOT = HttpStatus.I_AM_A_TEAPOT,
  MISDIRECTED = HttpStatus.MISDIRECTED,
  UNPROCESSABLE_ENTITY = HttpStatus.UNPROCESSABLE_ENTITY,
  FAILED_DEPENDENCY = HttpStatus.FAILED_DEPENDENCY,
  PRECONDITION_REQUIRED = HttpStatus.PRECONDITION_REQUIRED,
  TOO_MANY_REQUESTS = HttpStatus.TOO_MANY_REQUESTS,
  INTERNAL_SERVER_ERROR = HttpStatus.INTERNAL_SERVER_ERROR,
  NOT_IMPLEMENTED = HttpStatus.NOT_IMPLEMENTED,
  BAD_GATEWAY = HttpStatus.BAD_GATEWAY,
  SERVICE_UNAVAILABLE = HttpStatus.SERVICE_UNAVAILABLE,
  GATEWAY_TIMEOUT = HttpStatus.GATEWAY_TIMEOUT,
  HTTP_VERSION_NOT_SUPPORTED = HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
}
