const mysql = require('../dbconfig');

module.exports = {
async createConsultationReq (consultationReq) {
  console.log(consultationReq);
  let sql = "INSERT INTO consultationRequests SET undergraduate_email=data.undergraduate_email, consultation_id=data.consultation_id";
  console.log(sql);
  let result = mysql.query(sql, consultationReq, (err) => {
    if (err) {
      throw err;
    }
  });

    if(result) {
      return {
        data: consultationReq,
        message: "Consultation Request Sent!"
    };
  }
return "Error Sending Consultation Request"
},

async getPendingRequests ()  {
  let sql = "SELECT * FROM consultationRequests cr, undergraduates u,consultation c WHERE c.requestStatus=0 and cr.undergraduate_email=u.email and cr.consultation_id=c.consultationId";
  let result = await mysql.query(sql);

  if(result)  {
    return result;
  }
  return "Error fetching consultation Requests from db"
},

async getScheduledSessions()  {
  let sql = "SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,Date(c.sessionDate) as sessionDate ,c.sessionTime,co.consultantFName,co.consultantLName FROM consultationRequests cr, undergraduates u,consultation c, consultationRequestprovide cp, consultants co WHERE c.requestStatus=1 and cr.undergraduate_email=u.email and cr.consultation_id=c.consultationId and cp.consultation_id=c.consultationId and cp.consultantId=co.consultantId";
  let result = await mysql.query(sql);

  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
}
	
};