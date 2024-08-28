Pro nastavení nginx jako reverzní proxy server, je nutné nastavit korektně: /etc/nginx/sites-available/default

Pozor hlavní rozdíl mezi: location / vs. location /backend/
proxy_pass http://localhost:3001;  !!! Zde může/nemusí být lomítko na konci
proxy_pass http://localhost:5001/; !!! Zde musí být lomítko na konci

Ovládání služeb v linuxu:
systemctl stop nginx
systemctl start nginx
systemctl restart nginx		(tj. stop + start)
systemctl reload nginx		(tj. reloads its configuration files and applies any changes without stopping the service)
systemctl status nginx

/etc/nginx/sites-available/default
..................................
server {
	server_name juliek.eu;

	location / {
		proxy_pass http://localhost:3001;
		
	    proxy_set_header        Host $host;
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        X-Forwarded-Proto $scheme;
	}

	location /backend/ {
		proxy_pass http://localhost:5001/;
		
	    proxy_set_header        Host $host;
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        X-Forwarded-Proto $scheme;
	}

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/juliek.eu-0001/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/juliek.eu-0001/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = juliek.eu) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = www.juliek.eu) {
        return 301 https://juliek.eu$request_uri;
    } # managed by Certbot
	
	if ($host = bedobef.eu) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

	listen 80 default_server;
	listen [::]:80 default_server;

	server_name juliek.eu www.juli.ek;
    return 404; # managed by Certbot
}

