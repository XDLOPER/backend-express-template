import jwt from 'jsonwebtoken'

export default function authenticateToken(req, res, next) {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.userID = data?.id;
      next();
    });
 
 
  } catch (error) {
    res.status(500).send({message:error.message + " " + 'Birşeyler ters gitti. '})
  }
}
