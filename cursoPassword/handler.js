'use strict';
const verifyPasswordLength = require('./constraints/verifyPasswordLength');
const verifypasswordstrength = require('./constraints/verifypasswordstrength');


module.exports.password = async event => {
  try{
    const{password} = event.pathParameters;
    await verifyPasswordLength(password);
    const score = await verifypasswordstrength(password);
    return{
      statusCode:200,
      body: JSON.stringify({
        message: 'Password Score : ' + score.score
      })
    }
  }
  catch(e)
  {
    return{
      statusCode:400,
      body: JSON.stringify({
        message: 'Error: '+ e.message,
        score: e.score
      })
    }
  }

};
