import {TemperatureConverter, AdvancedTemperatureConverter, Temperature} from '../../../../lib/common/TemperatureConverter';

/**
 * 温度转换演示函数
 */
function temperatureConversionDemo(): void {
  console.log('=== 温度转换演示 ===\n');

  // 基本转换示例
  console.log('1. 基本转换示例:');

  // 摄氏度转华氏度
  const celsius = 25;
  const fahrenheitResult = TemperatureConverter.celsiusToFahrenheit(celsius);
  console.log(`${celsius}°C = ${fahrenheitResult}°F`);

  // 华氏度转摄氏度
  const fahrenheit = 77;
  const celsiusResult = TemperatureConverter.fahrenheitToCelsius(fahrenheit);
  console.log(`${fahrenheit}°F = ${celsiusResult.toFixed(2)}°C`);

  console.log('\n2. 格式化温度显示:');
  console.log(TemperatureConverter.formatTemperature(25.3333, 'C', 1));
  console.log(TemperatureConverter.formatTemperature(77.6, 'F', 0));

  // 常见温度转换
  console.log('\n3. 常见温度转换:');
  const commonTemperatures = [
    {name: '冰点', celsius: 0},
    {name: '室温', celsius: 20},
    {name: '人体体温', celsius: 37},
    {name: '水沸点', celsius: 100}
  ];

  commonTemperatures.forEach(temp => {
    const fahrenheit = TemperatureConverter.celsiusToFahrenheit(temp.celsius);
    console.log(`${temp.name}: ${temp.celsius}°C = ${fahrenheit}°F`);
  });

  // 批量转换
  console.log('\n4. 批量转换:');
  const temperatures = [0, 10, 20, 30, 40];
  const converted = TemperatureConverter.batchConvert(temperatures, 'C');
  console.log('摄氏度:', temperatures.join(', '));
  console.log('华氏度:', converted.map(t => t.toFixed(1)).join(', '));

  // 高级转换示例
  console.log('\n5. 高级转换示例:');
  const temp1: Temperature = {value: 32, unit: 'F'};
  const result1 = AdvancedTemperatureConverter.convert(temp1);
  console.log(`转换: ${result1.original.value}°${result1.original.unit} → ${result1.converted.value}°${result1.converted.unit}`);
  console.log(`公式: ${result1.formula}`);

  // 温度描述
  console.log('\n6. 温度描述:');
  const testTemperatures = [-5, 5, 15, 25, 35, 45];
  testTemperatures.forEach(temp => {
    const description = AdvancedTemperatureConverter.getTemperatureDescription(temp);
    console.log(`${temp}°C: ${description}`);
  });
}

/**
 * 错误处理演示
 */
function errorHandlingDemo(): void {
  console.log('\n=== 错误处理演示 ===\n');

  try {
    // @ts-ignore - 故意传入错误类型用于演示
    TemperatureConverter.celsiusToFahrenheit('not a number');
  } catch (error) {
    console.log('错误处理:', error.message);
  }

  try {
    TemperatureConverter.fahrenheitToCelsius(NaN);
  } catch (error) {
    console.log('NaN 处理:', error.message);
  }
}

/**
 * 性能测试
 */
function performanceTest(): void {
  console.log('\n=== 性能测试 ===\n');

  const iterations = 100000;
  const testValue = 25;

  console.time('转换性能测试');
  for (let i = 0; i < iterations; i++) {
    TemperatureConverter.celsiusToFahrenheit(testValue);
    TemperatureConverter.fahrenheitToCelsius(testValue);
  }
  console.timeEnd('转换性能测试');

  console.log(`完成 ${iterations * 2} 次温度转换`);
}

// 执行演示
if (require.main === module) {
  temperatureConversionDemo();
  errorHandlingDemo();
  performanceTest();
}

// 导出演示函数
export {temperatureConversionDemo, errorHandlingDemo, performanceTest};
