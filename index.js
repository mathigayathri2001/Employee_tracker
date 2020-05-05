const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");
const companyData = require("./companyData.js")

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
    type: "rawlist",
    message: "What would you like to do?",
    choices: [    
    "View all Employees",
    "View all Department",
    "View all Roles",
    "View all Employees By Manager",
    "Add Department",
    "Add Role",
    "Add Employee",
    "Remove Department",
    "Remove Role",
    "Remove Employee",
    "update Employee Role",
    "update Employee Manager",
    "View the total utilized budget of a department",
    "Exit"
    ]

}
async function start() {
  const answer = await inquirer.prompt(starterQuestion);
  switch (answer.action) {
    case "View all Employees":
      await viewEmployee();
      break;
    case "View all Department":
      await viewDepartment();
      break;
    case "View all Roles":
      await viewRole();
      break;
    case "View all Employees By Manager":
      await viewEmployeesByMgr();
      break;
    case "Add Department":
      await addDepartment();
      break;
    case "Add Role":
      await addRole();
      break;
    case "Add Employee":
      await addEmployee();
      break;
    case "Remove Department":
      await removeDepartment();
      break;
    case "Remove Role":
      await removeRole();
      break;
    case "Remove Employee":
      await removeEmployee();
      break;
    case "update Employee Role":
      await updateEmployeeRole();
      break;
    case "update Employee Manager":
      await updateEmployeeManager();
      break;
    case "View the total utilized budget of a department":
        await viewDeptBudget();
        break;
    case "Exit":
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
    const [role]= await connection.query(`SELECT R.ID,R.TITLE,R.SALARY,D.Name as Department
    FROM ROle AS R
    left join department as D on R.department_id =D.id`)
    console.table(role);
    await start()
}
async function viewEmployeesByMgr(){
   const names = await companyData.getManagerName();
    const answer = await inquirer.prompt({
        name: "manager",
        message: "Which manager's employees do you want to view?",
        type: "rawlist",
        choices: names
      });
      const [Emp_By_Mgr]= await connection.query(`select E.Id,concat(E.first_Name,' ',E.Last_Name ) as EmployeeName,
      concat(M.First_Name, ' ', M.Last_Name) as ManagerName
      from Employee E ,Employee M
      where E.manager_id=M.id
      and concat(m.first_name, ' ' , M.last_name)=? `, [answer.manager])
      console.table(Emp_By_Mgr)
      await start()    
}

async function addDepartment(){
  const answer = await inquirer.prompt({
    name: "department",
    message: "Enter new Department name: ",
    type: "input"
  });

  const [dep]= await connection.query(`INSERT INTO Department SET ? `,
  {name:answer.department})
  await start()
}

async function addRole(){
  const names = await companyData.getDepartmentName();
  
  const answer = await inquirer.prompt([{
    name: "Title",
    message: "Enter new Role Title name: ",
    type: "input"
  },
   {
    name: "Salary",
    message: "Enter the Salary: ",
    type: "input"
  },
  {
    name: "Department",
    message: "Enter the department Name:",
    type: "list",
    choices: names
  }

]);
  const deptID = await companyData.getDepartmentId(answer.Department);

  const [role]= await connection.query(`INSERT INTO Role SET ? `,
  {title:answer.Title,
   salary:answer.Salary,
   department_id:deptID
  })
  //console.log(results.affectedRows + ' product inserted!\n')
  await start()
}

async function addEmployee(){
  const names = await companyData.getRoleName();
  const mgrnames = await companyData.getManagerNameRole();
  
  
  const answer = await inquirer.prompt([{
    name: "firstname",
    message: "Enter employee first name: ",
    type: "input"
  },
   { 
    name: "lastname",
    message: "Enter employee last name: ",
    type: "input"
  },
  { 
    name: "role",
    message: "Enter employee role: ",
    type: "rawlist",
    choices: names
  },
  { 
    name: "manager",
    message: "Enter employee manager: ",
    type: "list",
    choices: mgrnames
  }

]);
  const roleID = await companyData.getRoleId(answer.role);
  const mgrID =  await companyData.getEmpId(answer.manager);

  const [role]= await connection.query(`INSERT INTO Employee SET ? `,
  {first_name:answer.firstname,
   last_name:answer.lastname,
   role_id:roleID,
   manager_id:mgrID
  })
  await start()
}


async function removeDepartment(){
  const names = await companyData.getDepartmentName();
  const answer = await inquirer.prompt({
    name: "department",
    message: "Which Department to remove: ",
    type: "rawlist",
    choices: names
  });

  const [dep]= await connection.query(`DELETE FROM Department WHERE ?`,
  {name:answer.department})
  await start()
}

async function removeRole(){
  const names = await companyData.getRoleName();
  const answer = await inquirer.prompt({
    name: "role",
    message: "Which Role to remove: ",
    type: "rawlist",
    choices: names
  });

  const [rep]= await connection.query(`DELETE FROM Role WHERE ?`,
  {title:answer.role
  })
  await start()
}

async function removeEmployee(){
  const names = await companyData.getEmployeeName();
  const answer = await inquirer.prompt({
    name: "employee",
    message: "Choose the Employee to remove: ",
    type: "rawlist",
    choices: names
  });
  
  const empplit = answer.employee.split(" ");
  const firstName = empplit[0];
  const lastName = empplit[1];
    
  const [rep]= await connection.query(`DELETE FROM Employee WHERE ? AND ?`,
  [ 
    {first_name:firstName},
    {last_name:lastName}
  ]
  )
  await start()
}
async function updateEmployeeRole(){
  //const names = await companyData.getEmployeeName();
  const names = await companyData.getEmpNameRole();
  const rollName = await companyData.getRoleName()
  //const depName = await companyData.getDepartmentName();
  
  const answer = await inquirer.prompt([{
    
      name: "employee",
      message: "Which employee do you want to update?",
      type: "rawlist",
      choices: names,
    
  },
  {
    name: "roll",
    message: "Enter the roll Name:",
    type: "rawlist",
    choices: rollName
  }

]);
   const roleID = await companyData. getRoleId(answer.roll);
   console.log(roleID)
   const empID =  await companyData.getEmpId(answer.employee);
console.log(empID)
  const [updEmp]= await connection.query(`UPDATE EMPLOYEE SET ? WHERE ?`,
    [{role_id:roleID},
   {id:empID}])
  //console.log(results.affectedRows + ' product inserted!\n')
  await start()
}

async function updateEmployeeManager(){
  const names = await companyData.getEmpNameRole();
  const managername = await companyData.getManagerNameRole()
  
  
  const answer = await inquirer.prompt([{
    
      name: "employee",
      message: "Which employee do you want to update?",
      type: "rawlist",
      choices: names,
    
  },
  {
    name: "mgrname",
    message: "Enter the Manager Name:",
    type: "rawlist",
    choices: managername
  }

]);
console.log(answer.mgrname)
   const mgrID = await companyData. getEmpId(answer.mgrname);
   console.log(mgrID)
   const empID =  await companyData.getEmpId(answer.employee);
console.log(empID)
  const [updEmp]= await connection.query(`UPDATE EMPLOYEE SET ? WHERE ?`,
    [
      {
        manager_id:mgrID
      },
      {
        id:empID
      }
    
    ])
  await start()
}


async function viewDeptBudget(){
  const names = await companyData.getDepartmentName();
   const answer = await inquirer.prompt({
       name: "dept",
       message: "Which department do you like to generate the budget?",
       type: "rawlist",
       choices: names
     });
     const deptID = await companyData.getDepartmentId(answer.dept)
    const [budget]= await connection.query(`select sum(R.salary)
    FROM Role R
    left join department D on D.id =R.department_id
    left join employee  E  on r.id=E.role_id
    where D.id =?`, [deptID])
     console.table(budget)
     await start()    
}
