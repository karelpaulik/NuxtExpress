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

1.
git clone xxxxxxxxxx
cd NuxtExpress  (pozn. Linux rozlišuje velká/malá písmena !!!)
npm run inst1

2.
Nastavení
- server/index.js/corsOptions/origin: http://juliek.eu:3000
- client/nuxt.confit.ts/runtimeConfig.public.baseURL: http://juliek.eu:5000

3.
npm run prodbuild
npm run prodstart

Pozn. 
a) Po každé úpravě "client" části je nutno provést: "npm run prodbuild"
b) Ohledně instalace dependencies existuje i druhá možnost "npm run inst2". Záložní možnost.

!!! Porty 3000, 5000 nastavit podle skutečnosti !!!
--------------------------------------------------------------------
Umístění nastavení portů:

Server: server/index.js
const port = 5000

Client: ./package.json  (package.json v rootu, ne v client/..)
Def port pro nuxt je 3000.
Produkce - windows: "frontend": "cd client && set PORT=3001 && node .output/server/index.mjs",
Produkce - linux:   "frontend": "cd client && export PORT=3001 && node .output/server/index.mjs",
--------------------------------------------------------------------
Alternativa spuštění - přes: pm2
instalace pm2:
npm install pm2@latest -g

1. Spuštění buď ručně separé backend/frontend:
cd server
pm2 start index.js
cd ..
cd client
pm2 start .output/server/index.mjs

2. Nebo přes ecosystem.config.js
pm2 start ecosystem.config.js

Pozn. Ovládání pm2:
pm2 start ecosystem.config.js  (místo ecosystem.config.js může být "npm run prodstart", nebo "app.js")
pm2 stop 0
pm2 delete 0
pm2 delete all
pm2 list
pm2 restart 0
pm2 reload 0
pm2 show 0
...............
pm2 logs
pm2 monit
..............
Autom. start služeb při restartu serveru:
pm2 startup    (vytvoří pm2 službu, ale zatím v ní nic není)
pm2 save       (vloží do pm2 služby procesy, které jsou spuštěné přes "pm2 start xxx")
pm2 unstartup  (smazání služby)
pm2 resurrect  (načtení posledního "pm2 save" stavu)
.............
Generování "ecosystem.config.js":
pm2 init simple
