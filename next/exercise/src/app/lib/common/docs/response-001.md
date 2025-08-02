我来帮您在 `src/app/lib/common/StringUtil.ts` 文件中创建一个生成任意字符串的函数。我来为你在 `StringUitl.ts` 文件中创建一个生成任意字符串的函数：

```typescript
// 语言类型枚举
export enum Language {
  CHINESE = 'zh',
  JAPANESE = 'ja',
  ENGLISH = 'en'
}

// 字符集定义
const CHARACTER_SETS = {
  [Language.CHINESE]: '的一是不了人我在有他这为之大来以个中上们到说国和地也子时道出而要于就下得可你年生自会那后能对着事其里所去行过家十用发天如然方成者开面前学通点当地进心路来时门总明走起体高第身已山次意情期必手应实分给变神活气正许问工做思点别先外许光走特常题如',
  [Language.JAPANESE]: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
  [Language.ENGLISH]: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
};

/**
 * 生成随机字符串
 * @param length 字符串长度，默认为 256
 * @param language 语言类型，默认为英文
 * @returns 生成的随机字符串
 */
export function generateRandomString(
  length: number = 256,
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
  length: number = 256,
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
```


这个函数提供了以下功能：

1. **默认行为**：不传参数时返回 256 个英文字符的随机字符串
2. **长度控制**：可以通过 `length` 参数指定字符串长度
3. **多语言支持**：
    - 中文（常用汉字）
    - 日文（平假名、片假名）
    - 英文（大小写字母和数字）
4. **类型安全**：使用 TypeScript 枚举确保语言参数的类型安全
5. **错误处理**：对无效参数进行验证和错误提示
6. **批量生成**：额外提供了批量生成多个字符串的功能

使用示例：

```typescript
import { generateRandomString, Language } from './StringUitl';

// 默认：256 个英文字符
const str1 = generateRandomString();

// 100 个中文字符
const str2 = generateRandomString(100, Language.CHINESE);

// 50 个日文字符
const str3 = generateRandomString(50, Language.JAPANESE);

// 200 个英文字符
const str4 = generateRandomString(200, Language.ENGLISH);
```
