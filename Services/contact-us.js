const Product= require ('../Model/contact-us');
const mysql = require('../dbconfig');

module.exports = {
async createContactUs (ContactUs) {
  let sql = "INSERT INTO Contacts SET ?";
  let result =  mysql.query(sql, ContactUs, (err) => {
    if (err) {
      throw err;
    }

  });

    if(result) {
      return {
        data: ContactUs,
        message: "Contact successfully added!"
    };
  }
      return "Error creating Contact"
},


async getAllContacts ()  {
  let sql = "SELECT * FROM Contacts";
  let result = mysql.query(sql);
  
  // let result =  mysql.query(sql, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  // });
  if(result)  {
    return result;
  }
  return "Error fetching products from db"
},

async deleteContacts(ID)  {
  var sql = `DELETE FROM Contacts WHERE ID=?`;
  let result = mysql.query(sql,ID);
  if(result)  {
    return result;
  }
  return "Error deleting Contacts from db"
},

async viewContacts(Id)  {
  var sql = `SELECT * FROM Contacts WHERE ID=?`;
  let result = mysql.query(sql,Id);
  if(result)  {
    return result;
  }
  return "Error fetching the Contacts from db"
},

async getCGUContacts ()  {
  let sql = "SELECT * FROM Contacts WHERE Faculty='CGU'";
  let result = mysql.query(sql);
  
  if(result)  {
    return result;
  }
  return "Error fetching products from db"
},

async getArchiContacts ()  {
  let sql = "SELECT * FROM Contacts WHERE Faculty='Architecture'";
  let result = mysql.query(sql);
  
  if(result)  {
    return result;
  }
  return "Error fetching products from db"
},

async getITContacts ()  {
  let sql = "SELECT * FROM Contacts WHERE Faculty='IT'";
  let result = mysql.query(sql);
  
  if(result)  {
    return result;
  }
  return "Error fetching products from db"
},

async getEngContacts ()  {
  let sql = "SELECT * FROM Contacts WHERE Faculty='Engineering'";
  let result = mysql.query(sql);
  
  if(result)  {
    return result;
  }
  return "Error fetching products from db"
},


// async getCGUNews ()  {
//   let sql = "SELECT * FROM News WHERE newsCate='CGU'";
//   let result = mysql.query(sql);
//   if(result)  {
//     return result;
//   }
//   return "Error fetching products from db"
// },


async updateContacts(Contacts)  { 
  var sql = `UPDATE Contacts SET NameOf='${Contacts.NameOf}',Title='${Contacts.Title}',Email='${Contacts.Email}',Faculty='${Contacts.Faculty}',PhNum='${Contacts.PhNum}' WHERE ID='${Contacts.ID}'`;
  // console.log(sql);
  let result =  mysql.query(sql, (err) => {
    if (err) {
      throw err;
    }

  });
  if(result) {
    return {
      data: Contacts,
      message: "Contact updated successfully!"
  };
}
    return "Error updating the Contact"
}


}