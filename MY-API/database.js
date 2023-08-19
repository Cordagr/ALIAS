//database.js
CREATE TABLE `quote` 
( `id` INT(11) NOT NULL AUTO_INCREMENT , 
 `quote` VARCHAR(255) NOT NULL , 
 `author` VARCHAR(255) NOT NULL , 
 `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
 `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
 PRIMARY KEY (`id`), 
 INDEX `idx_author` (`author`), UNIQUE `idx_quote_uniqie` (`quote`)
) 
 ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;
