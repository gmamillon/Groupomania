MySQL

Connectez-vous � MySQL en faisant correspondre les identifiants contenue dans le fichier backend/config/db.config.js comme ceci :

mysql -u root -h localhost -p

puis executer la commande CREATE DATABASE groupomania


Backend

Dans le dossier backend executez les commandes suivantes dans l'ordre pour d�marrer le serveur :

npm install

npm start


Frontend

Enfin dans le dossier frontend executez les commandes suivantes :

npm install

npm run serve

alller � localhost:8080 pour ouvrir l'application.