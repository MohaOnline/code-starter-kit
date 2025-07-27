"use strict";
// (globalThis as any).Employee = class {
//   firstName: string;
//   lastName: string;
//   employeeId: string;
//
//   /**
//    * 构造函数，初始化员工信息
//    * @param {string} firstName - 名
//    * @param {string} lastName - 姓
//    * @param {string} employeeId - 员工编号
//    */
//   constructor(firstName: string, lastName: string, employeeId: string) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.employeeId = employeeId;
//     console.log("🎉 TS 版本");
//     console.debug(`新建员工：${firstName} ${lastName}, ID: ${employeeId}`);
//   }
//
//   /**
//    * 获取员工的友好展示名
//    * @returns {string}
//    */
//   FriendlyName(): string {
//     console.debug(`获取友好名: ${this.firstName} ${this.lastName}`);
//     return `${this.firstName} ${this.lastName}`;
//   }
// }
// tsc 会编译成本地变量，相当于再生命一遍变量，不会有重复定义 class 的问题。
var Employee = /** @class */ (function () {
    /**
     * 构造函数，初始化员工信息
     * @param {string} firstName - 名
     * @param {string} lastName - 姓
     * @param {string} employeeId - 员工编号
     */
    function Employee(firstName, lastName, employeeId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeId = employeeId;
        console.log("🎉 TS 版本");
        console.debug("\u65B0\u5EFA\u5458\u5DE5\uFF1A".concat(firstName, " ").concat(lastName, ", ID: ").concat(employeeId));
    }
    /**
     * 获取员工的友好展示名
     * @returns {string}
     */
    Employee.prototype.FriendlyName = function () {
        console.debug("\u83B7\u53D6\u53CB\u597D\u540D: ".concat(this.firstName, " ").concat(this.lastName));
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    return Employee;
}());
// 页面加载完成后，执行主逻辑
document.addEventListener("DOMContentLoaded", function () {
    // 初始化静态员工数据（模拟三个员工样例）
    var employees = [
        new Employee("John", "Doe", "1"),
        new Employee("Jane", "Smith", "2"),
        new Employee("Bob", "Johnson", "3")
    ];
    console.info('初始化员工数组：', employees);
    // 生成并插入员工表格到页面
    function generateEmployeeTable() {
        // 创建表格和表头
        var table = document.createElement("table");
        var headerRow = table.insertRow(0);
        // 定义表头标题
        var headers = ["Employee ID", "First Name", "Last Name", "Friendly Name"];
        headers.forEach(function (headerText) {
            var th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        console.debug('表头已生成:', headers);
        // 依次填充每一行员工信息
        employees.forEach(function (employee) {
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.textContent = employee.employeeId;
            cell2.textContent = employee.firstName;
            cell3.textContent = employee.lastName;
            cell4.textContent = employee.FriendlyName();
            // 每插入一行，输出调试信息
            console.debug("\u6DFB\u52A0\u8868\u683C\u884C\uFF1A".concat(employee.employeeId, ", ").concat(employee.firstName, ", ").concat(employee.lastName));
        });
        // 将表格插入页面主体
        document.body.appendChild(table);
        console.info('员工表格已插入页面');
    }
    // 生成员工信息表
    generateEmployeeTable();
});
