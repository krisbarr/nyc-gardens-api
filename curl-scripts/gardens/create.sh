API="http://localhost:4741"
URL_PATH="/gardens"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "garden": {
      "parksID": "'"${PARKS_ID}"'",
      "name": "'"${NAME}"'",
      "borough": "'"${BOROUGH}"'",
      "zipCode": "'"${ZIP_CODE}"'"
    }
  }'

echo
