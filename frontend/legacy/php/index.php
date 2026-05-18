<?php
// PHP Script for CRUD Operations and Data Display

// Database connection parameters
$server = "127.0.0.1";
$user = "root";
$pw = ""; // !! IMPORTANT: NEVER use an empty password in production.
$db = "login"; // Your database name

// Establish the database connection using MySQLi
$conn = new mysqli($server, $user, $pw, $db);

// Check if the connection was successful
if ($conn->connect_error) {
    die('Connection to the server failed: ' . $conn->connect_error);
}

// --- PHP Logic for CRUD Operations and Messages ---

$message = ""; // To store success/error messages

// --- INSERT OPERATION ---
// --- INSERT OPERATION (Add New Student) ---
// Changed 'submit_registration' to 'insert_student' to match the form button name
if (isset($_POST['insert_student'])) {
    // Get form data and sanitize it
    $fname = htmlspecialchars($_POST['fname']);
    $lname = htmlspecialchars($_POST['lname']);
    $student_number = htmlspecialchars($_POST['sn']); // Form field name 'sn'
    $class = htmlspecialchars($_POST['class']);
    $password = $_POST['pwd']; // Get the plain text password
    $role = htmlspecialchars($_POST['role']);

    // --- IMPORTANT: Hash the password before storing it ---
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // --- Check if student number already exists ---
    // Assuming your column name is 'Snumber' based on your provided code
    $check_stmt = $conn->prepare("SELECT Snumber FROM students WHERE Snumber = ?");
    $check_stmt->bind_param("s", $student_number);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();

    if ($check_result->num_rows > 0) {
        $message = "<p class='error-message'>Student number " . htmlspecialchars($student_number) . " already exists. Please use a different one.</p>";
    } else {
        // --- Prepare SQL statement for inserting data ---
        // Use prepared statements to prevent SQL Injection
        // Assuming your column names are 'fname', 'lname', 'Snumber', 'class', 'password', 'role'
        $stmt = $conn->prepare("INSERT INTO students (fname, lname, Snumber, class, password, role) VALUES (?, ?, ?, ?, ?, ?)");

        if ($stmt === false) {
            $message = "<p class='error-message'>Error preparing statement: " . htmlspecialchars($conn->error) . "</p>";
        } else {
            // Bind parameters: 'ssssss' means six string parameters
            $stmt->bind_param("ssssss", $fname, $lname, $student_number, $class, $hashed_password, $role);

            // Execute the statement
            if ($stmt->execute()) {
                $message = "<p class='success-message'>New student " . htmlspecialchars($fname) . " " . htmlspecialchars($lname) . " added successfully!</p>";
                // Optional: Clear form fields after successful insert (requires JavaScript or redirect)
                // For a dynamic CRUD, usually you'd re-fetch data to update the table
            } else {
                $message = "<p class='error-message'>Error adding student: " . htmlspecialchars($stmt->error) . "</p>";
            }

            // Close the statement
            $stmt->close();
        }
    }
    $check_stmt->close();
}

// --- DELETE OPERATION ---
if (isset($_POST['delete_student'])) {
    $snumberToDelete = $_POST['snumber_to_delete'];

    if (empty($snumberToDelete)) {
        $message = "<p class='error-message'>Please provide a Student Number to delete.</p>";
    } else {
        $stmt = $conn->prepare("DELETE FROM students WHERE snumber = ?");
        if ($stmt) {
            $stmt->bind_param("s", $snumberToDelete);
            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    $message = "<p class='success-message'>Student with S.N. " . htmlspecialchars($snumberToDelete) . " deleted successfully!</p>";
                } else {
                    $message = "<p class='info-message'>No student found with S.N. " . htmlspecialchars($snumberToDelete) . " to delete.</p>";
                }
            } else {
                $message = "<p class='error-message'>Error deleting student: " . $stmt->error . "</p>";
            }
            $stmt->close();
        } else {
            $message = "<p class='error-message'>Error preparing delete statement: " . $conn->error . "</p>";
        }
    }
}

