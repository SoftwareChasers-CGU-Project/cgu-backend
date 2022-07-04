
const mysql = require("../dbconfig");

module.exports = {
  //post a vacancy
  async createVacancy(vacancy, company) {
    let sql = "INSERT INTO vacancies SET ?";
    let result = mysql.query(sql, vacancy, (err) => {
      if (err) {
        throw err;
      }
    });

    if (result) {
      return {
        data: vacancy,
        message: "Vacancy successfully created!",
      };
    }
    return "Error creating new vacancy";
  },

  //Accept a vacancy
  async acceptVacancy(vacancyId) {
    console.log(this.vacancyId);
    let result = await mysql.query({
      sql:
        "UPDATE vacancies set VacancyStatus=1 where vacancyId = " +
        mysql.escape(vacancyId),
    });

    if (result) {
      return result;
    }
    return "Error fetching vacanciess from db";
  },

  //get a vacancy using Id
  async getVacancyById(vacancyId) {
    let result = await mysql.query({
      sql:
        "SELECT * FROM vacancies where vacancyId = " + mysql.escape(vacancyId),
    });

    if (result) {
      return result;
    }
    return "Error fetching vacancies from db";
  },

  //delete a vacancy
  async deleteVacancy(vacancyId) {
    let result = await mysql.query({
      sql: "DELETE FROM vacancies where vacancyId = " + mysql.escape(vacancyId),
    });

    if (result) {
      return result;
    }
    return "Error fetching vacancies from db";
  },

  async deleteApplyVacancies(vacancyId) {
    let result = await mysql.query({
      sql: "DELETE FROM applyVacancies where vacancyId = " + mysql.escape(vacancyId),
    });
    
    if (result) {
      return result;
    }
    return "Error fetching vacancies from db";
  },

  //get all pending vacancies
  async getPendingVacancies() {
    let result = await mysql.query({
      sql: "SELECT * FROM vacancies where VacancyStatus=0 order by closingDate",
    });

    if (result) {
      return result;
    }
    return "Error fetching vacancies from db";
  },

  //get all accepted vacancies
  async getAcceptedVacancies() {
    let result = await mysql.query({
      sql: "SELECT * FROM vacancies where VacancyStatus=1 order by vacancyTitle",
    });

    if (result) {
      return result;
    }
    return "Error fetching vacancies from db";
  },

  //apply for a vacancy
  async applyVacancy(link) {
    //check whether the user is registered
    let check_sql = await mysql.query(
      `select * from users where email='${link.undergrad_email}'`
    );
    console.log(check_sql[0]);
    if (check_sql[0] == null) {
      return;
    }

    
    // let check_sql2 = await mysql.query(
    //   `select * from applyVacancies where undergrad_email='${link.undergrad_email}', AND vacancyId='${link.vacancyId}'`
    // );
    // console.log(check_sql2[0]);
    // if (check_sql2[0] == null) {
    //   return;
    // }

    let sql = "INSERT INTO applyVacancies SET ?";
    let result = mysql.query(sql, link, (err) => {
      if (err) {
        throw err;
      }
    });

    if (result) {
      return {
        data: link,
        message: "Linkedin link uploaded successfully!",
      };
    }
    return "Error adding Linkedin link";
  },

  //get all Linkedin profile links
  async getAllLinks() {
    let result = await mysql.query({
      sql: 'SELECT CONCAT(u.undergradFName," ",undergradLName) as fullname, v.vacancyTitle, v.companyName, a.linkedin FROM applyVacancies a, vacancies v, undergraduates u WHERE v.vacancyId = a.vacancyId and u.email = a.undergrad_email order by applied_time DESC;',
    });

    if (result) {
      return result;
    }
    return "Error fetching Linkedin links from db";
  },

  //get all Government vacancies
  async getGovernmentVacancies() {
    let result = await mysql.query({
      sql: 'SELECT * FROM vacancies where VacancyStatus=1 AND vacancyType="Government"',
    });

    if (result) {
      return result;
    }
    return "Error fetching vacancies from db";
  },

  //get all private vacancies
  async getPrivateVacancies() {
    let result = await mysql.query({
      sql: 'SELECT * FROM vacancies where VacancyStatus=1 AND vacancyType="Private"',
    });

    if (result) {
      return result;
    }
    return "Error fetching vacancies from db";
  },

  //get all NGO vacancies
  async getNgoVacancies() {
    let result = await mysql.query({
      sql: 'SELECT * FROM vacancies where VacancyStatus=1 AND vacancyType="NGO"',
    });

    if (result) {
      return result;
    }
    return "Error fetching vacancies from db";
  },

  //get all Internship vacancies
  async getInternshipVacancies() {
    let result = await mysql.query({
      sql: 'SELECT * FROM vacancies where VacancyStatus=1 AND vacancyType="Internship"',
    });

    if (result) {
      return result;
    }
    return "Error fetching vacancies from db";
  },

  //get all Volunteer vacancies
  async getVolunteerVacancies() {
    let result = await mysql.query({
      sql: 'SELECT * FROM vacancies where VacancyStatus=1 AND vacancyType="Volunteer"',
    });

    if (result) {
      return result;
    }
    return "Error fetching vacancies from db";
  },
  
  //get data to send email to companies
  async getEmail(vacancyId) {
    let result = await mysql.query({
      sql:
        "SELECT  companyEmail, vacancyTitle from vacancies WHERE vacancyId= " +
        mysql.escape(vacancyId),
    });
    console.log(vacancyId);
    JSON.parse(JSON.stringify(result));
    if (result) {
      return result;
    }
    return "Error fetching the vacacny from db";
  },

  //get profile details
  async getProfileDetails(id) {
    let result = await mysql.query({
      sql:
        'SELECT CONCAT( u.undergradFName, " ", u.undergradLName ) AS fullname,  v.vacancyTitle, v.companyName, v.companyEmail, a.linkedin FROM applyVacancies a, vacancies v, undergraduates u WHERE v.vacancyId = a.vacancyId and a.undergrad_email = u.email and a.id= ' +
        mysql.escape(id),
    });

    console.log(result);
    JSON.parse(JSON.stringify(result));
    if (result) {
      return result;
    }
  },
};
