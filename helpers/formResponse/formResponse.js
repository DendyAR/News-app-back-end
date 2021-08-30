const formResponse = (message, status, result) => {
    return result !== null
      ? {
          message: message,
          statusCode: status,
          data: result,
        }
      : {
          message: message,
          statusCode: status,
        };
  };
  
  module.exports = formResponse;
  