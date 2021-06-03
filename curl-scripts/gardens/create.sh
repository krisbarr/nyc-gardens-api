# TOKEN="fc31496aa00392a024a2aa10fbfa3a0f" PARKS_ID="XGT082" NAME=""NYCHA - McKinley - Joyful Garden" BOROUGH="X" ZIP_CODE=10456

API="http://localhost:4741"
URL_PATH="/gardens"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "garden": {
      "parksId": "'"${PARKS_ID}"'",
      "name": "'"${NAME}"'",
      "borough": "'"${BOROUGH}"'",
      "zipCode": "'"${ZIP_CODE}"'"
    }
  }'

echo
