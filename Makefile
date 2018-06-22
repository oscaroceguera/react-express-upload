api-server:
	nodemon ./from-api/bin/www

app-server:
	cd ./forms && npm start

app-clean:
	rm -rf ./forms/node_modules
