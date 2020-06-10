const jwt = require('jsonwebtoken');
const { appSecret } = require('../../../config');
const { handleError } = require('../requestHandler');
const { get } = require('../../../dbservice/user');

const appURI = '/v1';
const skipUrls = [
  '/auth/login',
  '/auth/register',
];

module.exports.isAuthenticated = async function isAuthenticated(
  req,
  res,
  next,
) {
    // console.log('this req url is..',req.url)
  const url = req.url.replace(appURI, '').split('?')[0];
//   console.log('hhhhhhhh',url)
  let token;
  if (skipUrls.indexOf(url) !== -1) return next();
  if (req.headers.authorization !== undefined) {
    token = req.headers.authorization.split(' ')[1];
  }
  try {
    const user = await jwt.verify(token, appSecret);
    console.log('user is',user);
    // console.log('req is',req)
    req.user = await get(user._id, '_id');
    console.log('req user',req.user);
    if (!req.user) throw 'Invalid token,No user exists';
    if (req.user.token !== token) {
      throw 'Your login session has expired';
    }
    return next();
  } catch (err) {
    return handleError({ res, err, statusCode: 401 });
  }
};
