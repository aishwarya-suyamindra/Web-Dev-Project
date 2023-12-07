class CustomHTTPError extends Error {
    httpStatus;

    constructor(message, status) {
      super(message);
      this.httpStatus = status;
    }
}

export default CustomHTTPError