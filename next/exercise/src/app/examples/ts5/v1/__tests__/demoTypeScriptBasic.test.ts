// 测试demoTypeScriptBasic函数
import {describe, it, expect} from 'vitest';

// 测试demoTypeScriptBasic函数

describe('demoTypeScriptBasic函数测试', () => {
  // 重新创建函数以进行测试
  const demoTypeScriptBasic: () => string = (): string => {
    return "";
  };

  it('返回空字符串', () => {
    // 调用函数并检查返回值
    const result = demoTypeScriptBasic();
    expect(result).toBe('');
    expect(typeof result).toBe('string');
  });
});
describe('demoTypeScriptBasic函数测试', () => {
  // 重新创建函数以进行测试
  const demoTypeScriptBasic: () => string = (): string => {
    return "";
  };

  it('返回空字符串', () => {
    // 调用函数并检查返回值
    const result = demoTypeScriptBasic();
    expect(result).toBe('');
    expect(typeof result).toBe('string');
  });
});
