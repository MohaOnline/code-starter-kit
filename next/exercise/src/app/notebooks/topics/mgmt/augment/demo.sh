#!/bin/bash

# Topics 编辑器 API 演示脚本
# Topics Editor API Demo Script

BASE_URL="http://localhost:3000"
API_BASE="${BASE_URL}/api/notebooks/topics/augment"

echo "🚀 Topics 编辑器 API 演示 / Topics Editor API Demo"
echo "=================================================="

# 1. 获取所有 topics
echo ""
echo "📋 1. 获取所有 topics / Get all topics"
echo "GET ${API_BASE}"
curl -s -X GET "${API_BASE}" | jq '.'

# 2. 获取特定类型的 topics
echo ""
echo "🔍 2. 获取物理类型的 topics (type_id=3) / Get physics topics"
echo "GET ${API_BASE}?type_id=3"
curl -s -X GET "${API_BASE}?type_id=3" | jq '.'

# 3. 获取所有类型
echo ""
echo "📂 3. 获取所有类型 / Get all types"
echo "GET ${BASE_URL}/api/notebooks/types/list"
curl -s -X GET "${BASE_URL}/api/notebooks/types/list" | jq '.types[] | {id, title, title_sub}'

# 4. 创建新 topic
echo ""
echo "➕ 4. 创建新 topic / Create new topic"
NEW_TOPIC_DATA='{
  "title": "API 测试 Topic",
  "note": "这是通过 API 创建的测试 topic",
  "type_id": 3,
  "pid": 0
}'
echo "POST ${API_BASE}"
echo "Data: ${NEW_TOPIC_DATA}"
CREATED_TOPIC=$(curl -s -X POST "${API_BASE}" \
  -H "Content-Type: application/json" \
  -d "${NEW_TOPIC_DATA}")
echo "${CREATED_TOPIC}" | jq '.'

# 提取新创建的 topic ID
NEW_TOPIC_ID=$(echo "${CREATED_TOPIC}" | jq -r '.data.id // empty')

if [ -n "${NEW_TOPIC_ID}" ]; then
  echo "✅ 新 topic 创建成功，ID: ${NEW_TOPIC_ID}"
  
  # 5. 更新刚创建的 topic
  echo ""
  echo "✏️ 5. 更新 topic / Update topic"
  UPDATE_DATA='{
    "id": '${NEW_TOPIC_ID}',
    "title": "更新后的 API 测试 Topic",
    "note": "这是更新后的备注内容",
    "type_id": 10
  }'
  echo "PUT ${API_BASE}"
  echo "Data: ${UPDATE_DATA}"
  curl -s -X PUT "${API_BASE}" \
    -H "Content-Type: application/json" \
    -d "${UPDATE_DATA}" | jq '.'
  
  # 6. 验证更新
  echo ""
  echo "🔍 6. 验证更新结果 / Verify update"
  curl -s -X GET "${API_BASE}" | jq ".data[] | select(.id == \"${NEW_TOPIC_ID}\")"
  
  # 7. 删除测试 topic
  echo ""
  echo "🗑️ 7. 删除测试 topic / Delete test topic"
  DELETE_DATA='{"id": '${NEW_TOPIC_ID}'}'
  echo "POST ${API_BASE}/delete"
  echo "Data: ${DELETE_DATA}"
  curl -s -X POST "${API_BASE}/delete" \
    -H "Content-Type: application/json" \
    -d "${DELETE_DATA}" | jq '.'
  
  echo "✅ 测试 topic 已删除"
else
  echo "❌ 创建 topic 失败"
fi

# 8. 测试位置更新
echo ""
echo "🔄 8. 测试位置更新 / Test position update"
POSITION_DATA='{
  "topics": [
    {"id": 1, "pid": 0, "weight": "001"},
    {"id": 2, "pid": 0, "weight": "002"},
    {"id": 4, "pid": 0, "weight": "003"}
  ]
}'
echo "POST ${API_BASE}/updatePositions"
echo "Data: ${POSITION_DATA}"
curl -s -X POST "${API_BASE}/updatePositions" \
  -H "Content-Type: application/json" \
  -d "${POSITION_DATA}" | jq '.'

echo ""
echo "🎉 API 演示完成 / API Demo Complete"
echo "=================================================="
echo ""
echo "💡 提示 / Tips:"
echo "- 访问页面: ${BASE_URL}/notebooks/topics/mgmt/augment"
echo "- 查看文档: ./docs/requirements.md"
echo "- 运行测试: 参考 ./test.md"
