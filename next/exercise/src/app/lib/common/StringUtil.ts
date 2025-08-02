// 语言类型枚举
export enum Language {
  CHINESE  = 'zh',
  JAPANESE = 'ja',
  ENGLISH  = 'en'
}

// 字符集定义
const CHARACTER_SETS = {
  [Language.CHINESE]:  '的一是不了人我在有他这为之大来以个中上们到说国和地也子时道出而要于就下得可你年生自会那后能对着事其里所去行过家十用发天如然方成者开面前学通点当地进心路来时门总明走起体高第身已山次意情期必手应实分给变神活气正许问工做思点别先外许光走特常题如',
  [Language.JAPANESE]: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  [Language.ENGLISH]:  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
};

/**
 * 生成随机字符串
 * @param length 字符串长度，默认为 256
 * @param language 语言类型，默认为英文
 * @returns 生成的随机字符串
 */
export function generateRandomString(
  length: number     = 256,
  language: Language = Language.ENGLISH
): string {
  // 参数验证
  if (length <= 0) {
    throw new Error('长度必须大于 0');
  }

  // 获取对应语言的字符集
  const charset = CHARACTER_SETS[language];
  if (!charset) {
    throw new Error(`不支持的语言类型: ${language}`);
  }

  let result = '';
  const charsetLength = charset.length;

  // 生成随机字符串
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    result += charset[randomIndex];
  }

  return result;
}

/**
 * 批量生成随机字符串
 * @param count 生成数量
 * @param length 每个字符串的长度，默认为 256
 * @param language 语言类型，默认为英文
 * @returns 生成的随机字符串数组
 */
export function generateRandomStrings(
  count: number,
  length: number     = 256,
  language: Language = Language.ENGLISH
): string[] {
  if (count <= 0) {
    throw new Error('生成数量必须大于 0');
  }

  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(generateRandomString(length, language));
  }

  return result;
}

// 使用示例：
// import { generateRandomString, Language } from './StringUitl';
//
// // 生成默认的 256 个英文字符串
// const defaultString = generateRandomString();
//
// // 生成 100 个中文字符
// const chineseString = generateRandomString(100, Language.CHINESE);
//
// // 生成 50 个日文字符
// const japaneseString = generateRandomString(50, Language.JAPANESE);
//
// // 生成 200 个英文字符
// const englishString = generateRandomString(200, Language.ENGLISH);