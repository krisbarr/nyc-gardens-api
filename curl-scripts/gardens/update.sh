# ID="60b8e1258e84f56b96a9e81a" TOKEN="8908399fd68c6313a078e485df09bf74"
API="http://localhost:4741"
URL_PATH="/gardens"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \

echo
