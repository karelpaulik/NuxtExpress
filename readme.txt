"concurrently" vhodné pro development, ale pro produkci asi vhodnější spouštět "server" a "client" odděleně.

Pozn. k package.json:
....................
nodemon:
"devindex": "concurrently --kill-others \"npm run --prefix ./server noderun\" \"npm run --prefix ./client dev\" ",
!!! Zde není nutný krok viz. níže.

node:
"prodindex": "concurrently --kill-others \"node server/index.js\" \"npm run --prefix ./client dev\" "
!!! Pro tento případ nutno: "root/server/.env" kopírovat do "root/"