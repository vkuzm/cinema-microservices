FROM mongo:3.6
EXPOSE 27017
COPY ./seeds/users.js /users.json
#CMD mongoimport --host mongo --db users --collection users --authenticationDatabase admin --username root --password root --drop --file /users.json --jsonArray
#CMD mongoimport --host 127.0.0.1 --db test --collection users --drop --file /users.json --jsonArray