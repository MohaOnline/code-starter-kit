/**
 * 温度转换工具类
 * 提供摄氏度和华氏度之间的转换功能
 */
export class TemperatureConverter {
  /**
   * 摄氏度转华氏度
   * 公式: F = C × 9/5 + 32
   * @param celsius 摄氏度温度
   * @returns 华氏度温度
   */
  static celsiusToFahrenheit(celsius: number): number {
    if (typeof celsius !== 'number' || isNaN(celsius)) {
      throw new Error('输入必须是有效的数字');
    }
    return (celsius * 9/5) + 32;
  }

  /**
   * 华氏度转摄氏度
   * 公式: C = (F - 32) × 5/9
   * @param fahrenheit 华氏度温度
   * @returns 摄氏度温度
   */
  static fahrenheitToCelsius(fahrenheit: number): number {
    if (typeof fahrenheit !== 'number' || isNaN(fahrenheit)) {
      throw new Error('输入必须是有效的数字');
    }
    return (fahrenheit - 32) * 5/9;
  }

  /**
   * 格式化温度显示
   * @param temperature 温度值
   * @param unit 温度单位 ('C' 或 'F')
   * @param decimalPlaces 小数位数，默认2位
   * @returns 格式化的温度字符串
   */
  static formatTemperature(temperature: number, unit: 'C' | 'F', decimalPlaces: number = 2): string {
    const rounded = Number(temperature.toFixed(decimalPlaces));
    return `${rounded}°${unit}`;
  }

  /**
   * 批量转换温度
   * @param temperatures 温度数组
   * @param fromUnit 源单位 ('C' 或 'F')
   * @returns 转换后的温度数组
   */
  static batchConvert(temperatures: number[], fromUnit: 'C' | 'F'): number[] {
    return temperatures.map(temp => {
      return fromUnit === 'C' 
        ? this.celsiusToFahrenheit(temp)
        : this.fahrenheitToCelsius(temp);
    });
  }
}

/**
 * 温度类型定义
 */
export interface Temperature {
  value: number;
  unit: 'C' | 'F';
}

/**
 * 温度转换结果类型
 */
export interface ConversionResult {
  original: Temperature;
  converted: Temperature;
  formula: string;
}

/**
 * 高级温度转换器类
 */
export class AdvancedTemperatureConverter {
  /**
   * 执行温度转换并返回详细结果
   * @param temperature 温度对象
   * @returns 转换结果
   */
  static convert(temperature: Temperature): ConversionResult {
    let converted: Temperature;
    let formula: string;

    if (temperature.unit === 'C') {
      converted = {
        value: TemperatureConverter.celsiusToFahrenheit(temperature.value),
        unit: 'F'
      };
      formula = 'F = C × 9/5 + 32';
    } else {
      converted = {
        value: TemperatureConverter.fahrenheitToCelsius(temperature.value),
        unit: 'C'
      };
      formula = 'C = (F - 32) × 5/9';
    }

    return {
      original: temperature,
      converted: converted,
      formula: formula
    };
  }

  /**
   * 判断温度范围
   * @param celsius 摄氏度温度
   * @returns 温度描述
   */
  static getTemperatureDescription(celsius: number): string {
    if (celsius < 0) return '冰点以下';
    if (celsius < 10) return '很冷';
    if (celsius < 20) return '冷';
    if (celsius < 25) return '凉爽';
    if (celsius < 30) return '温暖';
    if (celsius < 35) return '热';
    return '很热';
  }
}
