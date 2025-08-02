import {TemperatureConverter, AdvancedTemperatureConverter, Temperature} from '../../../../lib/common/TemperatureConverter';

/**
 * 温度转换测试套件
 */
class TemperatureConverterTest {
  private static testCount = 0;
  private static passedTests = 0;

  /**
   * 断言函数
   */
  private static assert(condition: boolean, message: string): void {
    this.testCount++;
    if (condition) {
      this.passedTests++;
      console.log(`✓ ${message}`);
    } else {
      console.log(`✗ ${message}`);
    }
  }

  /**
   * 近似相等比较（处理浮点数精度问题）
   */
  private static almostEqual(a: number, b: number, precision: number = 0.001): boolean {
    return Math.abs(a - b) < precision;
  }

  /**
   * 测试摄氏度转华氏度
   */
  static testCelsiusToFahrenheit(): void {
    console.log('\n测试: 摄氏度转华氏度');

    // 测试冰点
    this.assert(
      TemperatureConverter.celsiusToFahrenheit(0) === 32,
      '0°C 应该等于 32°F'
    );

    // 测试沸点
    this.assert(
      TemperatureConverter.celsiusToFahrenheit(100) === 212,
      '100°C 应该等于 212°F'
    );

    // 测试室温
    this.assert(
      this.almostEqual(TemperatureConverter.celsiusToFahrenheit(20), 68),
      '20°C 应该约等于 68°F'
    );

    // 测试负温度
    this.assert(
      TemperatureConverter.celsiusToFahrenheit(-40) === -40,
      '-40°C 应该等于 -40°F'
    );
  }

  /**
   * 测试华氏度转摄氏度
   */
  static testFahrenheitToCelsius(): void {
    console.log('\n测试: 华氏度转摄氏度');

    // 测试冰点
    this.assert(
      TemperatureConverter.fahrenheitToCelsius(32) === 0,
      '32°F 应该等于 0°C'
    );

    // 测试沸点
    this.assert(
      TemperatureConverter.fahrenheitToCelsius(212) === 100,
      '212°F 应该等于 100°C'
    );

    // 测试室温
    this.assert(
      this.almostEqual(TemperatureConverter.fahrenheitToCelsius(68), 20),
      '68°F 应该约等于 20°C'
    );

    // 测试负温度
    this.assert(
      TemperatureConverter.fahrenheitToCelsius(-40) === -40,
      '-40°F 应该等于 -40°C'
    );
  }

  /**
   * 测试双向转换一致性
   */
  static testBidirectionalConversion(): void {
    console.log('\n测试: 双向转换一致性');

    const testValues = [0, 25, 37, 100, -10, -40];

    testValues.forEach(celsius => {
      const fahrenheit = TemperatureConverter.celsiusToFahrenheit(celsius);
      const backToCelsius = TemperatureConverter.fahrenheitToCelsius(fahrenheit);

      this.assert(
        this.almostEqual(celsius, backToCelsius),
        `${celsius}°C → ${fahrenheit}°F → ${backToCelsius.toFixed(3)}°C 应该保持一致`
      );
    });
  }

  /**
   * 测试错误处理
   */
  static testErrorHandling(): void {
    console.log('\n测试: 错误处理');

    // 测试无效输入
    try {
      // @ts-ignore
      TemperatureConverter.celsiusToFahrenheit('invalid');
      this.assert(false, '应该抛出错误对于非数字输入');
    } catch (error) {
      this.assert(true, '正确处理非数字输入错误');
    }

    // 测试 NaN 输入
    try {
      TemperatureConverter.celsiusToFahrenheit(NaN);
      this.assert(false, '应该抛出错误对于 NaN 输入');
    } catch (error) {
      this.assert(true, '正确处理 NaN 输入错误');
    }
  }

  /**
   * 测试格式化功能
   */
  static testFormatting(): void {
    console.log('\n测试: 格式化功能');

    this.assert(
      TemperatureConverter.formatTemperature(25.3456, 'C', 2) === '25.35°C',
      '格式化应该正确处理小数位数'
    );

    this.assert(
      TemperatureConverter.formatTemperature(100, 'F', 0) === '100°F',
      '格式化应该正确处理整数'
    );
  }

  /**
   * 测试批量转换
   */
  static testBatchConversion(): void {
    console.log('\n测试: 批量转换');

    const celsius = [0, 20, 40];
    const expectedFahrenheit = [32, 68, 104];
    const resultFahrenheit = TemperatureConverter.batchConvert(celsius, 'C');

    this.assert(
      resultFahrenheit.every((temp, index) =>
        this.almostEqual(temp, expectedFahrenheit[index])),
      '批量转换结果应该正确'
    );
  }

  /**
   * 测试高级转换器
   */
  static testAdvancedConverter(): void {
    console.log('\n测试: 高级转换器');

    const temp: Temperature = {value: 25, unit: 'C'};
    const result = AdvancedTemperatureConverter.convert(temp);

    this.assert(
      result.original.value === 25 && result.original.unit === 'C',
      '应该保留原始温度信息'
    );

    this.assert(
      this.almostEqual(result.converted.value, 77) && result.converted.unit === 'F',
      '应该正确转换温度'
    );

    this.assert(
      result.formula === 'F = C × 9/5 + 32',
      '应该提供正确的转换公式'
    );
  }

  /**
   * 测试温度描述
   */
  static testTemperatureDescription(): void {
    console.log('\n测试: 温度描述');

    this.assert(
      AdvancedTemperatureConverter.getTemperatureDescription(-5) === '冰点以下',
      '负温度应该返回"冰点以下"'
    );

    this.assert(
      AdvancedTemperatureConverter.getTemperatureDescription(25) === '温暖',
      '25°C 应该返回"温暖"'
    );

    this.assert(
      AdvancedTemperatureConverter.getTemperatureDescription(40) === '很热',
      '40°C 应该返回"很热"'
    );
  }

  /**
   * 运行所有测试
   */
  static runAllTests(): void {
    console.log('=== 温度转换器测试套件 ===');

    this.testCount = 0;
    this.passedTests = 0;

    this.testCelsiusToFahrenheit();
    this.testFahrenheitToCelsius();
    this.testBidirectionalConversion();
    this.testErrorHandling();
    this.testFormatting();
    this.testBatchConversion();
    this.testAdvancedConverter();
    this.testTemperatureDescription();

    console.log(`\n=== 测试结果 ===`);
    console.log(`总测试数: ${this.testCount}`);
    console.log(`通过测试: ${this.passedTests}`);
    console.log(`失败测试: ${this.testCount - this.passedTests}`);
    console.log(`成功率: ${((this.passedTests / this.testCount) * 100).toFixed(1)}%`);
  }
}

// 运行测试
if (require.main === module) {
  TemperatureConverterTest.runAllTests();
}

export {TemperatureConverterTest};
