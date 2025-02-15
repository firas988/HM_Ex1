// a middleware function that logs the method, url, data and time of each incoming request
const logger = (req, res, next) => {
  console.log(
    `Method :${req.method}\nUrl:${
      req.url
    }\nData and Time : [${new Date().toLocaleString()}]`
  );
  next();
};
module.exports = logger;

