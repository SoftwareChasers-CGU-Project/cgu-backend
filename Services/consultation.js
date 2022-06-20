const mysql = require('../dbconfig');

module.exports = {
async createConsultationReq (dataToConsultation,dataToConsultationRequests) {
  let check_sql=await mysql.query(`select * from undergraduates where email='${dataToConsultationRequests.undergraduate_email}'`)
  console.log(check_sql[0]);
  if(check_sql[0]==null){
    return;

  }  
 
  //console.log(consultationReq);
  let sql = `INSERT INTO consultationRequests SET undergraduate_email='${dataToConsultationRequests.undergraduate_email}', consultation_id='${dataToConsultation.consultationId}'`;
  console.log(sql);
  let result = mysql.query(sql, (err) => {
    if (err) {
      throw err;
    }
  });

    if(result) {
      return {
        // data: dataToConsultation,dataToConsultationRequests,
        message: "Consultation Request Sent!"
    };
  }
return "Error Sending Consultation Request"
},

async createConsultationReqProvide (dataToConsultation,dataToRequestprovide) {
  let check_sql=await mysql.query(`select * from undergraduates where email='${dataToConsultation.undergraduate_email}'`)
  // console.log(check_sql[0]);
  if(check_sql[0]==null){
    return;
  } 
  //console.log(consultationReq);
  let sql = `INSERT INTO consultationRequestprovide SET consultantId='${dataToRequestprovide.consultantId}', consultation_id='${dataToConsultation.consultationId}'`;
  console.log(sql);
  let result = mysql.query(sql, (err) => {
    if (err) {
      throw err;
    }
  });

    if(result) {
      return {
        // data: dataToConsultation,dataToRequestprovide,
        message: "Consultation Request Sent!"
    };
  }
return "Error Sending Consultation Request"
},


async createConsultation (dataToConsultation) {
  let check_sql=await mysql.query(`select * from undergraduates where email='${dataToConsultation.undergraduate_email}'`)
  // console.log(check_sql[0]);
  if(check_sql[0]==null){
    return;
  } 
  //console.log(consultationReq);
  let sql = `INSERT INTO consultation SET sessionType='${dataToConsultation.sessionType}', consultationId='${dataToConsultation.consultationId}'`;
  console.log(sql);
  let result = mysql.query(sql, dataToConsultation, (err) => {
    if (err) {
      throw err;
    }
  });

    if(result) {
      return {
        data: dataToConsultation,
        message: "Consultation Request Sent!"
    };
  }
return "Error Sending Consultation Request"
},

async getSessionType(consultationId)  {
  let sql = `SELECT  sessionType from consultation WHERE consultationId='${consultationId}'`;
  let result = await mysql.query(sql);

  if(result)  {
  
    return result;

  }
    return "Error fetching session type from db"
},

async getUndergradEmail(consultationId)  {
  let sql = `SELECT  undergraduate_email from consultationRequests WHERE consultation_id='${consultationId}'`;
  let result = await mysql.query(sql);

  if(result)  {
  
    return result;

  }
    return "Error fetching session type from db"
},

async displayUnderScheduled (consultation) {
  console.log(consultation+"func");
  let sql =`UPDATE consultation SET requestStatus=1 , sessionDate='${consultation.sessionDate}', sessionTime='${consultation.sessionTime}' WHERE consultationId='${consultation.consultationId}'`;
  
  console.log(sql);
  let result =  mysql.query(sql, (err) => {
    if (err) {
      throw err;
    }

  });
  if(result) {
    return {
     
      message: "Request status updated!"
  };
}
    return "Error updating the program"
},

async deleteConsultation(consultationId)  {
  
  let sql = `DELETE FROM consultation WHERE consultationId='${consultationId}'`;
  let result = await mysql.query(sql,consultationId);
  console.log(result);

  if(result)  {
    return result;
  }
  return "Error deleting consultation from db"
},

async deleteRequestProvide(consultationId)  {
  let sql = "DELETE FROM consultationRequestprovide WHERE ?";
  let result = await mysql.query(sql,consultationId);
  console.log(result);

  if(result)  {
    return result;
  }
  return "Error deleting consultation from db"
},
async deleteRequest(consultationId)  {
  let sql = "DELETE FROM consultationRequests WHERE ?";
  let result = await mysql.query(sql,consultationId);
  console.log(result);

  if(result)  {
    return result;
  }
  return "Error deleting consultation from db"
},


async getPendingRequests ()  {
  let sql = "SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,co.requestStatus,co.sessionType,c.consultantFName,c.consultantLName,cp.consultation_id FROM consultation co INNER JOIN consultationRequests cr ON co.requestStatus=0 AND co.consultationId=cr.consultation_id INNER JOIN consultationRequestprovide cp ON co.consultationId=cp.consultation_id INNER JOIN undergraduates u ON cr.undergraduate_email=u.email INNER JOIN consultants c ON cp.consultantId=c.consultantId";
  let result = await mysql.query(sql);
  //console.log(result);

  if(result)  {
    return result;
  }
  return "Error fetching consultation Requests from db"
},

async getScheduledSessions()  {
  let sql = "SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,c.sessionDate,c.sessionTime,c.sessionType,co.consultantFName,co.consultantLName, c.consultationId FROM consultationRequests cr, undergraduates u,consultation c, consultationRequestprovide cp, consultants co WHERE c.requestStatus=1 and cr.undergraduate_email=u.email and cr.consultation_id=c.consultationId and cp.consultation_id=c.consultationId and cp.consultantId=co.consultantId";
  let result = await mysql.query(sql);

  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
},



//get all Individual Career Counseling Sessions
async getIndividualSessions()  {
 
  let sql = 'SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,co.requestStatus,co.sessionType,c.consultantFName,c.consultantLName,cp.consultation_id FROM consultation co INNER JOIN consultationRequests cr ON co.requestStatus=0 AND co.sessionType="Individual Career Counseling Sessions" AND co.consultationId=cr.consultation_id INNER JOIN consultationRequestprovide cp ON co.consultationId=cp.consultation_id INNER JOIN undergraduates u ON cr.undergraduate_email=u.email INNER JOIN consultants c ON cp.consultantId=c.consultantId ';
  let result = await mysql.query(sql);
  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
},

//get all Round Table Discussions
async getRoundTableDiscussions()  {
  
  let sql = 'SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,co.requestStatus,co.sessionType,c.consultantFName,c.consultantLName,cp.consultation_id FROM consultation co INNER JOIN consultationRequests cr ON co.requestStatus=0 AND co.sessionType="Round Table Discussion" AND co.consultationId=cr.consultation_id INNER JOIN consultationRequestprovide cp ON co.consultationId=cp.consultation_id INNER JOIN undergraduates u ON cr.undergraduate_email=u.email INNER JOIN consultants c ON cp.consultantId=c.consultantId ';
  let result = await mysql.query(sql);
  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
  
},

//get all Soft Skill Development sessions
async getSoftSkillDevelopment()  {
  
  let sql = 'SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,co.requestStatus,co.sessionType,c.consultantFName,c.consultantLName,cp.consultation_id FROM consultation co INNER JOIN consultationRequests cr ON co.requestStatus=0 AND co.sessionType="Soft Skill Development" AND co.consultationId=cr.consultation_id INNER JOIN consultationRequestprovide cp ON co.consultationId=cp.consultation_id INNER JOIN undergraduates u ON cr.undergraduate_email=u.email INNER JOIN consultants c ON cp.consultantId=c.consultantId ';
  let result = await mysql.query(sql);
  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
},

//get all Sessions with an Expert in a Foreign University
async getForeignExpertSessions()  {
  
  let sql = 'SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,co.requestStatus,co.sessionType,c.consultantFName,c.consultantLName,cp.consultation_id FROM consultation co INNER JOIN consultationRequests cr ON co.requestStatus=0 AND co.sessionType="Session with an Expert in a Foreign University" AND co.consultationId=cr.consultation_id INNER JOIN consultationRequestprovide cp ON co.consultationId=cp.consultation_id INNER JOIN undergraduates u ON cr.undergraduate_email=u.email INNER JOIN consultants c ON cp.consultantId=c.consultantId ';
  let result = await mysql.query(sql);
  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
},

//get all Mockup Interviews
async getMockupInterviews()  {
  
  let sql = 'SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,co.requestStatus,co.sessionType,c.consultantFName,c.consultantLName,cp.consultation_id FROM consultation co INNER JOIN consultationRequests cr ON co.requestStatus=0 AND co.sessionType="Mockup Interviews" AND co.consultationId=cr.consultation_id INNER JOIN consultationRequestprovide cp ON co.consultationId=cp.consultation_id INNER JOIN undergraduates u ON cr.undergraduate_email=u.email INNER JOIN consultants c ON cp.consultantId=c.consultantId ';
  let result = await mysql.query(sql);
  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
},
//get all Session with an Academic Expert
async getAcademicExpertSession()  {
  
  let sql = 'SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,co.requestStatus,co.sessionType,c.consultantFName,c.consultantLName,cp.consultation_id FROM consultation co INNER JOIN consultationRequests cr ON co.requestStatus=0 AND co.sessionType="Session with an Academic Expert" AND co.consultationId=cr.consultation_id INNER JOIN consultationRequestprovide cp ON co.consultationId=cp.consultation_id INNER JOIN undergraduates u ON cr.undergraduate_email=u.email INNER JOIN consultants c ON cp.consultantId=c.consultantId ';
  let result = await mysql.query(sql);
  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
},


async getScheduledIndividualSessions()  {
  
  let sql = 'SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,c.sessionDate,c.sessionTime,c.sessionType,co.consultantFName,co.consultantLName FROM consultationRequests cr, undergraduates u,consultation c, consultationRequestprovide cp, consultants co WHERE c.requestStatus=1 and c.sessionType="Individual Career Counseling Sessions" and cr.undergraduate_email=u.email and cr.consultation_id=c.consultationId and cp.consultation_id=c.consultationId and cp.consultantId=co.consultantId';
  let result = await mysql.query(sql);
  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
  
},

//get all scheduled Round Table Discussions
async getScheduledRoundTableDiscussions()  {
  
  let sql = 'SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,c.sessionDate,c.sessionTime,c.sessionType,co.consultantFName,co.consultantLName FROM consultationRequests cr, undergraduates u,consultation c, consultationRequestprovide cp, consultants co WHERE c.requestStatus=1 and c.sessionType="Round Table Discussion" and cr.undergraduate_email=u.email and cr.consultation_id=c.consultationId and cp.consultation_id=c.consultationId and cp.consultantId=co.consultantId';
  let result = await mysql.query(sql);
  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
  
},

//get all Scheduled Soft Skill Development sessions
async getScheduledSoftSkillDevelopment()  {
  
  let sql = 'SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,c.sessionDate,c.sessionTime,c.sessionType,co.consultantFName,co.consultantLName FROM consultationRequests cr, undergraduates u,consultation c, consultationRequestprovide cp, consultants co WHERE c.requestStatus=1 and c.sessionType="Soft Skill Development" and cr.undergraduate_email=u.email and cr.consultation_id=c.consultationId and cp.consultation_id=c.consultationId and cp.consultantId=co.consultantId';
  let result = await mysql.query(sql);
  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
},

//get all Scheduled Sessions with an Expert in a Foreign University
async getScheduledForeignExpertSessions()  {
  
  let sql = 'SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,c.sessionDate,c.sessionTime,c.sessionType,co.consultantFName,co.consultantLName FROM consultationRequests cr, undergraduates u,consultation c, consultationRequestprovide cp, consultants co WHERE c.requestStatus=1 and c.sessionType="Session with an Expert in a Foreign University" and cr.undergraduate_email=u.email and cr.consultation_id=c.consultationId and cp.consultation_id=c.consultationId and cp.consultantId=co.consultantId';
  let result = await mysql.query(sql);
  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
},

//get all Scheduled Mockup Interviews
async getScheduledMockupInterviews()  {
  
  let sql = 'SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,c.sessionDate,c.sessionTime,c.sessionType,co.consultantFName,co.consultantLName FROM consultationRequests cr, undergraduates u,consultation c, consultationRequestprovide cp, consultants co WHERE c.requestStatus=1 and c.sessionType="Mockup Interviews" and cr.undergraduate_email=u.email and cr.consultation_id=c.consultationId and cp.consultation_id=c.consultationId and cp.consultantId=co.consultantId';
  let result = await mysql.query(sql);
  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
},
//get all Scheduled Session with an Academic Expert
async getScheduledAcademicExpertSession()  {
  
  let sql = 'SELECT u.undergradFName,u.undergradLName, u.batch, u.faculty,u.email,c.sessionDate,c.sessionTime,c.sessionType,co.consultantFName,co.consultantLName FROM consultationRequests cr, undergraduates u,consultation c, consultationRequestprovide cp, consultants co WHERE c.requestStatus=1 and c.sessionType="Session with an Academic Expert" and cr.undergraduate_email=u.email and cr.consultation_id=c.consultationId and cp.consultation_id=c.consultationId and cp.consultantId=co.consultantId';
  let result = await mysql.query(sql);
  if(result)  {
  
    return result;

  }
    return "Error fetching consultation sessions from db"
},
	
};