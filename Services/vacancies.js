// const Vacancy = require('../Model/vacancies');
// const mysql= require ('serverless-mysql');
const mysql = require('../dbconfig');

module.exports = {

async createVacancy (vacancy) {
  let sql = "INSERT INTO vacancies SET ?";
  let result = mysql.query(sql, vacancy, (err) => {
    if (err) {
      throw err;
    }
  });

  if(result) {
    return {
      data: vacancy,
      message: "Vacancy successfully created!"
    };
  }
  return "Error creating new vacancy"
},

async acceptVacancy (vacancyId) {
  console.log(this.vacancyId);
  let result = await mysql.query({
    sql: 'UPDATE vacancies set VacancyStatus=1 where vacancyId = '+ mysql.escape(vacancyId),
    timeout: 10000,
    values: ['serverless']
  })

  if(result)  {
  return result;
  }
    return "Error fetching vacanciess from db"
},

async getAllVacancies()  {
  	
  let result = await mysql.query({
    sql: 'SELECT * FROM vacancies',
    timeout: 10000,
    values: ['serverless']
  })

  if(result)  {
    return result;
  }
    return "Error fetching vacancies from db"
},
  
async getVacancyById(vacancyId)  {

let result = await mysql.query({
  sql: 'SELECT * FROM vacancies where vacancyId = '+ mysql.escape(vacancyId),
  timeout: 10000,
  values: ['serverless']
})

if(result)  { 
return result;
}
  return "Error fetching vacancies from db"
},


async deleteVacancy(vacancyId)  { 	
let result = await mysql.query({
  sql: 'DELETE FROM vacancies where vacancyId = '+ mysql.escape(vacancyId),
  timeout: 10000,
  values: ['serverless']
})

if(result)  {
return result;
}
  return "Error fetching vacancies from db"
},

async getPendingVacancies()  {
 	
  let result = await mysql.query({
    sql: 'SELECT * FROM vacancies where VacancyStatus=0',
    timeout: 10000,
    values: ['serverless']
  })

  if(result)  {
  
    return result;

  }
    return "Error fetching vacancies from db"
},

async getAcceptedVacancies()  {
  	
  let result = await mysql.query({
    sql: 'SELECT * FROM vacancies where VacancyStatus=1',
    timeout: 10000,
    values: ['serverless']
  })

  if(result)  {
  
    return result;

  }
    return "Error fetching vacancies from db"
},

async postCV(cv) {
  let sql = "INSERT INTO CV SET ?";
  let result = mysql.query(sql, cv, (err) => {
    if (err) {
      throw err;
    }
  });

  if(result) {
    return {
      data: CV,
      message: "CV uploaded successfully!"
    };
  }
  return "Error adding CV"
}
}
