import { prisma, jsonResponse } from "@/lib/prisma";
import { LexoRank } from "lexorank";
// BigInt是JavaScript内置对象，用于处理大整数ID

export function preprocessText(text) {
  if (!text || typeof text !== "string") {
    return text;
  }

  // 如果文本已经包含完整的<p>和<span>标签结构，直接返回
  if (text.includes("<p>") && text.includes("<span aria-label=") && text.includes("data-voice-id=")) {
    // 检查是否有多个句子在同一个span中，需要拆分
    const spanRegex = /<span aria-label="([^"]+)" data-voice-id="[^"]*">([^<]+)<\/span>/g;
    let hasMultipleSentences = false;

    text.replace(spanRegex, (match, ariaLabel, content) => {
      // 检查内容中是否有多个句子（通过句号+空格或问号、感叹号判断）
      const sentences = content.split(/(?<=[.!?])\s+(?=[A-Z])|(?<=[.!?])$/).filter(s => s.trim());
      if (sentences.length > 1) {
        hasMultipleSentences = true;
      }
      return match;
    });

    if (!hasMultipleSentences) {
      return text;
    }

    // 如果有多个句子在同一个span中，需要拆分
    return text.replace(spanRegex, (match, ariaLabel, content) => {
      const sentences = splitIntoSentences(content);
      if (sentences.length <= 1) {
        return match;
      }

      return sentences
        .map(sentence => {
          const cleanSentence = sentence.trim();
          // 去除前缀用于aria-label，保留句号后的空格
          let ariaContent = removePrefix(sentence);
          // 只去除开头和结尾的空格，但保留句号后的空格
          ariaContent = ariaContent.replace(/^\s+/, "").replace(/\s+$/, "");
          // 如果原句子以句号+空格结尾，在aria-label中也保留
          if (sentence.match(/\.\?\s+$/)) {
            ariaContent += " ";
          }
          // 如果句子以句号结尾但没有空格，且不是问号或感叹号，添加空格
          else if (ariaContent.endsWith(".") && !ariaContent.endsWith("?") && !ariaContent.endsWith("!")) {
            ariaContent += " ";
          }
          // 处理显示内容，保留句末标点后的空格
          let displayContent = cleanSentence;
          // 如果不是段落最后一句，且以句末标点结尾但没有空格，添加空格
          if (
            sentences.indexOf(sentence) < sentences.length - 1 &&
            displayContent.match(/[.!?]$/) &&
            !sentence.match(/[.!?]\s+$/)
          ) {
            displayContent += " ";
          }
          // 如果原句子以句末标点+空格结尾，保留空格
          else if (sentence.match(/[.!?]\s+$/)) {
            displayContent = sentence.trim() + " ";
          }

          return `<span aria-label="${ariaContent}" data-voice-id="">${displayContent}</span>`;
        })
        .join("");
    });
  }

  // 按段落分割（双换行符或单换行符）
  const paragraphs = text.split(/\n\s*\n|\n/).filter(p => p.trim());

  return paragraphs
    .map(paragraph => {
      const trimmedParagraph = paragraph.trim();
      if (!trimmedParagraph) return "";

      // 将段落分割成句子
      const sentences = splitIntoSentences(trimmedParagraph);

      const spanElements = sentences
        .map(sentence => {
          const cleanSentence = sentence.trim();
          if (!cleanSentence) return "";

          // 去除前缀用于aria-label，保留句末标点后的空格
          let ariaContent = removePrefix(sentence);
          // 只去除开头和结尾的空格，但保留句末标点后的空格
          ariaContent = ariaContent.replace(/^\s+/, "").replace(/\s+$/, "");
          // 如果原句子以句末标点+空格结尾，在aria-label中也保留
          if (sentence.match(/[.!?]\s+$/)) {
            ariaContent += " ";
          }
          // 如果句子以句末标点结尾但没有空格，添加空格（除非是段落最后一句）
          else if (ariaContent.match(/[.!?]$/) && sentences.indexOf(sentence) < sentences.length - 1) {
            ariaContent += " ";
          }

          // 处理显示内容，保留句末标点后的空格
          let displayContent = cleanSentence;
          // 如果不是段落最后一句，且以句末标点结尾但没有空格，添加空格
          if (
            sentences.indexOf(sentence) < sentences.length - 1 &&
            displayContent.match(/[.!?]$/) &&
            !sentence.match(/[.!?]\s+$/)
          ) {
            displayContent += " ";
          }
          // 如果原句子以句末标点+空格结尾，保留空格
          else if (sentence.match(/[.!?]\s+$/)) {
            displayContent = sentence.trim() + " ";
          }

          return `<span aria-label="${ariaContent}" data-voice-id="">${displayContent}</span>`;
        })
        .filter(span => span)
        .join("");

      return `<p>${spanElements}</p>`;
    })
    .filter(p => p)
    .join("\n");
}

