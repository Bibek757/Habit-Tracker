-- ============================================
-- Habit Tracker System - Database Schema
-- University Student Project
-- ============================================

CREATE DATABASE IF NOT EXISTS habit_tracker;
USE habit_tracker;

-- ============================================
-- Users Table
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_photo VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- Habits Table
-- ============================================
CREATE TABLE IF NOT EXISTS habits (
    habit_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    habit_name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE DEFAULT NULL,
    frequency ENUM('Daily', 'Weekly', 'Monthly') DEFAULT 'Daily',
    reminder_time TIME DEFAULT NULL,
    priority ENUM('High', 'Medium', 'Low') DEFAULT 'Medium',
    status ENUM('Active', 'Completed', 'Paused') DEFAULT 'Active',
    streak_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ============================================
-- Habit Completions Table
-- (Tracks daily completion records)
-- ============================================
CREATE TABLE IF NOT EXISTS habit_completions (
    completion_id INT PRIMARY KEY AUTO_INCREMENT,
    habit_id INT NOT NULL,
    user_id INT NOT NULL,
    completion_date DATE NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (habit_id) REFERENCES habits(habit_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_completion (habit_id, completion_date)
);

-- ============================================
-- Progress Table
-- (Stores daily progress snapshots)
-- ============================================
CREATE TABLE IF NOT EXISTS progress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    progress_date DATE NOT NULL,
    total_habits INT DEFAULT 0,
    completed_habits INT DEFAULT 0,
    completion_percentage DECIMAL(5,2) DEFAULT 0.00,
    streak_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_daily_progress (user_id, progress_date)
);

-- ============================================
-- Sample Data for Testing
-- ============================================

-- Insert sample user (password: password123)
INSERT INTO users (full_name, username, email, password) VALUES
('Bibek Sharma', 'bibek_s', 'bibek.sharma@university.edu', '$2a$10$xJ8K3hQ7Nf5K9QRCG5Yj5OqZvE1Y5yK2F3L6M8NxPsR5T7Y9B3PG');

-- Insert sample habits
INSERT INTO habits (user_id, habit_name, description, category, start_date, frequency, priority, status, streak_count) VALUES
(1, 'Morning Exercise', 'Do 30 minutes of cardio and stretching every morning to stay fit and energized.', 'Fitness', '2026-01-15', 'Daily', 'High', 'Active', 14),
(1, 'Read 30 Minutes', 'Read self-improvement or academic books for at least 30 minutes before bedtime.', 'Personal', '2026-02-01', 'Daily', 'Medium', 'Active', 7),
(1, 'Study Data Structures', 'Practice coding problems and review data structure concepts for exam preparation.', 'Study', '2026-03-10', 'Daily', 'High', 'Active', 21),
(1, 'Drink 8 Glasses Water', 'Stay hydrated by drinking at least 8 glasses of water throughout the day.', 'Health', '2026-01-01', 'Daily', 'Medium', 'Active', 5),
(1, 'Meditation', 'Practice 15 minutes of guided meditation for mental clarity and stress relief.', 'Mindfulness', '2026-02-15', 'Daily', 'Low', 'Active', 3),
(1, 'Weekly Journal', 'Write a weekly reflection journal about goals achieved and lessons learned.', 'Personal', '2026-03-01', 'Weekly', 'Low', 'Active', 10);

-- Insert sample completions
INSERT INTO habit_completions (habit_id, user_id, completion_date) VALUES
(1, 1, CURDATE()),
(3, 1, CURDATE()),
(6, 1, CURDATE());

-- Insert sample progress
INSERT INTO progress (user_id, progress_date, total_habits, completed_habits, completion_percentage, streak_count) VALUES
(1, CURDATE(), 6, 3, 50.00, 14);
