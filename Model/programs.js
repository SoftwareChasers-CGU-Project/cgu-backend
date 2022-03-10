// const ProductModel = (sequelize, Sequelize) => {
//     const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
//     const product = sequelize.define('product', {
//         Id: {type: INTEGER, primaryKey: true, autoIncrement: true},
//         ProductName: {type: STRING},
        
//     })
//     return product
//}

// module.exports = ProductModel

// var mysqlModel = require('mysql-model');
// const ProductSchema = new mysqlModel.Schema (
//   {
//     Id: { type: String },
//     productName: { type: String },
//   },
//   {timestamps: true}
// ); 

// const ProductModel = mysqlModel.model("product", ProductSchema);
// module.exports = ProductModel;

// module.exports = (sequelize, Sequelize) => {
//     const Product = sequelize.define("product", {
//       Id: {
//         type: Sequelize.STRING
//       },
//       ProductName: {
//         type: Sequelize.STRING
//       }
//     });
  
//     return Product;
//   };

// const mysql = require('serverless-mysql')
// const Schema = mysql.Schema;

// const ProductSchema ({
//     Id  : String,
//     ProductName  : String
// })

// var Model = mysql.Model('Product',ProductSchema);

// module.exports = Model;

class program {
    constructor(programId,programName,programDate,programCat,programDesc) {
        this.programId = programId;
        this.programName =programName;
        this.programDate=programDate;
        this.programCat=programCat;
        this.programDesc=programDesc;

    }
}

module.exports = program;
