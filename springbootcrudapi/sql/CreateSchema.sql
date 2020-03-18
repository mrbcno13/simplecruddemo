use sampledb;

CREATE TABLE `tbl_book` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) DEFAULT NULL,
`genre` varchar(255) DEFAULT NULL, `author_id` int NOT NULL,
PRIMARY KEY (`id`));

CREATE TABLE `tbl_author` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) DEFAULT NULL,
`gender` varchar(255) DEFAULT NULL,
PRIMARY KEY (`id`));