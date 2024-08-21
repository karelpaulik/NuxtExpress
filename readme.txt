Úvodní pozn.
"concurrently" vhodné pro development, ale pro produkci asi vhodnější spouštět "server" a "client" odděleně.

Pozn. k package.json:
....................
nodemon:
"devindex": "concurrently --kill-others \"npm run --prefix ./server noderun\" \"npm run --prefix ./client dev\" ",
!!! Zde není nutný krok viz. níže.

node:
"prodindex": "concurrently --kill-others \"node server/index.js\" \"npm run --prefix ./client dev\" "
!!! Pro tento případ nutno: "root/server/.env" kopírovat do "root/"

-----------------------------------------------------------------
20.8.2024
Postup spuštění na linux serveru:

git clone xxxxxxxxxx
cd NuxtExpress  (pozn. Linux rozlišuje velká/malá písmena !!!)
npm run inst1
npm run prodbuild
npm run prodstart

Pozn. Ohledně instalace dependencies existuje i druhá možnost "npm run inst2". Záložní možnost.

Nastavení:
..............
Po "git clone xxx" je nutno nastavit/přidat:
- server/index.js/corsOptions/origin: http://juliek.eu:3000
- client/nuxt.confit.ts/runtimeConfig.public.baseURL: http://juliek.eu:5000

!!!Porty 3000, 5000 nastavit podle skutečnosti

--------------------------------------------------------------------
Umístění nastavení portů:

Server: server/index.js
const port = 5000

Client: ./package.json  (package.json v rootu, ne v client/..)
Def port pro nuxt je 3000.
Produkce - windows: "frontend": "cd client && set port=3001 && node .output/server/index.mjs",
Produkce - linux:   "frontend": "cd client && export port=3001 && node .output/server/index.mjs",