// --- UPDATE OPERATION ---
if (isset($_POST['update_student'])) {
    $snumberToUpdate = $_POST['snumber_to_update'];
    $Fname = $_POST["update_fname"];
    $Lname = $_POST["update_lname"];
    $Class = $_POST["update_class"];
    $Password = $_POST["update_pwd"]; // !! IMPORTANT: Hash passwords in production!

    if (empty($snumberToUpdate) || empty($Fname) || empty($Lname) || empty($Class) || empty($Password)) {
        $message = "<p class='error-message'>All fields are required for update.</p>";
    } else {
        $stmt = $conn->prepare("UPDATE students SET fname = ?, lname = ?, class = ?, password = ? WHERE snumber = ?");
        if ($stmt) {
            $stmt->bind_param("sssss", $Fname, $Lname, $Class, $Password, $snumberToUpdate);
            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    $message = "<p class='success-message'>Student with S.N. " . htmlspecialchars($snumberToUpdate) . " updated successfully!</p>";
                } else {
                    $message = "<p class='info-message'>No changes made or student with S.N. " . htmlspecialchars($snumberToUpdate) . " not found.</p>";
                }
            } else {
                $message = "<p class='error-message'>Error updating student: " . $stmt->error . "</p>";
            }
            $stmt->close();
        } else {
            $message = "<p class='error-message'>Error preparing update statement: " . $conn->error . "</p>";
        }
    }
}

// --- DOWNLOAD CSV OPERATION ---
if (isset($_POST['download_csv'])) {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=students_data.csv');
    $output = fopen('php://output', 'w');

    // Output CSV header row - PASSWORD IS EXCLUDED HERE
    fputcsv($output, array('First Name', 'Last Name', 'Student Number', 'Class'));

    // Select all data, EXCLUDING PASSWORD
    $sql_download = "SELECT fname, lname, snumber, class FROM students ORDER BY lname, fname";
    $result_download = $conn->query($sql_download);

    if ($result_download && $result_download->num_rows > 0) {
        while ($row = $result_download->fetch_assoc()) {
            fputcsv($output, $row);
        }
        $result_download->free();
    }
    fclose($output);
    exit(); // Terminate script after file download
}


// --- ALWAYS FETCH ALL STUDENTS FOR DISPLAY (EXCLUDING PASSWORD) ---
// This ensures the "View All" section always has current data.
$students = []; // Array to hold student data for display
// Select all data, EXCLUDING PASSWORD
$sql_all = "SELECT fname, lname, snumber, class FROM students ORDER BY lname, fname";
$result_all = $conn->query($sql_all);

if ($result_all && $result_all->num_rows > 0) {
    while ($row = $result_all->fetch_assoc()) {
        $students[] = $row;
    }
    $result_all->free(); // Free result set
}

