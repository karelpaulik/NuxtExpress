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

1. Stáhnutí, instalace packages
git clone xxxxxxxxxx
(Při chybě "unable to get local issuer certificate" pomohlo:
"git config --global http.sslBackend schannel" nebo "git config --global http.sslverify false" (jedno z toho, při zkoušce funfovalo obojí)
Pozn:
git config -l
git config -l --global
git config -l --system
git config -l --local
)
cd NuxtExpress  (pozn. Linux rozlišuje velká/malá písmena !!!)
npm run inst1

2. Nastavení
a) Bez nginx revers. proxy serveru
- server/index.js
const port = 5001;
origin: ['http://localhost:3000', 'http://juliek.eu:3001'],
- client/nuxt.config.ts
runtimeConfig.public.baseURL: 'http://juliek.eu:5001'
b) S nginx jako reverzní proxy-server
- server/index.js
const port = 5001;
origin: ['http://localhost:3000', 'https://juliek.eu:3001'],
- client/nuxt.config.ts
runtimeConfig.public.baseURL: 'https://juliek.eu:443/backend/'

Pozn: 
Nastavení nginx proxy-serveru: viz.
- nginx_revers_proxy-readme.txt
Reload nginx:  
- systemctl reload nginx

3. Build
npm run prodbuild

4. Spuštění
a) Start bez pm2
npm run prodstart
b) Start za použití pm2 (process manager), další ovládání pm2 viz. package.json
(Pokud by pm2 neblylo nainstalováno, pak instalace: "npm install pm2@latest -g")
npm run pm2_start

5. Přidání do linux služeb (aby se nastartovalo i po restartu linux serveru)
pm2 startup
pm2 save

Pozn. 
a) Po každé úpravě "client" části je nutno provést: "npm run prodbuild"
b) Ohledně instalace dependencies existuje i druhá možnost "npm run inst2". Záložní možnost.

!!! Porty 3001, 5001 nastavit podle skutečnosti !!!
--------------------------------------------------------------------
Umístění nastavení portů:

Server: server/index.js
const port = 5001;              //Takto se pro server bere natvrdo tento port
nebo:
const port = process.env.PORT;  //Takto se bere port nastavený v "ecosystem.config.js"

Client:
Def port pro nuxt je 3000.
a) Bez použití pm2
Řídí se proměnnou prostředí: PORT
Produkce - windows: "frontend": "cd client && set PORT=3001 && node .output/server/index.mjs",
Produkce - linux:   "frontend": "cd client && export PORT=3001 && node .output/server/index.mjs",
b) Při použití pm2
Bere se port ze souboru "ecosystem.config.js"
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
