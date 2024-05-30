# Manual d'instal·lació


## Índex
* ### [Pas 1: Base de dades](#Pas1:Base_de_dades)
  * ### [Instal·lació i creació base de dades](#install_database)
  * ### [Configuració PostgreSQL](#config_database)
  * ### [Creació taules](#create_tables)
* ### [Pas 2: API](#Pas2:Api)
  * ### [Descarregar API](#download_API)	
  * ### [Configuració API](#config_API)
* ### [Pas 3: Servidor Nginx](#Pas3:Servidor_Nginx) 
  * ### [Instal·lació Nginx](#install_nginx)
  * ### [Configuració Nginx](#config_nginx)
* ### [Pas 4: Servidor React](#Pas4:Servidor:_React)
  * ### [Instal·lació React](#install_react)
  * ### [Configuració React](#config_react)

## Pas 1: Base de dades <a name="Pas1:Base_de_dades"></a>

### Instal·lació i creació base de dades. <a name="install_database"></a>

Primer s'ha d'instal·lar el gestor de base de dades **PostgreSQL** de la següent manera:

```sudo apt install postgresql -y```

Amb el **PostgreSQL** instal·lat s'ha de connectar amb l’usuari de **PostgreSQL** i entrar en el mateix **PostgreSQL**.

```
sudo -u postgres -i

psql
```

Ara, dins de la consola del **PostgreSQL** s'ha de crear la base de dades (Para està instal·lació el nom de la base de dades serà keycenter.)

```CREATE DATABASE keycenter;```

Un cop creada la base de dades tocarà crear l'usuari i donar-li permisos dins la base de dades.

```
CREATE USER usuario WITH PASSWORD 'password';

GRANT ALL PRIVILEGES ON DATABASE "keycenter" to usuario;
```
### Configuració PostgreSQL <a name="config_database"></a>

Un cop ja creada la base de dades, tocaria configurar **postgreSQL** perquè permeti connexions des de fora de la màquina.

```sudo vim /etc/postgresql/16/main/postgresql.conf```

La següent línia s'ha de canviar:

```#listen_addresses = 'localhost'```

S'ha de substituir per:

```listen_addresses = '*' ```

També s'ha de configurar el següent fitxer

```sudo vim /etc/postgresql/16/main/pg_hba.conf```

Afegim la següent línia al final del fitxer

```host all all 0.0.0.0/0 md5```

Per aplicar tots els canvis a la configuració, reiniciem **PostgreSQL**

```sudo invoke-rc.d postgresql reload```