// Close the database connection (important to do after all database operations)
$conn->close();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Management (CRUD)</title>
    <link rel="stylesheet" href="home.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;0,700;0,800;0,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.6.0/css/fontawesome.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">

    <style>
        /* General Body and Container Styles */
        body {
            font-family: 'Poppins', sans-serif;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: #f0f2f5;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .main-content {
            flex-grow: 1; /* Allows main content to take available space */
            width: 100%;
            max-width: 1000px;
            margin: 30px auto;
            padding: 20px;
            background-color: indigo;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.8);
            margin-top: 5em;
        }
        h1{ text-align: center;
            color: yellow;
            margin-bottom: 20px;
        }
         h2 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
        }

        /* --- New Styles for Button-Controlled Sections --- */
        .action-buttons {
            text-align: center;
            margin-bottom: 30px;
            padding: 15px;
            background-color: #e9ecef;
            border-radius: 8px;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
        }
        .action-buttons button {
            padding: 12px 25px;
            margin: 8px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.05em;
            transition: background-color 0.3s ease, transform 0.2s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .action-buttons button:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
        }
        .action-buttons button:active {
            transform: translateY(0);
        }

        /* Hide sections by default, JavaScript will show them */
        .crud-section {
            display: none; /* Crucial for JS to control visibility */
            background-color: #f9f9f9;
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: inset 0 1px 5px rgba(0,0,0,0.05);
        }
        /* Default visible section on page load */
        .crud-section#view-all-section {
             display: block; /* Show view all by default */
        }

        /* Form Styles within sections */
        .crud-section label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #555;
        }
        .crud-section input[type="text"],
        .crud-section input[type="password"],
        .crud-section select {
            width: calc(100% - 22px);
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1em;
            box-sizing: border-box;
        }
        .crud-section button[type="submit"] {
            background-color: #28a745; /* Green for submit/insert */
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            margin-right: 10px;
            transition: background-color 0.3s ease;
        }
        .crud-section button[type="submit"]:hover {
            background-color: #218838;
        }
        .crud-section button.delete-btn {
            background-color: #dc3545; /* Red for delete */
        }
        .crud-section button.delete-btn:hover {
            background-color: #c82333;
        }
        .crud-section button.update-btn {
            background-color: #ffc107; /* Yellow for update */
            color: #333; /* Dark text for contrast */
        }
        .crud-section button.update-btn:hover {
            background-color: #e0a800;
        }

        /* Table Styles */
        .student-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            background-color: #fff;
        }
        .student-table th, .student-table td {
            border: 1px solid #e9ecef;
            padding: 12px 15px;
            text-align: left;
        }
        .student-table th {
            background-color: #007bff;
            color: white;
            font-weight: 600;
        }
        .student-table tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        .student-table tr:hover {
            background-color: #e2f2ff;
        }

        /* Message Styles */
        .message {
            text-align: center;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 5px;
            font-weight: bold;
        }
        .success-message {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error-message {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .info-message {
            background-color: #d1ecf1;
            color: #0c5460;
            border: 1px solid #bee5eb;
        }
        /* Nav and Footer styles (from your provided code - ensure these match home.css if external) */
        nav {
           background: transparent;
    width: 100vw;
    height: 5rem;
    position: fixed;
   top: 0;
   z-index: 11;
        }
        .nav_container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .nav_container img {
            border-radius: 50%;
            height: 50px; /* Adjust height */
            width: 50px; /* Adjust width */
            margin-right: 10px;
            vertical-align: middle;
        }
        .nav_container h4 {
            display: inline-block;
            margin: 0;
            color: #333;
            font-size: 1.5em;
        }
        .nav_menu {
            list-style: none;
            display: flex;
            gap: 20px;
        }
        .nav_menu a {
            text-decoration: none;
            color: #555;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        .nav_menu a:hover {
            color: #007bff;
        }
        #open-menu-btn, #close-menu-btn {
            display: none; /* Hide on larger screens */
        }
        .footer {
            background: #333;
            color: #fff;
            padding: 40px 0;
            font-size: 0.9em;
            width: 100%;
        }
        .footer_container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .footer_1, .footer_2, .footer_3, .footer_4 {
            flex-basis: 20%;
            margin: 20px;
            min-width: 200px;
        }
        .footer_logo h4 {
            color: #007bff;
            font-size: 1.5em;
            margin-bottom: 10px;
        }
        .footer_1 p {
            line-height: 1.6;
            color: #ccc;
        }
        .footer_2 h4, .footer_3 h4, .footer_4 h4 {
            font-size: 1.2em;
            margin-bottom: 15px;
            color: #007bff;
        }
        .permalinks, .privacy, .footer_socials {
            list-style: none;
            padding: 0;
        }
        .permalinks li, .privacy li, .footer_socials li {
            margin-bottom: 8px;
        }
        .permalinks a, .privacy a, .footer_socials a {
            color: #ccc;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        .permalinks a:hover, .privacy a:hover, .footer_socials a:hover {
            color: #fff;
        }
        .footer_socials li {
            display: inline-block;
            margin-right: 15px;
        }
        .footer_copyright {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #444;
            color: #aaa;
        }
        @media (max-width: 768px) {
            .nav_menu {
                display: none; /* Hide nav menu by default on small screens */
            }
            #open-menu-btn, #close-menu-btn {
                display: block; /* Show menu toggle buttons */
                background: none;
                border: none;
                font-size: 1.5em;
                cursor: pointer;
                color: #333;
            }
            .footer_container {
                flex-direction: column;
                align-items: center;
            }
            .footer_1, .footer_2, .footer_3, .footer_4 {
                min-width: unset;
                flex-basis: 80%;
                text-align: center;
            }
        }
    </style>
