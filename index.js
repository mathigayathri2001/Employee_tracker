const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");

let connection
main()
async function main(){
    try{
        await connect() 
        await start()
     }catch(err){
         console.log(err)
     }finally{
         connection.end()
     }
}

async function connect (){
    connection = await mysql.createConnection({
    host: 'localhost',
     port: 3306,
     user: 'root',
    password: 'Gay141981$',
    database: 'company_db'
    })
    console.log('Connected to MySQL as id: ' + connection.threadId)
}

const starterQuestion ={
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "Exit",
    "View all Employees",
    "View all Department",
    "View all Roles",
    "View all Employees By Department",
    "View all Employees By Manager",
    "Add Employee",
    "Add Role",
    "Add Department",
    "Remove Department",
    "Remove Role",
    "Remove Employee",
    "update Employee Manager",
    "update Employee Role",
    ]

}
async function start() {
    const answer = await inquirer.prompt(starterQuestion);
switch (answer.action) {
    case "Exit":
      break;

    case "View all Employees":
      await viewEmployee();
      break;
    case "View all Department":
      await viewDepartment();
      break;

    
    }

}

async function viewEmployee() {
    const [rows] = await connection.query(`SELECT E.Id,E.First_name,E.Last_name,R.Title,R.Salary,D.name as Department,
    concat(M.First_Name, ' ', M.Last_Name) as Manager 
    FROM Employee as E 
    left join  Role as R on E.role_id = R.id 
    left join  Department as D on r.department_id = D.id 
    left join Employee as M  on M.id = E.manager_id
    order by E.id`)
    console.table(rows);
    await start()
    
}

async function viewDepartment(){
    const [dep]= await connection.query(`SELECT D.Id, D.name as Department
    FROM DEPARTMENT as D`)
    console.table(dep);
    await start()
}

async function viewRole(){
    const [roll]= await connection.query(`SELECT R.ID,R.TITLE,R.SALARY,D.Name
    FROM ROle AS R
    left join department as D on R.department_id =D.id`)
    console.table(roll);
    await start()
}