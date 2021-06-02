API="http://data.cityofnewyork.us/resource"
URL_PATH="/p78i-pat6.json"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \

echo