// 辅助函数：分割句子
function splitIntoSentences(text) {
  // 处理英文句子：句号+空格+大写字母，句号+大写字母，或句号在行末
  // 处理问号和感叹号
  const sentences = [];
  let current = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    current += char;

    // 检查是否是句子结束
    if (char === "." || char === "?" || char === "!") {
      // 检查下一个字符
      const nextChar = text[i + 1];
      const nextNextChar = text[i + 2];

      // 如果是句号后跟空格和大写字母，句号后直接跟大写字母，或者是文本末尾
      if (
        !nextChar ||
        (nextChar === " " && nextNextChar && /[A-Z]/.test(nextNextChar)) ||
        (nextChar && /[A-Z]/.test(nextChar)) ||
        char === "?" ||
        char === "!"
      ) {
        // 对于句号，如果下一个字符是空格且后面跟大写字母，保留空格用于aria-label
        if (char === "." && nextChar === " " && nextNextChar && /[A-Z]/.test(nextNextChar)) {
          current += " ";
          i++; // 跳过空格
          sentences.push(current); // 不使用trim，保留句号后的空格
        } else {
          sentences.push(current.trim());
        }

        current = "";
      }
    }
  }

  // 添加剩余内容
  if (current.trim()) {
    sentences.push(current.trim());
  }

  return sentences.filter(s => s);
}

// 辅助函数：去除前缀
function removePrefix(sentence) {
  return sentence.replace(/^(M:|W:|Q:)\s*/, "");
}

export async function POST(request) {
  const contentType = request.headers.get("Content-Type");
  if (!contentType || !contentType.includes("application/json")) {
    return jsonResponse({ success: false, error: "Invalid invoking..." }, 403);
  }

  let result = null;

  try {
    const data = await request.json();

    // 预处理文本
    // 听力对话：Question
    data.note.question = preprocessText(data.note.question);
    data.note.note = preprocessText(data.note.note);
    data.note.body = preprocessText(data.note.body);

    if (data?.action === "update") {
      await prisma.$transaction(async tx => {
        result = await tx.$executeRaw`UPDATE notebooks_notes SET 
            title = ${data.note.title || ""},
            body = ${data.note.body || ""}, 
            question = ${data.note.question || ""}, 
            answer = ${data.note.answer || ""}, 
            choise_a = ${data.note.choise_a || ""},
            choise_b = ${data.note.choise_b || ""},
            choise_c = ${data.note.choise_c || ""},
            choise_d = ${data.note.choise_d || ""},
            figures = ${data.note.figures || ""},
            note = ${data.note.note || ""},
            note_extra = ${data.note.note_extra || ""} 
          WHERE id = ${data.note.id}`;

        console.log(result);
        // 可以继续用 tx 处理更多逻辑
      });
    } else if (data?.action === "create") {
      // 求同类型 note 中最前的 weight
      let rows = await prisma.$queryRaw`
        SELECT MIN(weight) AS weight
          FROM notebooks_notes_summary
         WHERE tid = ${data.note.type.id}
      `;

      console.log(rows);

      const weight = rows[0].weight;
      const lexoRank = LexoRank.parse(weight);
      const newWeight = lexoRank.genPrev().format();

      // 使用Prisma模型API创建记录并获取插入ID
      // 这种方法更可靠，会自动返回插入的记录包括ID
      const newNote = await prisma.notebooks_notes.create({
        data: {
          pid: BigInt(0), // 根据模型定义，pid是必填字段
          nbid: BigInt(0), // 根据模型定义，nbid是必填字段
          tid: data.note.type.id ? BigInt(data.note.type.id) : BigInt(0),
          title: data.note.title || "",
          body: data.note.body || "",
          question: data.note.question || "",
          answer: data.note.answer || "",
          choise_a: data.note.choise_a || "",
          choise_b: data.note.choise_b || "",
          choise_c: data.note.choise_c || "",
          choise_d: data.note.choise_d || "",
          figures: data.note.figures || "",
          weight: newWeight,
          note: data.note.note || "",
          note_extra: data.note.note_extra || "",
          // 其他字段会使用默认值
        },
      });

      // 将生成的ID添加到note对象中
      data.note.id = Number(newNote.id); // 转换BigInt为Number以便JSON序列化
      console.log("Inserted with ID:", newNote.id);

      /* 方法2：使用事务和原始SQL执行插入并获取插入ID
      // 注意：在某些情况下，如果Prisma使用不同的连接执行查询，LAST_INSERT_ID()可能返回0
      await prisma.$transaction(async (tx) => {
        // 执行插入操作
        await tx.$executeRaw`INSERT INTO notebooks_notes (pid, nbid, tid, title, body, 
                                                    question, note, answer, note_extra) 
                                             VALUES (
                                               0, 0, ${data.note.type.id}, ${data.note.title}, ${data.note.body}, 
                                               ${data.note.question}, ${data.note.note}, ${data.note.answer}, ${data.note.note_extra})`;
        
        // 在同一事务中获取最后插入的ID，确保使用相同的数据库连接
        const idResult = await tx.$queryRaw`SELECT LAST_INSERT_ID() as id`;
        const insertId = idResult[0].id;
        
        // 将ID添加到note对象中
        data.note.id = insertId;
        console.log('Inserted with ID:', insertId);
      });
      */
    }

    console.log("note crud:" + JSON.stringify(data.note));
    return jsonResponse({ success: true, action: data.action, note: data.note });
  } catch (error) {
    console.error("Query error:", error);
    return jsonResponse({ success: false, error: "DB Error" }, 500);
  }
}

