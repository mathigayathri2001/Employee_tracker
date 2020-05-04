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

async function getDepartmentName() {
  const [dep] = await connection.query(`SELECT D.name From Department D `)
  const depNames = []

  for (let depName of dep) {
    let name = `${depName.name}`;
    depNames.push(name);
  }
  return depNames
}

async function getDepartmentId(deptname) {
  const [dep] = await connection.query(`SELECT id From Department Where ?`,
    { name: deptname }
  )
  return dep[0].id
}

async function getRoleName() {
  const [role] = await connection.query(`SELECT R.title From Role R `)
  const roleNames = []

  for (let roleName of role) {
    let name = `${roleName.title}`;
    roleNames.push(name);
  }
  return roleNames
}

async function getRoleId(rolename) {

  const [role] = await connection.query(`SELECT id From Role Where ?`,
    { title: rolename }
  )
  return role[0].id
}

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

async function getEmpId(mgrname) {

  const mgrsplit = mgrname.split(" ");
  const firstName = mgrsplit[0];
  const lastName = mgrsplit[1];
  const deptName = mgrsplit[2]
  const [manager] = await connection.query(`SELECT id From Employee M Where ? AND ?`,
    [
      { first_name: firstName },
      { last_name: lastName }
    ]

  )
  return manager[0].id
}

async function getEmpNameRole() {
  const [emp] = await connection.query(`SELECT concat(E.First_Name,' ',E.Last_Name, ' ', R.Title) as Employee
    FROM   Employee E, Role R WHERE   E.Role_ID = R.ID `)
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