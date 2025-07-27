"use strict";

// 员工类定义，封装员工的基本信息
class Employee {
    /**
     * 构造函数，初始化员工信息
     * @param {string} firstName - 名
     * @param {string} lastName - 姓
     * @param {string} employeeId - 员工编号
     */
    constructor(firstName, lastName, employeeId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeId = employeeId;
        // 调试输出：创建员工对象
        console.debug(`新建员工：${firstName} ${lastName}, ID: ${employeeId}`)
    }

    /**
     * 获取员工的友好展示名
     * @returns {string}
     */
    FriendlyName() {
        // 调试输出：获取友好名
        console.debug(`获取友好名: ${this.firstName} ${this.lastName}`)
        return `${this.firstName} ${this.lastName}`;
    }
}

// 页面加载完成后，执行主逻辑
document.addEventListener("DOMContentLoaded", function () {
    // 初始化静态员工数据（模拟三个员工样例）
    const employees = [
        new Employee("John", "Doe", "1"),
        new Employee("Jane", "Smith", "2"),
        new Employee("Bob", "Johnson", "3")
    ];
    console.info('初始化员工数组：', employees)

    // 生成并插入员工表格到页面
    function generateEmployeeTable() {
        // 创建表格和表头
        const table = document.createElement("table");
        const headerRow = table.insertRow(0);

        // 定义表头标题
        const headers = ["Employee ID", "First Name", "Last Name", "Friendly Name"];
        headers.forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        console.debug('表头已生成:', headers)

        // 依次填充每一行员工信息
        employees.forEach(employee => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.textContent = employee.employeeId;
            cell2.textContent = employee.firstName;
            cell3.textContent = employee.lastName;
            cell4.textContent = employee.FriendlyName();

            // 每插入一行，输出调试信息
            console.debug(
              `添加表格行：${employee.employeeId}, ${employee.firstName}, ${employee.lastName}`)
        });

        // 将表格插入页面主体
        document.body.appendChild(table);
        console.info('员工表格已插入页面')
    }

    // 生成员工信息表
    generateEmployeeTable();
});