</head>
<body>

    <nav>
        <div class="container nav_container">
            <a href="hometab.html">
                <img src="../media/logo.png" style="border-radius: 50%; margin-top:10px; height: 50px; width: 50px;" alt="logo image">
                <h4>Education Bridge</h4>
            </a>
            <ul class="nav_menu">
                <li><a href="../html/hometab.html">Home</a></li>
                <li><a href="../html/about.html">About</a></li>
                <li><a href="../html/contact.html">Contact</a></li>
                <li><a href="../html/subject.html">Subject</a></li>
                
            </ul>
            <button id="open-menu-btn"><i class="uil uil-list-ul"></i></button>
            <button id="close-menu-btn"><i class="uil uil-multiply"></i></button>
        </div>
    </nav>

    <div class="main-content">
        <h1>Student Database Management</h1>

        <?php echo $message; // Display messages from PHP actions ?>

        <div class="action-buttons">
            <button class="action-btn" data-target="view-all-section">View All Students</button>
            <button class="action-btn" data-target="insert-section">Add New Student</button>
            <button class="action-btn" data-target="update-section">Update Student</button>
            <button class="action-btn" data-target="delete-section">Delete Student</button>
            <form method="post" action="" style="display:inline-block; margin: 0;">
                <button type="submit" name="download_csv" style="background-color: #17a2b8;">Download list</button>
            </form>
        </div>

        <div id="view-all-section" class="crud-section">
            <h2>All Student Data</h2>
            <?php if (!empty($students)): ?>
                <table class="student-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Student Number</th>
                            <th>Class</th>
                            </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($students as $student): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($student['fname']); ?></td>
                                <td><?php echo htmlspecialchars($student['lname']); ?></td>
                                <td><?php echo htmlspecialchars($student['snumber']); ?></td>
                                <td><?php echo htmlspecialchars($student['class']); ?></td>
                                </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <p class="info-message">No student data found in the database.</p>
            <?php endif; ?>
        </div>

        <div id="insert-section" class="crud-section">
            <h2>Add New Student</h2>
            <form method="post" action="">
                <label for="fname">First Name:</label>
                <input type="text" id="fname" name="fname" required><br>

                <label for="lname">Last Name:</label>
                <input type="text" id="lname" name="lname" required><br>

                <label for="sn">Student Number:</label>
                <input type="text" id="sn" name="sn" required><br>

                <label for="class_insert">Class:</label>
                <select name="class" id="class_insert" required>
                    <option value="">-- Select Class --</option>
                    <option value="P6">P6</option>
                    <option value="S3">S3</option>
                    <option value="S6">S6</option>
                </select><br>

