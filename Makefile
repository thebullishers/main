target: run_ngrok run_client

run_client:
	npm run dev

run_ngrok:
	npx ngrok http 3000

auth0:
	sh ngrok.sh