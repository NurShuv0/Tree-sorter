# Use PyMySQL as the MySQL database driver on Windows where
# mysqlclient C extensions are harder to install.
# This must appear before any Django database code is imported.
import pymysql

pymysql.install_as_MySQLdb()
