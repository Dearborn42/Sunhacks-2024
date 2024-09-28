export default function isAuthenticated(req, res, next) {
  if(req.headers.access){
    return next();
  }
  return res.status(401).json({success: false, message: "Not logged in"});
}