# TOKEN=0e4b6c4c4de35c7e7d55ef8bdafc430a TITLE="FUN" BODY="For everyone" GARDEN_ID="60b7d4937b9ad958f1d81623" SUBJECT="veggies" sh curl-scripts/comments/create.sh
# TOKEN=0e4b6c4c4de35c7e7d55ef8bdafc430a TITLE="I HATE IT" BODY="Too hot out here" GARDEN_ID="60b7d4937b9ad958f1d81623" SUBJECT="veggies"
#TOKEN=0e4b6c4c4de35c7e7d55ef8bdafc430a TITLE="It's fine" BODY="These veggies are good" GARDEN_ID="60b7d4937b9ad958f1d81623" SUBJECT="veggies"

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
    }
  }'

echo
