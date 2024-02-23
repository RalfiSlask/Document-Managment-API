-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 23, 2024 at 10:25 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ralfislask`
--

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `document_id` int(11) NOT NULL,
  `user_id` varchar(128) NOT NULL,
  `title` varchar(128) DEFAULT NULL,
  `description` varchar(128) DEFAULT NULL,
  `content` mediumtext NOT NULL,
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`document_id`, `user_id`, `title`, `description`, `content`, `createDate`, `deleted`) VALUES
(115, '2d0b1404-9f66-4ee4-94cf-aaeacced9d4c', 'New Document', 'New document desc', '<p><span style=\"font-size: 24pt; font-family: terminal, monaco, monospace; color: rgb(186, 55, 42);\">This is a text!</span></p>', '2024-02-23 10:21:36', 0),
(116, '6a23ab20-d1c5-4665-b1b9-ea8758060790', 'New Document', 'New document desc', '<p><span style=\"font-size: 36pt; color: rgb(132, 63, 161); background-color: rgb(230, 126, 35);\">This is a text for you Kalle!</span></p>', '2024-02-23 10:22:37', 0),
(117, '6a23ab20-d1c5-4665-b1b9-ea8758060790', 'Another document', 'This is another document desc', '<p><span style=\"font-size: 18pt;\">Why will you delete me, please save me someone!</span></p>', '2024-02-23 10:23:41', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(128) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `password` varchar(255) DEFAULT NULL COMMENT 'hashed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `createDate`, `password`) VALUES
(19, 'a7035bdf-b990-4866-8d14-4916d354dfe8', 'test', 'test1@mail.com', '2024-02-23 10:20:41', '$2b$12$PWuZ0.fbU7vljxLoSzzy/uukqNwkD11fumTmimqcIRUNQzkzx9w6C'),
(20, 'ac19f9b6-8041-44bd-ac2d-8a87f371b4a2', 'nisse', 'nisse@mail.com', '2024-02-23 10:21:01', '$2b$12$orAwXUIU6Yg270z3z0ylrOJfCcDJnRu6f/ouDYvbBsE0mWg7etnWu'),
(21, '6a23ab20-d1c5-4665-b1b9-ea8758060790', 'kalle', 'kalle@mail.com', '2024-02-23 10:21:10', '$2b$12$CeW/KvUoL.hgUeAiP7nFoOGkQ3v0NDxdIKqwgAuNHY8VyOwTPWUzm'),
(22, '2d0b1404-9f66-4ee4-94cf-aaeacced9d4c', 'matte', 'matte@mail.com', '2024-02-23 10:21:17', '$2b$12$QshBednmg5801PMYH8RNuup0VSCzKCzjHNiw4oumRxxEHKMXk36eO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `fk_user_uuid` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_uuid` (`uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `fk_user_uuid` FOREIGN KEY (`user_id`) REFERENCES `users` (`uuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
