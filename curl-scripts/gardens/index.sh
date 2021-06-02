API="http://localhost:4741"
URL_PATH="/gardens"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \

echo
