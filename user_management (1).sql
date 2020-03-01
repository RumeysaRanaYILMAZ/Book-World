-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 31 Ara 2019, 00:02:12
-- Sunucu sürümü: 10.4.10-MariaDB
-- PHP Sürümü: 7.1.33
use user_management;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `user_management`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `book_title` varchar(45) DEFAULT NULL,
  `book_category` varchar(45) DEFAULT NULL,
  `book_price` int(11) DEFAULT NULL,
  `author` varchar(50) NOT NULL,
  `img` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `books`
--

INSERT INTO `books` (`book_id`, `book_title`, `book_category`, `book_price`, `author`, `img`) VALUES
(1, 'Stig of the Dump', 'Child Novel', 10, 'Clive King', 'images/book1.jpg'),
(2, 'Artemis Fowl', 'Criminal Novel', 12, 'Eoin Colfer', 'images/book2.jpg'),
(3, 'Mister Magnolia', 'Child Tale', 6, 'Quentin Blake', 'images/book3.jpg'),
(4, 'Pride and Prejudice', 'Love Novel', 18, 'Jane Austen', 'images/book4.jpg'),
(5, 'Animal Farm', 'Political Story', 11, 'George Orwell', 'images/book5.jpg'),
(6, 'Crime and Punishment', 'Crime Novel', 14, 'Fyodor Dostoyevsky', 'images/book6.jpg'),
(7, 'The Odyssey', 'Epic', 10, 'Homer', 'images/book7.jpg'),
(8, 'War and Peace', 'Novel', 12, 'Leo Tolstoy', 'images/book8.jpg'),
(9, 'Milk and Honey', 'Poetry', 10, 'Rupi Kaur', 'images/book9.jpg'),
(10, 'Pillow Thoughts', 'Poetry', 12, 'Courtney Peppernell', 'images/book10.jpg');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user_info`
--

CREATE TABLE `user_info` (
  `number` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `surname` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` int(11) NOT NULL,
  `role` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `user_info`
--

INSERT INTO `user_info` (`number`, `name`, `surname`, `email`, `password`, `role`) VALUES
(1234, 'Rana', 'Yılmaz', 'rry@gmail.com', 12345, 'keke'),
(1236, 'Kübran', 'Asler', 'ka@gmail.com', 12345, 'kübü'),
(2345, 'Esra', 'Yela', 'esr@gmail.com', 12345, 'setsa'),
(12347, 'Kübra', 'Asra', 'kbrr@gmail.com', 12345, 'kübü'),
(345609, 'Tear', 'Mese', 'tearmese@gmail.com', 12345, 'keje'),
(989098, 'Esra', 'Mese', 'em@gmail.com', 12345, 'setsa'),
(3456333, 'Kayn', 'Serra', 'KS@gmail.com', 12345, 'setsa'),
(34560933, 'Era', 'Ters', 'et@gmail.com', 12345, 'keje'),
(34563334, 'Kayra', 'Serra', 'KS@gmail.com', 12345, 'setsa');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user_info_has_books`
--

CREATE TABLE `user_info_has_books` (
  `user_number` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `book_point` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `user_info_has_books`
--

INSERT INTO `user_info_has_books` (`user_number`, `book_id`, `book_point`) VALUES
(1234, 3, 5),
(1234, 4, 5),
(1234, 5, 4),
(1234, 6, 4),
(1234, 7, 4),
(1234, 8, 5),
(1236, 2, 4),
(1236, 6, 5),
(1236, 7, 4),
(1236, 8, 5),
(2345, 1, 3),
(2345, 2, 3),
(2345, 6, 3),
(12347, 1, 5),
(12347, 6, 4),
(12347, 9, 5),
(345609, 6, 3),
(989098, 4, 5),
(989098, 10, 4),
(3456333, 3, 4),
(3456333, 5, 4),
(3456333, 7, 4),
(3456333, 8, 4),
(3456333, 10, 3),
(34560933, 1, 3),
(34560933, 2, 4),
(34560933, 3, 5),
(34563334, 1, 4),
(34563334, 3, 5),
(34563334, 4, 5);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`);

--
-- Tablo için indeksler `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`number`);

--
-- Tablo için indeksler `user_info_has_books`
--
ALTER TABLE `user_info_has_books`
  ADD PRIMARY KEY (`user_number`,`book_id`),
  ADD KEY `fk_user_info_has_Books_user_info_idx` (`user_number`),
  ADD KEY `fk_user_info_has_Books_Books1_idx` (`book_id`);

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `user_info_has_books`
--
ALTER TABLE `user_info_has_books`
  ADD CONSTRAINT `fk_user_info_has_Books_Books1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_info_has_Books_user_info` FOREIGN KEY (`user_number`) REFERENCES `user_info` (`number`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
