-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 05, 2024 alle 17:59
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prova_login`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `artist` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `spotify_url` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `album_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `albums`
--

INSERT INTO `albums` (`id`, `name`, `artist`, `image_url`, `spotify_url`, `user_id`, `album_id`) VALUES
(3, 'Vita Vera Mixtape', 'Tedua', 'https://i.scdn.co/image/ab67616d0000b273773f822a939890caf984f51a', 'https://open.spotify.com/album/3TjYHhJBeXCyoG0mmsTZd9', 0, '3TjYHhJBeX'),
(5, 'La Divina Commedia (Deluxe)', 'Tedua', 'https://i.scdn.co/image/ab67616d0000b27348c2c3db78eeae67163866f4', 'https://open.spotify.com/album/21A98jXqZkeJNNv8fcFTaD', 0, '21A98jXqZk'),
(6, 'Umile (Deluxe)', 'Tony Boy', 'https://i.scdn.co/image/ab67616d0000b273e9a664cd732bbeec2480fdab', 'https://open.spotify.com/album/4asGsNx59kGDbKWXwnd89t', 0, '4asGsNx59k'),
(7, 'Persona', 'Marracash', 'https://i.scdn.co/image/ab67616d0000b2733661bb9255ab380bef12d981', 'https://open.spotify.com/album/3ZOt77e63uMgJXU7xcFpqu', 0, '3ZOt77e63u'),
(8, 'Umile (Deluxe)', 'Tony Boy', 'https://i.scdn.co/image/ab67616d0000b273e9a664cd732bbeec2480fdab', 'https://open.spotify.com/album/4asGsNx59kGDbKWXwnd89t', 0, '4asGsNx59k'),
(9, 'Vita Vera Mixtape', 'Tedua', 'https://i.scdn.co/image/ab67616d0000b273773f822a939890caf984f51a', 'https://open.spotify.com/album/3TjYHhJBeXCyoG0mmsTZd9', 0, '3TjYHhJBeX'),
(10, 'Gemelli', 'Ernia', 'https://i.scdn.co/image/ab67616d0000b273820c0ed614ed30340ba38f28', 'https://open.spotify.com/album/3LXvt5r3boBy4sQQpxmsi9', 0, '3LXvt5r3bo'),
(11, 'La Divina Commedia (Deluxe)', 'Tedua', 'https://i.scdn.co/image/ab67616d0000b27348c2c3db78eeae67163866f4', 'https://open.spotify.com/album/21A98jXqZkeJNNv8fcFTaD', 0, '21A98jXqZk'),
(12, 'Famoso', 'Sfera Ebbasta', 'https://i.scdn.co/image/ab67616d0000b273affffa7ab8803fca453be456', 'https://open.spotify.com/album/5fTgdXawyLC7oZEry7jGEk', 0, '5fTgdXawyL'),
(14, 'UTOPIA', 'Travis Scott', 'https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44', 'https://open.spotify.com/album/18NOKLkZETa4sWwLMIm0UZ', 0, '18NOKLkZET');

-- --------------------------------------------------------

--
-- Struttura della tabella `email`
--

CREATE TABLE `email` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `email`
--

INSERT INTO `email` (`id`, `email`) VALUES
(1, 'aldomoro@gmail.com'),
(3, 'alfiodef@gmail.com'),
(2, 'saveriorome@gmail.com'),
(4, 'saverom@gmail.com');

-- --------------------------------------------------------

--
-- Struttura della tabella `user_albums`
--

CREATE TABLE `user_albums` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `album_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `user_albums`
--

INSERT INTO `user_albums` (`id`, `user_id`, `album_id`) VALUES
(1, 17, 9),
(2, 17, 10),
(3, 3, 11),
(4, 3, 12),
(6, 17, 14);

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id_utente` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_album` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id_utente`, `email`, `username`, `password`, `id_album`) VALUES
(3, 'luca.rossi@gmail.com', 'lucarossi', '$2y$10$t7opQfSFWiV2ssEH/1syJOEc8t0uAIrAEeq0jVRC6AHY05ITFHb42', 3),
(4, 'roger.banana@gmail.com', 'rogerbanana', '$2y$10$.kFTUEJxS1GbrjASvcriGuiFsM0H7FFpj2u/tW5sS8XxTAh9z/GtC', NULL),
(6, 'alfiorap@gmail.com', 'alfiorap', '$2y$10$JXt25MBY0IVTZTmwJXOZze0A7dLtR/r63zGGpqHV.n7PtDJSBJ/n.', NULL),
(7, 'savemusic@gmail.com', 'saver', '$2y$10$0Bo0VcfVtbJd5tPxIHO6PeqkbhT8FOB5O65.xpJP7vfq/c9fz6KSK', NULL),
(11, 'guyuug@gmail.com', 'jvjybjj', '$2y$10$KzE5AtVPxrFj02WoEerOn.icdxVVuwu5rAiAgM13d.jfm5/i3NyAy', NULL),
(12, 'alfiorap@gmail.com', 'alfioooo', '$2y$10$HBQxa6NC7ygZSMkDMajnWeTTjdNhYrHq3YcsSoTYmPntUbRBoLVzu', NULL),
(13, 'alfioo@gmail.com', 'alfio', '$2y$10$ubR/ifE0v3PQ0NXWw7f/Z.z39Lel7HNqXwrobNsfe9B2ar7oOBeCC', NULL),
(14, 'danilo@gmail.com', 'danilo', '$2y$10$W9a0oJcJ8OEaBx7yPZYLy./OVQkAY5u0mr1/ftwt81XIwJOXtwPNK', NULL),
(15, 'aaaaaa@gmail.com', 'aaaaa', '$2y$10$B3EPpZ1PQ64waosGLipJOuJcJJubNkB3eH4oasneKOWSzT.knSqvu', NULL),
(16, 'leo@gmail.com', 'leo', '$2y$10$LqWBldKmVlFUQIDhs8CUnupK3tejP.z3DvvTPrcLOR8m12Kyca0W.', NULL),
(17, 'gianmarco@gmail.com', 'tocco', '$2y$10$sdOjjYmvvq.0gDlhBtlJjejCUp/yAJ6EZfwo01PBI/awNUTHNWbkG', 8),
(18, 'alfiodef@gmail.com', 'alfiodef', '$2y$10$oaQQ7A6n.ADIT.JeZkFtdefz52xAyWLIJm1G7BuiQ.F4H4snXGj5.', NULL);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `email`
--
ALTER TABLE `email`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indici per le tabelle `user_albums`
--
ALTER TABLE `user_albums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `album_id` (`album_id`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id_utente`),
  ADD KEY `fk_id_album` (`id_album`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT per la tabella `email`
--
ALTER TABLE `email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `user_albums`
--
ALTER TABLE `user_albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `id_utente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `user_albums`
--
ALTER TABLE `user_albums`
  ADD CONSTRAINT `user_albums_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `utenti` (`id_utente`),
  ADD CONSTRAINT `user_albums_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`);

--
-- Limiti per la tabella `utenti`
--
ALTER TABLE `utenti`
  ADD CONSTRAINT `fk_id_album` FOREIGN KEY (`id_album`) REFERENCES `albums` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
