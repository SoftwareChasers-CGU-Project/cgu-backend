// const Vacancy = require('../Model/vacancies');
// const mysql= require ('serverless-mysql');
const mysql = require('../dbconfig');

module.exports = {

//post a vacancy
async createVacancy (vacancy, company) {
  let sql = "INSERT INTO vacancies SET ?";
  let result = mysql.query(sql, vacancy, (err) => {
    if (err) {
      throw err;
    }
  });
  
  let sql2 = "INSERT INTO company SET ?"; 
  let result2 = mysql.query(sql2, company, (err) => {
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

//Accept a vacancy
async acceptVacancy (vacancyId) {
  console.log(this.vacancyId);
  let result = await mysql.query({
    sql: 'UPDATE vacancies set VacancyStatus=1 where vacancyId = '+ mysql.escape(vacancyId)
  })

  if(result)  {
  return result;
  }
    return "Error fetching vacanciess from db"
},

// async getAllVacancies()  {
//   let result = await mysql.query({
//     sql: 'SELECT * FROM vacancies',
//     timeout: 10000,
//     values: ['serverless']
//   })
//   if(result)  {
//     return result;
//   }
//     return "Error fetching vacancies from db"
// },
 

//get a vacancy using Id
async getVacancyById(vacancyId)  {
let result = await mysql.query({
  sql: 'SELECT * FROM vacancies where vacancyId = '+ mysql.escape(vacancyId)
})

if(result)  { 
console.log(result);
return result;
}
  return "Error fetching vacancies from db"
},

//delete a vacancy
async deleteVacancy(vacancyId)  { 	
let result = await mysql.query({
  sql: 'DELETE FROM vacancies where vacancyId = '+ mysql.escape(vacancyId)
})

if(result)  {
return result;
}
  return "Error fetching vacancies from db"
},


//get all pending vacancies
async getPendingVacancies()  {
  let result = await mysql.query({
    sql: 'SELECT * FROM vacancies where VacancyStatus=0'
  })
 
  if(result)  {
    return result;
  }
    return "Error fetching vacancies from db"
},


//get all accepted vacancies
async getAcceptedVacancies()  {
  let result = await mysql.query({
    sql: 'SELECT * FROM vacancies where VacancyStatus=1'
  })

  if(result)  {
  
    return result;

  }
    return "Error fetching vacancies from db"
},


//apply for a vacancy
async applyVacancy(link) {
  let sql = "INSERT INTO applyVacancies SET ?";
  let result = mysql.query(sql, link, (err) => {
    if (err) {
      throw err;
    }
  });

  if(result) {
    return {
      data: link,
      message: "Linkedin link uploaded successfully!"
    };
  }
  return "Error adding Linkedin link"
},


//get all Linkedin profile links
async getAllLinks()  {
  let result = await mysql.query({
    sql: 'SELECT CONCAT(u.undergradFName," ",undergradLName) as fullname, v.vacancyTitle, v.companyName, a.linkedin FROM applyVacancies a, vacancies v, undergraduates u WHERE v.vacancyId = a.vacancyId and u.email = a.undergrad_email;'
  })
  
  if(result)  {
    return result;
  }
    return "Error fetching Linkedin links from db"
}

}