<label for="role_input">Role</label><br></td> <td>
                            <select name="role" id="role_input" required>
                                <option value="">-- Select Role --</option>
                                <option value="Student">Student</option>
                                </select>

                <label for="pwd">Password:</label>
                <input type="password" id="pwd" name="pwd" required><br>

                <button type="submit" name="insert_student">Insert Student</button>
            </form>
        </div>

        <div id="update-section" class="crud-section">
            <h2>Update Student</h2>
            <form method="post" action="">
                <label for="snumber_to_update">Student Number to Update:</label>
                <input type="text" id="snumber_to_update" name="snumber_to_update" required><br>

                <label for="update_fname">New First Name:</label>
                <input type="text" id="update_fname" name="update_fname" required><br>

                <label for="update_lname">New Last Name:</label>
                <input type="text" id="update_lname" name="update_lname" required><br>

                <label for="update_class">New Class:</label>
                <select name="update_class" id="update_class" required>
                    <option value="">-- Select New Class --</option>
                    <option value="P6">P6</option>
                    <option value="S3">S3</option>
                    <option value="S6">S6</option>
                </select><br>

                <label for="update_pwd">New Password:</label>
                <input type="password" id="update_pwd" name="update_pwd" required><br>

                <button type="submit" name="update_student" class="update-btn">Update Student</button>
            </form>
        </div>

        <div id="delete-section" class="crud-section">
            <h2>Delete Student</h2>
            <form method="post" action="">
                <label for="snumber_to_delete_form">Student Number to Delete:</label>
                <input type="text" id="snumber_to_delete_form" name="snumber_to_delete" required><br>
                <button type="submit" name="delete_student" class="delete-btn">Delete Student</button>
            </form>
        </div>

    </div> <footer class="footer">
        <div class="container footer_container">
            <div class="footer_1">
                <a href="hometab.html" class="footer_logo"><h4>ASSESSMENT</h4></a>
                <p>This site contains assessments for P6, Senior 3, and Senior 6 students.</p>
            </div>
            <div class="footer_2">
                <h4>Permalinks</h4>
                <ul class="permalinks">
                    <li><a href="../html/hometab.html">Home</a></li>
                    <li><a href="../html/about.html">About</a></li>
                    <li><a href="../html/contact.html">Contact</a></li>
                    <li><a href="../html/subject.html">Subject</a></li>
                    
                </ul>
            </div>
            <div class="footer_3">
                <h4>Privacy</h4>
                <ul class="privacy">
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms and Condition</a></li>
                    <li><a href="#">Refund Policy</a></li>
                </ul>
            </div>
            <div class="footer_4">
                <h4>Contact us</h4>
                <p>+250787065284</p>
                <p>niyogisubizojeremie73@gmail.com</p>
                <ul class="footer_socials">
                    <li><a href="#">LinkedIn</a></li>
                </ul>
            </div>
        </div>
        <div class="footer_copyright">
            <small>Copyright &copy; NIJE ASSESSMENT</small>
        </div>
    </footer>

    <script src="./main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        // Your existing Swiper JS code
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 50,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints:{
                600: {
                    slidesPerView: 2
                }
            }
        });
    </script>
    <script>
        const openMenuBtn = document.getElementById('open-menu-btn');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const navMenu = document.querySelector('.nav_menu');

        if (openMenuBtn && closeMenuBtn && navMenu) {
            openMenuBtn.addEventListener('click', () => {
                navMenu.style.display = 'flex';
                openMenuBtn.style.display = 'none';
                closeMenuBtn.style.display = 'block';
            });

            closeMenuBtn.addEventListener('click', () => {
                navMenu.style.display = 'none';
                openMenuBtn.style.display = 'block';
                closeMenuBtn.style.display = 'none';
            });
        }

        // --- New JavaScript for showing/hiding CRUD sections ---
        document.addEventListener('DOMContentLoaded', () => {
            const actionButtons = document.querySelectorAll('.action-btn');
            const crudSections = document.querySelectorAll('.crud-section');

            // Function to hide all sections
            function hideAllSections() {
                crudSections.forEach(section => {
                    section.style.display = 'none';
                });
            }

            // Function to show a specific section
            function showSection(targetId) {
                hideAllSections();
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = 'block';
                }
            }

            // Event listeners for action buttons
            actionButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetId = button.dataset.target; // Get the target section ID from data-target attribute
                    showSection(targetId);
                });
            });

            // Determine which section to show on initial page load or after a form submission
            let activeSectionId = 'view-all-section'; // Default to view all

            <?php
            // PHP logic to determine which section was active
            // This is crucial for maintaining the active tab after a form submission
            if (isset($_POST['insert_student'])) {
                echo "activeSectionId = 'insert-section';";
            } elseif (isset($_POST['update_student'])) {
                echo "activeSectionId = 'update-section';";
            } elseif (isset($_POST['delete_student'])) {
                echo "activeSectionId = 'delete-section';";
            }
            // If none of the above, it defaults to 'view-all-section' from the JS variable initialization
            ?>

            // Show the appropriate section based on PHP determined activeSectionId
            showSection(activeSectionId);
        });
    </script>
     <script src="../js/main.js">
        
          </script>
</body>
</html>