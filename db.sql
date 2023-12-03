CREATE DATABASE IF NOT EXISTS `multi_app_db`;

USE `multi_app_db`;

CREATE TABLE IF NOT EXISTS `users`
(
    id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS `notes`
(
    id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
    user_id CHAR(36),
    title VARCHAR(150) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS `chats`
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    from_user CHAR(36) NOT NULL,
    content VARCHAR(500) NOT NULL,
    to_user CHAR(36) NOT NULL,
    FOREIGN KEY (from_user) REFERENCES users(id)
);