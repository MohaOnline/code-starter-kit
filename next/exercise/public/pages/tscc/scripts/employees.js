"use strict";

console.log("🪷", typeof Employee);

(function () {
  if (typeof window.Employee === "undefined") {
    // 员工类定义，封装员工的基本信息
    window.Employee = class Employee {
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
    };
  }
})();

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

/*
**标准事件及实际发生时机如下：**

| 事件名 | 发生时机 |
| --- | --- |
| `readystatechange` | `document.readyState` 变化时触发。典型顺序为：
a. `"loading"`：文档开始加载；
b. `"interactive"`：文档已解析完成，子资源还在加载；
c. `"complete"`：所有子资源均已加载完成。 |
| `DOMContentLoaded` | HTML 文档**结构**解析完成，
文档可操作（不等资源，如图片、样式） |
| `load` | 所有内容（文档结构 + 所有外部资源，如图片、样式、iframe等）均已加载完成 |
| `beforeunload` | (离开页面前) 页面即将卸载——刷新、关闭窗口、跳转等动作前 |
| `unload` | (离开页面时) 页面已经离开（不建议执行耗时任务） |

## 它们的**发生先后顺序**（重点描述）
1. **`readystatechange: loading`**
文档开始加载（此时 only HTML being loaded）。
2. **`readystatechange: interactive`**
HTML 解析完毕，但子资源（图片、iframe、css等）可能仍在加载。
3. **`DOMContentLoaded`**
HTML 结构完全解析，**此事件发生在 `interactive` 后**。
    - 此时可安全访问并操作 DOM。
    - 不等 CSS、图片等外部文件。

4. **`readystatechange: complete`**
所有资源都加载完毕，通常发生在 `load` 前后。
5. **`load`**
包括所有外部资源（图片、音频、脚本、样式表等）全部加载完成。
    - 页面完全可见且互动。

6. **`beforeunload` → `unload`**
用户离开页面前一刻和页面正式卸载时。**不属于加载流程但属于生命周期主流程**。

 */