Per donar per finalitzada la configuració, s'ha de provar si aquesta funciona com
deuria. Per això farà falta que et connectes a la base de dades de la següent manera (en la ip s'ha de posar la ip de la màquina on es troba la base de dades):

```psql -h 192.168.22.126 -U usuario -d keycenter```

### Creació taules <a name="create_tables"></a>

Primer que tot és necessari connectar-se a la base de dades amb la instrucció anterior. Una vegada fet, entra al següent enllaç per còpia i pegar tot el contingut del .sql.

https://github.com/AlKevinMun/KeyCenter/blob/main/Api/KeyCenter.sql

La base de dades hauria de tindre aquest aspecte:

```
          	List of relations
Schema | 	Name  	|   Type   |  Owner  
--------+---------------+----------+---------
public | incidence 	| table	| usuario
public | incidence_seq | sequence | usuario
public | llave     	| table	| usuario
public | qr        	| table	| usuario
public | users     	| table	| usuario
public | users_seq 	| sequence | usuario
(6 rows)
```

## Pas 2: API <a name="Pas2:Api"></a>
### Descarregar API <a name="download_API"></a>

Descarregar **l'API** és una tasca sense dificultat, només s'ha d'accedir al següent github i en l’apartat de codi donar-li a descarregar zip o clonar el directori.

https://github.com/AlKevinMun/KeyCenter/

### Configuració API <a name="config_API"></a>

El primer que s’ha de fer dins de **l'API** és anar al següent fitxer i editar-lo

```vi keycenter/src/main/resources/application.yaml```


El fitxer hauria de quedar d'una manera semblant a la següent (La IP ha de ser la mateixa que en la base de dades, i on posa keycenter és el nom de la base de dades):
```
spring:
datasource:
url: jdbc:postgresql://192.168.245.255:5432/keycenter
username: usuario
password: password
```



## Pas 3: Servidor Nginx <a name="Pas3:Servidor_Nginx"></a>
### Instal·lació Nginx <a name="install_nginx"></a>

Per instal·lar el servidor **Nginx** el primer que s'ha de fer les següents comandes en el terminal.
```
sudo apt update -y
sudo apt install nginx -y
```

Per verificar si s’ha instal·lat correctament podem realitzar la següent comanda:
```
sudo systemctl status nginx
```

Si està funcionant sense problemes hauria de sortir d'una manera semblant a aquesta:
```
nginx.service - A high performance web server and a reverse proxy server
Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
Active: active (running) since Thu 2024-04-15 09:31:48 CEST; 7min ago
Docs: man:nginx(8)
Process: 967 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
Process: 1008 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
Main PID: 1015 (nginx)
Tasks: 13 (limit: 8604)
Memory: 15.9M
CPU: 91ms
```

### Configuració Nginx <a name="config_nginx"></a>

Es vol configurar el **Nginx** com a proxy invers, per això s'ha d'anar al següent fitxer:

```sudo vi /etc/nginx/sites-available/default```


El fitxer ha de quedar de la següent forma:
```
##
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
```

En aquest cas el primer location es tracta del servidor **React**, el segon del endpoint del Auth de **l'API**, i l’últim del endpoint pare de tots els altres endpoints de **l'API.**

Una vegada configurat el site, hem d'anar a la configuració base del **Nginx**:

```sudo vi /etc/nginx/nginx.conf```


Deixar el fitxer de la següent manera (és possible que per defecte ja estigui configurat així):
```
user www-data;
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
    # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    ##
    # Virtual Host Configs
    ##

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;

}
```

Per finalitzar resta reiniciar el servidor amb la següent comanda i verifiquem si tot ha anat bé:
```
sudo nginx -s reload

sudo systemctl status nginx
```

## Pas 4: Servidor React <a name="Pas4:Servidor_React"></a>
### Instal·lació React <a name="install_react"></a>

Primer que tot és necessari descarregar **node** amb el seu distribuïdor de paquets (**npm**).
```
sudo apt update -y
sudo apt install node -y
sudo apt install npm -y
```

Un cop ja amb npm, s'instal·la **React** fem ús d'aquest distribuïdor de paquets

```sudo npm i react```


Després de descarregar **React**, es descarreguen totes les dependències necessàries en aquesta línia:
```
sudo npm i react-dom
sudo npm i react-route-dom
sudo npm i axios
sudo npm i react-intersection-observer
sudo npm i react-scripts
```

Un cop totes les dependències instal·lades, solament és necessari descarregar el codi font des d'aquest enllaç i fer-ho de la mateixa manera que amb **l'API**. 

https://github.com/AlKevinMun/KeyCenter-Web

Per finalitzar, per comprovar el funcionament serà necessari anar a la ubicació del projecte, i dins la carpeta KeyCenter-Web, fer servir la següent comanda:


```sudo npm start```


### Configuració React <a name="config_nginx"></a>

Un cop el React ja funciona, solament s'ha de configurar el fixer de **axios.jsx**. L'únic que s'ha de modificar és la següent línia:
```
const axiosInstance = axios.create({
//baseURL: 'http://192.168.242.12:8080/api',
baseURL: '/api',
timeout: 5000,
headers: {
'Content-Type': 'application/json',
'Authorization': "Basic " + btoa('admin@elpuig.xeill.net' + ":" + '2444')
},
});
```

Modificar l’apartat d'autorització per al correu i la contrasenya de l'administrador.

