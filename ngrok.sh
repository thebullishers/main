ngrok_url=$(curl -s localhost:4040/api/tunnels | jq -r ".tunnels[0].public_url")
sed -i "s|NGROK_URL_REPLACE_HERE|${ngrok_url}|g" "actions/Create DB User/code.js"
echo $ngrok_url
a0deploy import --config_file config.json --input_file tenant.yaml
sed -i "s|${ngrok_url}|NGROK_URL_REPLACE_HERE|g" "actions/Create DB User/code.js"