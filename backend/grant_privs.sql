GRANT ALL PRIVILEGES ON `tree_sorter`.* TO 'tree_sorter_user'@'localhost';
GRANT ALL PRIVILEGES ON `tree_sorter`.* TO 'tree_sorter_user'@'127.0.0.1';
CREATE USER IF NOT EXISTS 'tree_sorter_user'@'::1' IDENTIFIED BY 'TreeSorter123';
GRANT ALL PRIVILEGES ON `tree_sorter`.* TO 'tree_sorter_user'@'::1';
FLUSH PRIVILEGES;
