import {jsonResponse, prisma} from "@/lib/prisma";
import {LexoRank} from "lexorank";
import {getWeight} from "@/lib/utils";

export async function POST(request) {
  const contentType = request.headers.get("Content-Type");
  if (!contentType || !contentType.includes("application/json")) {
    return jsonResponse({success: false, error: "Invalid invoking..."}, 403);
  }

  let result = null;

  try {
    const data = await request.json();

    console.group("/api/notebooks/v02/notes/crud");
    console.dir(data);
    console.groupEnd()

    if (data?.action === "update") {
      await prisma.$transaction(async tx => {
        result = await tx.$executeRaw`UPDATE notebooks_notes
                                      SET title       = ${data.note.title || ""},
                                          body        = ${data.note.body || ""},
                                          body_script = ${data.note.body_script || ""},
                                          question    = ${data.note.question || ""},
                                          answer      = ${data.note.answer || ""},
                                          choise_a    = ${data.note.choise_a || ""},
                                          choise_b    = ${data.note.choise_b || ""},
                                          choise_c    = ${data.note.choise_c || ""},
                                          choise_d    = ${data.note.choise_d || ""},
                                          choise_e    = ${data.note.choise_e || ""},
                                          choise_f    = ${data.note.choise_f || ""},
                                          choise_g    = ${data.note.choise_g || ""},
                                          choise_h    = ${data.note.choise_h || ""},
                                          choise_i    = ${data.note.choise_i || ""},
                                          choise_j    = ${data.note.choise_j || ""},
                                          choise_k    = ${data.note.choise_k || ""},
                                          weight      = ${data.note.weight || ""},
                                          figures     = ${data.note.figures || ""},
                                          note        = ${data.note.note || ""},
                                          note_extra  = ${data.note.note_extra || ""}
                                      WHERE id = ${data.note.id}`;

        console.log(result);
        // 可以继续用 tx 处理更多逻辑
      });
    }
    else if (data?.action === "create") {
      // 求同类型 note 中最前的 weight
      let rows = await prisma.$queryRaw`
          SELECT MIN(weight) AS weight
          FROM notebooks_notes_summary
          WHERE tid = ${data.note.type.id}
      `;

      console.log(rows);

      const weight = rows[0].weight;
      const newWeight = getWeight(weight);
      // const lexoRank = LexoRank.parse(weight);
      // const newWeight = lexoRank.genPrev().format();

      // 使用Prisma模型API创建记录并获取插入ID
      // 这种方法更可靠，会自动返回插入的记录包括ID
      const newNote = await prisma.notebooks_notes.create({
        data: {
          pid: BigInt(0), // 根据模型定义，pid是必填字段
          nbid: BigInt(0), // 根据模型定义，nbid是必填字段
          tid: data.note.type.id ? BigInt(data.note.type.id) : BigInt(0),
          title: data.note.title || "",
          body: data.note.body || "",
          body_script: data.note.body_script || "",
          question: data.note.question || "",
          answer: data.note.answer || "",
          choise_a: data.note.choise_a || "",
          choise_b: data.note.choise_b || "",
          choise_c: data.note.choise_c || "",
          choise_d: data.note.choise_d || "",
          choise_e: data.note.choise_e || "",
          choise_f: data.note.choise_f || "",
          choise_g: data.note.choise_g || "",
          choise_h: data.note.choise_h || "",
          choise_i: data.note.choise_i || "",
          choise_j: data.note.choise_j || "",
          choise_k: data.note.choise_k || "",
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
    return jsonResponse({success: true, action: data.action, note: data.note});
  }
  catch (error) {
    console.error("Query error:", error);
    return jsonResponse({success: false, error: "DB Error"}, 500);
  }
}