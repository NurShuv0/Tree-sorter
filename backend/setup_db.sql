-- Tree Sorter: Fix MySQL user for XAMPP
DROP USER IF EXISTS 'tree_sorter_user'@'%localhost';
DROP USER IF EXISTS 'tree_sorter_user'@'localhost';
DROP USER IF EXISTS 'tree_sorter_user'@'127.0.0.1';

CREATE USER 'tree_sorter_user'@'localhost' IDENTIFIED BY 'TreeSorter123';
CREATE USER 'tree_sorter_user'@'127.0.0.1' IDENTIFIED BY 'TreeSorter123';

GRANT ALL PRIVILEGES ON `tree_sorter`.* TO 'tree_sorter_user'@'localhost';
GRANT ALL PRIVILEGES ON `tree_sorter`.* TO 'tree_sorter_user'@'127.0.0.1';
GRANT ALL PRIVILEGES ON `test_tree_sorter`.* TO 'tree_sorter_user'@'localhost';
GRANT ALL PRIVILEGES ON `test_tree_sorter`.* TO 'tree_sorter_user'@'127.0.0.1';

FLUSH PRIVILEGES;

SELECT user, host, plugin FROM mysql.user WHERE user = 'tree_sorter_user';
