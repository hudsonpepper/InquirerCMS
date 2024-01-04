INSERT INTO department (dep_name) 
VALUES  ("Sales"),
        ("HR"),
        ("Customer Service");

INSERT INTO role (title, salary, department_id) 
VALUES  ("Head of Sales", 120000, 1),
        ("Salesperson", 70000, 1),
        ("Head of HR", 80000, 2),
        ("HR Consultant", 45000, 2),
        ("Head of Customer Service", 90000, 3),
        ("Customer Service Worker", 40000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Bruno", "Meyers", 1, NULL),
        ("Aria", "Schroeder", 2, 1),
        ("Kamora", "Phillips", 2, 1),
        ("Brody", "Mosley", 3, NULL),
        ("Marcel", "Perry", 4, 4),
        ("Ari", "Gilbert", 4, 4),
        ("Abagail", "Simmons", 4, 4),
        ("Irvin", "Valencia", 5, NULL),
        ("Kane", "Chapman", 6, 8),
        ("Keshawn", "Brown", 6, 8),
        ("Angelo", "Nolan", 6, 8),
        ("Rene", "Mcguire", 6, 8)