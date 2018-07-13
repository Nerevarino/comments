Тестовый мини-сайт создавался на XUbuntu 18.04 LTS (Ubuntu Xfce),
php7, apache2, postgresql10
Страницы тестировались в Mozilla Firefox 61.0.1 64bit for Ubuntu
Использовался текстовый редактор Emacs


Установка ПО для окружения:

sudo apt install apache2 postgresql php7 
sudo apt install php-mdb2-driver-pgsql - драйвер для postgres, чтобы работал PHP PDO



настройка PostgreSQL:
  sudo su postgres  - действуем от имени администратора PostgreSQL
  createuser -P evgeniy - создаем нового пользователя с паролевым доступом к  БД, под которым сайт будет взаимодействовать с БД
  createdb Comments  -O evgeniy - создаем базу данных сайта Comments  и назначаем evgeniy ее владельцем 
  sudo systemctl restart postgresql    - перезагружаем сервер PostgreSQL

База данных создается не самим сайтом на лету, а отдельно, сайт уже только добавляет данные
в исходном коде сайта переходим в папку sql
создаем таблицу для БД :

psql -d Comments -f tables.sql -U evgeniy -W


Настройка Apache:

sudo mkdir /var/www/Comments - создаем директорию для тестового сайта
sudo chmod -R 755 /var/www/Comments  меняем права на директорию сайта и ее поддиректории, 
                                    чтобы не было ошибки доступа при работе веб сервера

создаем конфигурационный файл для нашего сайта 
в директории /etc/apache2/sites-enabled с именем Comments.conf

делаем настройку виртуального хоста для нашего сайта и устанавливаем 
содержимое файла Comments.conf :

<VirtualHost localhost:80>
	# The ServerName directive sets the request scheme, hostname and port that
	# the server uses to identify itself. This is used when creating
	# redirection URLs. In the context of virtual hosts, the ServerName
	# specifies what hostname must appear in the request's Host: header to
	# match this virtual host. For the default virtual host (this file) this
	# value is not decisive as it is used as a last resort host regardless.
	# However, you must set it for any further virtual host explicitly.
	#ServerName www.example.com

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/Comments
	DirectoryIndex html/index.html

	# Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
	# error, crit, alert, emerg.
	# It is also possible to configure the loglevel for particular
	# modules, e.g.
	#LogLevel info ssl:warn

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

	# For most configuration files from conf-available/, which are
	# enabled or disabled at a global level, it is possible to
	# include a line for only one particular virtual host. For example the
	# following line enables the CGI configuration for this host only
	# after it has been globally disabled with "a2disconf".
	#Include conf-available/serve-cgi-bin.conf
</VirtualHost>
 
по сути это просто копирование конфигурационного шаблона для виртуального хоста, 
шаблон можно найти в /etc/apache2/sites-enabled/000-default.conf

<VirtualHost localhost:80> - здесь поставили localhost, чтобы вбивая в браузере 
localhost  мы бы переходили на наш тестовый сайт

DocumentRoot /var/www/Comments - установка корневой директории нашего сайта

DirectoryIndex html/index.html - устанавливаем индексный файл нашего сайта - 
именно его будет отдавать веб-сервер браузеру по стандартному запросу (http://домен/)

перезагружаем веб-сервер Apache:
sudo systemctl restart apache2



Настройка рабочего места:
создаем папку для проекта, над которым будем работать 
mkdir $HOME/projects/web/Comments

переходим в директорию проекта сайта
cd $HOME/projects/web/Comments

копируем сюда файлы сайта из git- репозитория
git clone https://github.com/Nerevarino/comments

Теперь можно редактировать и изменять сайт,
для просмотра изменений в браузере:
cp ./* /var/www/Comments - копирование файлов сайта в его корневую директорию
во вкладке браузера с нашим сайтом жмем Ctrl+F5  (предполагалось, что текущая директория - папка с проектом)

понравившиеся изменения обычно фиксирую git-ом так:
git add .   -  индексирование всех измененных файлов
git commit -a -m "NewCommitName" - создание коммита

использовал только основную ветку master

Взаимодействие с репозиторием github-a:
git remote add github https://github.com/Nerevarino/comments - добавление репозитория
git push github master - отправка содержимого ветки master на репозиторий github-a





КОММЕНТАРИИ КАСАТЕЛЬНО РЕАЛИЗАЦИИ ТЕСТОВОГО САЙТА:

1)В секции видимых комментариев видны только 3 последних комментария
   хоть контейнеру комментариев и был назначен css стиль overflow:auto,
   при использовании функции Jquery append на элементе контейнере, 
   почему-то все лишние (после 3-го) сообщения вылезают за края, не было времени понять почему
   поэтому количество комментов строго ограничено

2)Сайт получает последние 3 сообщения раз в 3 секунды по таймеру с помощью AJAX
  знаю про технологию WebSocket, но у браузеров вроде как экспериментальная поддержка,
  да и для php надо искать реализацию (библиотека бы позволила установить обоюдный канал общения между браузером и сервером,
   тогда не сервер бы сам доставлял нехватающие сообщения всем активным клиентам)

3)Сайт делался примерно 7 часов (вечер четверга и утро пятницы) с затратами на frontend 60% и backend 40%;



















 