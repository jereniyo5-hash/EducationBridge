<?php
// Start a session to manage user login state
session_start();

// Database connection details for EasyPHP
$server = "127.0.0.1";
$user = "root";
$pw = ""; // Default for EasyPHP, if you have a password, put it here
$db = "login"; // Your database name

// --- Database Connection ---
$conn = new mysqli($server, $user, $pw, $db);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// --- Initialize variables for form submission messages ---
$login_message = "";

// --- Process Form Submission ---
// Check if the form was submitted via the 'login_submit' button
if (isset($_POST['login_submit'])) {
    // Get form data and sanitize it to prevent basic XSS (Cross-Site Scripting)
    $student_number = htmlspecialchars($_POST['snbr']);
    $role = htmlspecialchars($_POST['role']);
    $password = $_POST['pwd']; // Password is not sanitized here as it will be hashed or directly compared (but securely via prepared statements)

    // --- Prepare SQL statement for checking credentials ---
    // Select password and role from the users table where student_number and role match
    $stmt = $conn->prepare("SELECT password, role FROM students WHERE Snumber = ? AND role = ?");

    // Check if the statement was prepared successfully
    if ($stmt === false) {
        die("Prepare failed: " . htmlspecialchars($conn->error));
    }

    // Bind parameters: 'ss' means two string parameters (for student_number and role)
    $stmt->bind_param("ss", $student_number, $role);

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Check if a user was found
    if ($result->num_rows > 0) {
        $user_data = $result->fetch_assoc();
        $stored_password = $user_data['password'];
        $stored_role = $user_data['role']; // Get the role from the database

        // --- IMPORTANT: Use password_verify() for hashed passwords in a real app! ---
        // For this example, we'll do a direct comparison (INSECURE FOR REAL PASSWORDS)
        if ($password === $stored_password) { // !!! REPLACE THIS WITH password_verify() FOR HASHED PASSWORDS !!!
            $_SESSION['logged_in'] = true;
            $_SESSION['student_number'] = $student_number;
            $_SESSION['role'] = $stored_role; // Store the role in the session

            // Redirect based on the role fetched from the database
            if ($stored_role === 'admin') {
                header("Location: html/hometab.html"); // Redirect to admin's home page
                exit(); // Always exit after a header redirect
            } elseif ($stored_role === 'student') {
                header("Location: html/student.html"); // Redirect to student's dashboard
                exit(); // Always exit after a header redirect
            } else {
                // Handle unexpected role (e.g., redirect to a generic error page or show an error)
                $login_message = "<p style='color:red;'>Login successful, but an unexpected role was found. Please contact support.</p>";
            }
        } else {
            $login_message = "<p style='color:red;'>Incorrect password.</p>";
        }
    } else {
        $login_message = "<p style='color:red;'>Invalid student number or selected role.</p>";
    }

    // Close the statement
    $stmt->close();
}

// Close the database connection (important to do this after all database operations)
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ASSESSMENT FOR SECONDARY SCHOOLS and primary</title>
    <link rel="stylesheet" type="text/css" href="css/login.css">
</head>
<body>

    <form action="login.php" method="post">
        <section class="container login">
            <div class="lpg">
                <h1>LOG IN</h1>
                <?php echo $login_message; // Display login messages here ?>
                <table>
                    <tr>
                        <td>
                            <label for="snbr">Enter your student number</label><br>
                        </td>
                        <td>
                            <input type="text" placeholder="Enter your student number" id="snbr" name="snbr" required><br>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="role_select">Select Role</label><br> </td>
                        <td>
                            <select name="role" id="role_select" required><br> <option value="">-- Select Role --</option> <option value="Admin">Admin</option>
                                <option value="Student">Student</option>
                            </select><br>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="pw">Password</label><br>
                        </td>
                        <td>
                            <input type="password" name="pwd" id="pw" required placeholder="Enter your password">
                        </td>
                    </tr>
                    <tr><td>
      
                            <input type="submit" value="Login" name="login_submit" id="login_submit_btn">
                        </td>
                    </tr>
                </table>
            </div>
        </section>
    </form>

    <script src="./main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
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

</body>
</html>