const mysql = require('../dbconfig');

module.exports = {
async createConsultant (consultant) {
  let check_sql=await mysql.query(`select * from consultants where email='${consultant.email}'`)
  console.log(check_sql[0]);
  if(check_sql[0]!=null){
    //console.log("hello");
    return;
  }  
 
  let sql = "INSERT INTO consultants SET ?";
  console.log(sql);
  let result = mysql.query(sql, consultant, (err) => {
    if (err) {
      throw err;
    }

  });

    if(result) {
      return {
        data: consultant,
        message: "consultant successfully created!"
    };
  }
return "Error creating new Consultant"
},


async getAllConsultants ()  {
  let sql = "SELECT * FROM consultants";
  let result = await mysql.query(sql);
  if(result)  {
    return result;
  }
  return "Error fetching consultants from db"
},

//get consultant by id
async getConsultantById (consultantId)  {
  let sql = "SELECT * FROM consultants WHERE ?";
  let result = await mysql.query(sql,consultantId);
  
  if(result)  {
    return result;
  }
  return "Error fetching consultant from db"
},

//delete a consultant by id
async deleteConsultant(consultantId)  {
  let sql = "DELETE FROM consultants WHERE ?";
  let result = await mysql.query(sql,consultantId);
  console.log(result);

  if(result)  {
    return result;
  }
  return "Error deleting consultant from db"
},

//update a consultant by id
async updateConsultant(consultant)  {
  let sql = `UPDATE consultants SET consultantFName='${consultant.consultantFName}',consultantLName='${consultant.consultantLName}',universityName='${consultant.universityName}', post='${consultant.post}',email='${consultant.email}' WHERE consultantId= '${consultant.consultantId}'`;
  
  console.log(sql);
  let result =  mysql.query(sql, (err) => {
    if (err) {
      throw err;
    }
    
  });
  console.log(result);
    
  if(result)  {
    return{
      data: consultant,
      message: "Consultant updated successfully!"
    };
  }
  return "Error updating consultant"
}
	
};