API="http://data.cityofnewyork.us/resource"
URL_PATH="/p78i-pat6.json?zipcode="

curl "${API}${URL_PATH}${ZIP_CODE}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --data '{
    "garden": {
      "zip code": "'"${ZIP_CODE}"'"
    }
  }'

echo
