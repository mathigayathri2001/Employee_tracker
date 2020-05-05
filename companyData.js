/* Module function to handle company data transactions */

// function to get manager names 
async function getManagerName() {
  const [mgr] = await connection.query(`SELECT concat(First_Name,' ',Last_Name) as Manager
  FROM   Employee WHERE  Manager_ID is null `)
  const mgrNames = []
  for (let mgrName of mgr) {
    let name = `${mgrName.Manager}`;
    mgrNames.push(name);
  }
  return mgrNames
}

// function to get manager name and role
async function getManagerNameRole() {
  const [mgr] = await connection.query(`SELECT concat(E.First_Name,' ',E.Last_Name, ' ', D.Name) as Manager
   FROM   Employee E, Role R, Department D WHERE  Manager_ID is NULL AND E.Role_ID = R.ID and R.Department_ID = D.ID`)
  const mgrNames = []
  for (let mgrName of mgr) {
    let name = `${mgrName.Manager}`;
    mgrNames.push(name);
  }
  return mgrNames
}

// function to get department name
async function getDepartmentName() {
  const [dep] = await connection.query(`SELECT D.name From Department D `)
  const depNames = []

  for (let depName of dep) {
    let name = `${depName.name}`;
    depNames.push(name);
  }
  return depNames
}

// function to get department ID
async function getDepartmentId(deptname) {
  const [dep] = await connection.query(`SELECT id From Department Where ?`,
    { name: deptname }
  )
  return dep[0].id
}

// function to get role name
async function getRoleName() {
  const [role] = await connection.query(`SELECT R.title From Role R `)
  const roleNames = []

  for (let roleName of role) {
    let name = `${roleName.title}`;
    roleNames.push(name);
  }
  return roleNames
}

// function to get roleID by using role name
async function getRoleId(rolename) {

  const [role] = await connection.query(`SELECT id From Role Where ?`,
    { title: rolename }
  )
  return role[0].id
}

// function to get employees name
async function getEmployeeName() {
  const [emp] = await connection.query(`SELECT E.id,concat(First_Name,' ',Last_Name) as EmployeeName
  FROM   Employee as E  `)
  const empNames = []
  for (let empName of emp) {
    let name = `${empName.EmployeeName}`;
    empNames.push(name);
  }
  return empNames
}

// function to get employee Id using employee name
async function getEmpId(empname) {

  const empsplit = empname.split(" ");
  const firstName = empsplit[0];
  const lastName = empsplit[1];

  const [emp] = await connection.query(`SELECT id From Employee M Where ? AND ?`,
    [
      { first_name: firstName },
      { last_name: lastName }
    ]

  )

  return emp[0].id
}

// function to get emmployee name and role
async function getEmpNameRole() {
  const [emp] = await connection.query(`SELECT concat(E.First_Name,' ',E.Last_Name, ' ', R.Title) as Employee
    FROM   Employee E, Role R WHERE E.Role_ID = R.ID `)
  const empNames = []
  for (let empName of emp) {
    let name = `${empName.Employee}`;
    empNames.push(name);
  }
  return empNames
}

module.exports = {
  getManagerName: getManagerName,
  getDepartmentName: getDepartmentName,
  getDepartmentId: getDepartmentId,
  getRoleName: getRoleName,
  getRoleId: getRoleId,
  getEmpId: getEmpId,
  getManagerNameRole: getManagerNameRole,
  getEmployeeName: getEmployeeName,
  getEmpNameRole: getEmpNameRole
};