API="http://localhost:4741"
URL_PATH="/comments"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "comment": {
      "title": "'"${TITLE}"'",
      "body": "'"${BODY}"'",
      "gardenId": "'"${GARDEN_ID}"'",
      "subject": "'"${SUBJECT}"'"
    }
  }'
