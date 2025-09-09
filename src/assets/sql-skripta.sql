-- ===================================================
-- SQL SKRIPTA ZA 10 OBJEKATA U SVAKOJ TABLICI
-- Sustav upravljanja tečajevima stranim jezika
-- ===================================================

-- 1. TABLICA PROFESORI
CREATE TABLE profesori (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ime VARCHAR(50) NOT NULL,
    prezime VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    telefon VARCHAR(20)
);

-- 2. TABLICA TEČAJEVI
CREATE TABLE tecajevi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    naziv VARCHAR(100) NOT NULL,
    jezik VARCHAR(50) NOT NULL,
    profesor_id INT,
    cijena DECIMAL(8,2),
    FOREIGN KEY (profesor_id) REFERENCES profesori(id)
);

-- 3. TABLICA UPISI
CREATE TABLE upisi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    profesor_id INT,
    tecaj_id INT,
    broj_polaznika INT DEFAULT 0,
    FOREIGN KEY (profesor_id) REFERENCES profesori(id),
    FOREIGN KEY (tecaj_id) REFERENCES tecajevi(id)
);

-- ===================================================
-- 1. PROFESORI - 10 zapisa
-- ===================================================
INSERT INTO profesori (ime, prezime, email, telefon) VALUES
('Ana', 'Anić', 'ana.anic@tecajevi.hr', '099-123-4567'),
('Marko', 'Marković', 'marko.markovic@tecajevi.hr', '098-765-4321'),
('Petra', 'Petrić', 'petra.petric@tecajevi.hr', '097-111-2222'),
('Ivan', 'Ivanović', 'ivan.ivanovic@tecajevi.hr', '096-333-4444'),
('Maja', 'Majić', 'maja.majic@tecajevi.hr', '095-555-6666'),
('Luka', 'Lukić', 'luka.lukic@tecajevi.hr', '094-777-8888'),
('Sara', 'Šarić', 'sara.saric@tecajevi.hr', '093-999-0000'),
('Tomislav', 'Tomić', 'tomislav.tomic@tecajevi.hr', '092-222-3333'),
('Elena', 'Elenić', 'elena.elenic@tecajevi.hr', '091-444-5555'),
('David', 'Davidović', 'david.davidovic@tecajevi.hr', '098-666-7777');

-- ===================================================
-- 2. TEČAJEVI - 10 zapisa
-- ===================================================
INSERT INTO tecajevi (naziv, jezik, profesor_id, cijena) VALUES
('Engleski za početnike', 'Engleski', 1, 800.00),
('Napredni engleski', 'Engleski', 1, 1000.00),
('Njemački A1', 'Njemački', 2, 750.00),
('Njemački A2', 'Njemački', 2, 850.00),
('Francuski osnovni', 'Francuski', 3, 700.00),
('Francuski razgovorni', 'Francuski', 3, 900.00),
('Španjolski za turiste', 'Španjolski', 4, 650.00),
('Talijanski početni', 'Talijanski', 5, 720.00),
('Ruski za početnike', 'Ruski', 6, 780.00),
('Kineski mandarin', 'Kineski', 7, 950.00);

-- ===================================================
-- 3. UPISI - 10 zapisa
-- ===================================================
INSERT INTO upisi (profesor_id, tecaj_id, broj_polaznika) VALUES
(1, 1, 15),  -- Ana Anić, Engleski za početnike, 15 polaznika
(1, 2, 12),  -- Ana Anić, Napredni engleski, 12 polaznika
(2, 3, 18),  -- Marko Marković, Njemački A1, 18 polaznika
(2, 4, 10),  -- Marko Marković, Njemački A2, 10 polaznika
(3, 5, 14),  -- Petra Petrić, Francuski osnovni, 14 polaznika
(3, 6, 8),   -- Petra Petrić, Francuski razgovorni, 8 polaznika
(4, 7, 20),  -- Ivan Ivanović, Španjolski za turiste, 20 polaznika
(5, 8, 16),  -- Maja Majić, Talijanski početni, 16 polaznika
(6, 9, 11),  -- Luka Lukić, Ruski za početnike, 11 polaznika
(7, 10, 9);  -- Sara Šarić, Kineski mandarin, 9 polaznika

