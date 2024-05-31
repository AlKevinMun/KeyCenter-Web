import React, { useState, useEffect } from "react";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx"
import NavRoute from "../components/NavRoute.jsx"
import FolderTree from "../components/FolderTree.jsx"
import TitleForm from "../components/TitleForm.jsx"
import ServiceKey from "../components/ServiceKeys.jsx"

function MainPage() {
  return (
    React.createElement('div', { className: 'main-container' },
      Logo('../../resources/logotipoWeb.png', 'img-container'),
      NavMenu(),
      NavRoute(),
      React.createElement('div', { className: 'content-containet' },
        React.createElement('div', { className: 'folders-container' },
          FolderTree(),
        ),
        React.createElement('div', { className: 'data-container' },
          TitleForm('Manual d\'instalació'),
          React.createElement('div', { className: 'info-container' },
            Logo('../../resources/insta.png', 'logoImg'),
            React.createElement('h1', { className: 'ManualH1' }, 'Índex'),
            React.createElement('div', { className: 'manualIndex' },
              React.createElement('ul', null,
                React.createElement('li' ,null,
                  React.createElement('a' , { href: '#pas1' , className: 'manualBody' }, 'Pas 1: Base de dades')
                ),
                React.createElement('ul', null,
                  React.createElement('li' ,null,
                    React.createElement('a' , { href: '#pas1.1' }, 'Instal·lació i creació base de dades')
                  ),
                  React.createElement('li' ,null,
                    React.createElement('a' , { href: '#pas1.2' }, 'Configuració PostgreSQL')
                  ),
                  React.createElement('li' ,null,
                    React.createElement('a' , { href: '#pas1.3' }, 'Creació taules')
                  )
                ),
                React.createElement('li' ,null,
                  React.createElement('a' , { href: '#pas2' , className: 'manualBody' }, 'Pas 2: API')
                ),
                React.createElement('ul', null,
                  React.createElement('li' ,null,
                    React.createElement('a' , { href: '#pas2.1' }, 'Descarregar API')
                  ),
                  React.createElement('li' ,null,
                    React.createElement('a' , { href: '#pas2.2' }, 'Configuració API')
                  )
                ),
                React.createElement('li' ,null,
                  React.createElement('a' , { href: '#pas3' , className: 'manualBody' }, 'Pas 3: Servidor Nginx')
                ),
                React.createElement('ul', null,
                  React.createElement('li' ,null,
                    React.createElement('a' , { href: '#pas3.1' }, 'Instal·lació Nginx')
                  ),
                  React.createElement('li' ,null,
                    React.createElement('a' , { href: '#pas3.2' }, 'Configuració Nginx')
                  )
                ),
                React.createElement('li' ,null,
                  React.createElement('a' , { href: '#pas4' , className: 'manualBody' }, 'Pas 4: Servidor React')
                ),
                React.createElement('ul', null,
                  React.createElement('li' ,null,
                    React.createElement('a' , { href: '#pas4.1' }, 'Instal·lació React')
                  ),
                  React.createElement('li' ,null,
                    React.createElement('a' , { href: '#pas4.2' }, 'Configuració React')
                  )
                )
              ),
            ),
            React.createElement('h1', { id: 'pas1', className: 'ManualH1' }, 'Pas 1: Base de dades'),
            React.createElement('h2', { id: 'pas1.1', className: 'ManualH2' }, 'Instal·lació i creació base de dades'),
            React.createElement('p', { className: 'manualBody' }, 'Primer s\'ha d\'instal·lar el gestor de base de dades PostgreSQL de la següent manera:'),
            React.createElement('pre', null,
              React.createElement('code', null,
`sudo apt update -y

sudo apt install postgresql -y`),
            ),
            React.createElement('p', { className: 'manualBody' },
              'Amb el ',
              React.createElement('strong', null, 'PostgreSQL'),
              ' instal·lat s\'ha de connectar amb l\’usuari de ',
              React.createElement('strong', null, 'PostgreSQL'),
              ' i entrar en el mateix ',
              React.createElement('strong', null, 'PostgreSQL')
            ),
            React.createElement('pre', null,
              React.createElement('code', null,
`sudo -u postgres -i

psql`
              )
            ),
            React.createElement('p', { className: 'manualBody' },
              'Ara, dins de la consola del ',
              React.createElement('strong', null, 'PostgreSQL'),
              ' s\'ha de crear la base de dades (Para està instal·lació el nom de la base de dades serà keycenter.)'
            ),
            React.createElement('pre', null,
              React.createElement('code', null,`CREATE DATABASE keycenter;`)
            ),
            React.createElement('p', { className: 'manualBody' },'Un cop creada la base de dades tocarà crear l\'usuari i donar-li permisos dins la base de dades.'),
            React.createElement('pre', null,
              React.createElement('code', null,
`CREATE USER usuario WITH PASSWORD 'password';

GRANT ALL PRIVILEGES ON DATABASE "keycenter" to usuario;`
              )
            ),
            React.createElement('h2', { id: 'pas1.2', className: 'ManualH2' }, 'Configuració PostgreSQL'),
            React.createElement('p', { className: 'manualBody' },'Un cop ja creada la base de dades, tocaria configurar postgres perquè permeti connexions des de fora de la màquina.'),
            React.createElement('pre', null,
              React.createElement('code', null,`sudo vim /etc/postgresql/16/main/postgresql.conf`)
            ),
            React.createElement('p', { className: 'manualBody' },'La següent línia s\'ha de canviar:'),
            React.createElement('pre', null,
              React.createElement('code', null,`#listen_addresses = 'localhost'`)
            ),
            React.createElement('p', { className: 'manualBody' },'S\'ha de substituir per:'),
            React.createElement('pre', null,
              React.createElement('code', null,`listen_addresses = '*'`)
            ),
            React.createElement('p', { className: 'manualBody' },'També s\'ha de configurar el següent fitxer'),
            React.createElement('pre', null,
              React.createElement('code', null,`sudo vim /etc/postgresql/16/main/pg_hba.conf`)
            ),
            React.createElement('p', { className: 'manualBody' },'Afegim la següent línia al final del fitxer'),
            React.createElement('pre', null,
              React.createElement('code', null,`host all all 0.0.0.0/0 md5`)
            ),
            React.createElement('p', { className: 'manualBody' },
              'Per aplicar tots els canvis a la configuració, reiniciem ',
              React.createElement('strong', null, 'PostgreSQL')
            ),
            React.createElement('pre', null,
              React.createElement('code', null,`sudo invoke-rc.d postgresql reload`)
            ),
            React.createElement('p', { className: 'manualBody' },'Per donar per finalitzada la configuració, s\'ha de provar si aquesta funciona com deuria. Per això farà falta que et connectes a la base de dades de la següent manera (en la ip s\'ha de posar la ip de la màquina on es troba la base de dades):'),
            React.createElement('pre', null,
              React.createElement('code', null,`psql -h 192.168.22.126 -U usuario -d keycenter`)
            ),
            React.createElement('h2', { id: 'pas1.3', className: 'ManualH2' }, 'Creació taules'),
            React.createElement('p', { className: 'manualBody' },
              'Primer que tot és necessari connectar-se a la base de dades amb la instrucció anterior. Una vegada fet, entra al següent enllaç per còpia i pegar tot el contingut del .sql.',
              React.createElement('a' , { href: 'https://github.com/AlKevinMun/KeyCenter-Api/blob/main/keycenter-api/src/main/resources/KeyCenter.sql' , className: 'manualBody' }, 'https://github.com/AlKevinMun/KeyCenter-Api/blob/main/keycenter-api/src/main/resources/KeyCenter.sql')
            ),
            React.createElement('p', { className: 'manualBody' },'La base de dades hauria de tindre aquest aspecte:'),
            React.createElement('pre', null,
              React.createElement('code', null,
`          	List of relations
 Schema | 	Name  	|   Type   |  Owner
--------+---------------+----------+---------
 public | incidence 	| table	| usuario
 public | incidence_seq | sequence | usuario
 public | llave     	| table	| usuario
 public | qr        	| table	| usuario
 public | users     	| table	| usuario
 public | users_seq 	| sequence | usuario
(6 rows\)`
              )
            ),
            React.createElement('h1', { id: 'pas2', className: 'ManualH1' }, 'Pas 2: API'),
            React.createElement('h2', { id: 'pas2.1', className: 'ManualH2' }, 'Descarregar API'),
            React.createElement('p', { className: 'manualBody' },
              'Descarregar ',
              React.createElement('strong', null, 'l\'API'),
              ' és una tasca sense dificultat, només s\'ha d\'accedir al següent ',
              React.createElement('strong', null, 'github'),
              '  i en l’apartat de codi donar-li a descarregar zip o clonar el directori. ',
              React.createElement('a' , { href: 'https://github.com/AlKevinMun/KeyCenter/' , className: 'manualBody' }, 'https://github.com/AlKevinMun/KeyCenter/')
            ),
            React.createElement('h2', { id: 'pas2.2', className: 'ManualH2' }, 'Configuració API'),
            React.createElement('p', { className: 'manualBody' },
              'El primer que s’ha de fer dins de ',
              React.createElement('strong', null, 'l\'API'),
              ' és anar al següent fitxer i editar-lo '
            ),
            React.createElement('pre', null,
              React.createElement('code', null,`vi keycenter/src/main/resources/application.yaml`)
            ),
            React.createElement('p', { className: 'manualBody' },'El fitxer hauria de quedar d\'una manera semblant a la següent (La IP ha de ser la mateixa que en la base de dades, i on posa keycenter és el nom de la base de dades):'),
            React.createElement('pre', null,
              React.createElement('code', null,
`spring:
  datasource:
    url: jdbc:postgresql://192.168.245.255:5432/keycenter
    username: usuario
    password: password`
              )
            ),
            React.createElement('h1', { id: 'pas3', className: 'ManualH1' }, 'Pas 3: Servidor Nginx'),
            React.createElement('h2', { id: 'pas3.1', className: 'ManualH2' }, 'Instal·lació Nginx'),
            React.createElement('p', { className: 'manualBody' },
              'Per instal·lar el servidor ',
              React.createElement('strong', null, 'Nginx'),
              ' el primer que s\'ha de fer les següents comandes en el terminal.'
            ),
            React.createElement('pre', null,
              React.createElement('code', null,`sudo apt install nginx -y`)
            ),
            React.createElement('p', { className: 'manualBody' },'Per verificar si s’ha instal·lat correctament podem realitzar la següent comanda:'),
            React.createElement('pre', null,
              React.createElement('code', null,`sudo systemctl status nginx`)
            ),
            React.createElement('p', { className: 'manualBody' },'Si està funcionant sense problemes hauria de sortir d\'una manera semblant a aquesta'),
            React.createElement('pre', null,
              React.createElement('code', null,
`nginx.service - A high performance web server and a reverse proxy server
	Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
	Active: active (running) since Thu 2024-04-15 09:31:48 CEST; 7min ago
  	Docs: man:nginx(8)
Process: 967 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on;
(code=exited, status=0/SUCCESS)
Process: 1008 ExecStart=/usr/sbin/nginx -g daemon on; master_process on;
(code=exited, status=0/SUCCESS)
  Main PID: 1015 (nginx)
 	Tasks: 13 (limit: 8604)
	Memory: 15.9M
   	CPU: 91ms`
              )
            ),
            React.createElement('h2', { id: 'pas3.2', className: 'ManualH2' }, 'Configuració Nginx'),
            React.createElement('p', { className: 'manualBody' },
              'Es vol configurar el ',
              React.createElement('strong', null, 'Nginx'),
              ' com a proxy invers, per això s\'ha d\'anar al següent fitxer:'
            ),
            React.createElement('pre', null,
              React.createElement('code', null,`sudo vi /etc/nginx/sites-available/default`)
            ),
            React.createElement('p', { className: 'manualBody' },'El fitxer ha de quedar de la següent forma:'),
            React.createElement('pre', null,
            React.createElement('code', null,
`##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
server {
  listen 80;
  listen [::]:80;

  root /var/www/html;

  # Add index.php to the list if you are using PHP
  index index.html index.htm index.nginx-debian.html;

  server_name keycenter;

  location / {
    	proxy_pass http://127.0.0.1:3000;
  }

  location /auth {
    	proxy_pass http://127.0.0.1:8080;
  }

  location /api {
    	proxy_pass http://127.0.0.1:8080;
  }
}`
              )
            ),
            React.createElement('p', { className: 'manualBody' },
              'En aquest cas el primer location es tracta del servidor react, el segon del endpoint del Auth de ',
              React.createElement('strong', null, 'l\'AP'),
              ' i l’últim del endpoint pare de tots els altres endpoints de ',
              React.createElement('strong', null, 'l\'AP.')
            ),
            React.createElement('p', { className: 'manualBody' },
              'Una vegada configurat el site, hem d\'anar a la configuració base del ',
              React.createElement('strong', null, 'Nginx:')
            ),
            React.createElement('pre', null,
              React.createElement('code', null,`sudo vi /etc/nginx/nginx.conf`)
            ),
            React.createElement('p', { className: 'manualBody' },'Deixar el fitxer de la següent manera (és possible que per defecte ja estigui configurat així):'),
            React.createElement('pre', null,
              React.createElement('code', null,
`user www-data;
 worker_processes auto;
 pid /run/nginx.pid;
 include /etc/nginx/modules-enabled/*.conf;

 events {
     worker_connections 768;
     # multi_accept on;
 }

 http {

     ##
     # Basic Settings
     ##

     sendfile on;
     tcp_nopush on;
     types_hash_max_size 2048;
     # server_tokens off;

     # server_names_hash_bucket_size 64;
     # server_name_in_redirect off;

     include /etc/nginx/mime.types;
     default_type application/octet-stream;

     ##
     # SSL Settings
     ##

     ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
     ssl_prefer_server_ciphers on;

     ##
     # Logging Settings
     ##

     access_log /var/log/nginx/access.log;
     error_log /var/log/nginx/error.log;

     ##
     # Gzip Settings
     ##

     gzip on;

     # gzip_vary on;
     # gzip_proxied any;
     # gzip_comp_level 6;
     # gzip_buffers 16 8k;
     # gzip_http_version 1.1;
     # gzip_types text/plain text/css application/json application/javascript
     text/xml application/xml application/xml+rss text/javascript;

     ##
     # Virtual Host Configs
     ##

     include /etc/nginx/conf.d/*.conf;
     include /etc/nginx/sites-enabled/*;

 }`
              )
            ),
            React.createElement('p', { className: 'manualBody' },'Per finalitzar resta reiniciar el servidor amb la següent comanda i verifiquem si tot ha anat bé:'),
            React.createElement('pre', null,
              React.createElement('code', null,
`sudo nginx -s reload

sudo systemctl status nginx`
              )
            ),
            React.createElement('h1', { id: 'pas4', className: 'ManualH1' }, 'Pas 4: Servidor React'),
            React.createElement('h2', { id: 'pas4.1', className: 'ManualH2' }, 'Instal·lació React'),
            React.createElement('p', { className: 'manualBody' },
              'Primer que tot és necessari descarregar el distribuïdor de paquets de ',
              React.createElement('strong', null, 'node (npm).')
            ),
            React.createElement('pre', null,
              React.createElement('code', null,
`sudo apt update -y

sudo apt install npm -y`
              )
            ),
            React.createElement('p', { className: 'manualBody' },
              'Un cop ja amb npm, s\'instal·la ',
              React.createElement('strong', null, 'React'),
              ' fem ús d\'aquest distribuïdor de paquets'
            ),
            React.createElement('pre', null,
              React.createElement('code', null,`sudo npm i react`)
            ),
            React.createElement('p', { className: 'manualBody' },
              'Després de descarregar ',
              React.createElement('strong', null, 'React'),
              ', es descarreguen totes les dependències necessàries en aquesta línia:'
            ),
            React.createElement('pre', null,
              React.createElement('code', null,
`sudo npm i react-dom
sudo npm i react-router-dom
sudo npm i axios
sudo npm i react-intersection-observer
sudo npm i react-scripts`
              )
            ),
            React.createElement('p', { className: 'manualBody' },
              'Després de descarregar ',
              React.createElement('strong', null, 'React '),
              React.createElement('a' , { href: 'https://github.com/AlKevinMun/KeyCenter-Web' , className: 'manualBody' }, 'https://github.com/AlKevinMun/KeyCenter/')
            ),
            React.createElement('p', { className: 'manualBody' },'Per finalitzar, per comprovar el funcionament serà necessari anar a la ubicació del projecte, i dins la carpeta KeyCenter-Web, fer servir la següent comanda:'),
            React.createElement('pre', null,
              React.createElement('code', null,`sudo npm start`)
            ),
            React.createElement('p', { className: 'manualBody' },
             'Aquesta comanda t\'enviarà a localhost:3000. A causa de l\'ús del ',
             React.createElement('strong', null, 'Nginx '),
             'no és necessari posar el port, és més, fer servir el port donarà errors.',
            ),
            React.createElement('h2', { id: 'pas4.2', className: 'ManualH2' }, 'Configuració React'),
            React.createElement('p', { className: 'manualBody' },
              'Un cop el ',
              React.createElement('strong', null, 'React'),
              ' ja funciona, solament s\'ha de configurar el fixer de ',
              React.createElement('strong', null, 'axios.jsx'),
              '. L\'únic que s\'ha de modificar és la següent línia:'
            ),
            React.createElement('pre', null,
              React.createElement('code', null,
`const axiosInstance = axios.create({
     //baseURL: 'http://192.168.242.12:8080/api',
     baseURL: '/api',
     timeout: 5000,
     headers: {
         'Content-Type': 'application/json',
         'Authorization': "Basic " + btoa('admin@elpuig.xeill.net' + ":" + '2444')
     },
 });`
              )
            ),
            React.createElement('p', { className: 'manualBody' },'Modificar l’apartat d\'autorització per al correu i la contrasenya de l\'administrador.'),
          )
        ),
        React.createElement('div', { className: 'service-keys-container' },
          ServiceKey(),
        )
      )
    )
  );
}

export default MainPage;
