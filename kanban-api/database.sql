DROP DATABASE IF EXISTS kanban_db;
CREATE DATABASE kanban_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kanban_db;

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  status ENUM('todo','doing','done') NOT NULL DEFAULT 'todo',
  priority ENUM('alta','media','baja') NOT NULL DEFAULT 'media',
  project_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tasks_project FOREIGN KEY (project_id) REFERENCES projects(id)
);

INSERT INTO projects (name) VALUES ('App web'), ('App movil');

INSERT INTO tasks (title, status, priority, project_id) VALUES
  ('Diseñar la base de datos', 'done', 'alta', 1),
  ('Crear el login', 'doing', 'media', 1),
  ('Escribir pruebas', 'todo', 'baja', 2),
  ('Preparar la demo', 'todo', 'alta', NULL);

SELECT * FROM tasks;