<?php
// Start a session (optional for registration, but good practice if you want to redirect after success)
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

// --- Initialize variables for messages ---
$registration_message = "";

// --- Process Form Submission ---
// Check if the form was submitted via the 'submit_registration' button
if (isset($_POST['submit_registration'])) {
    // Get form data and sanitize it
    $fname = htmlspecialchars($_POST['fname']);
    $lname = htmlspecialchars($_POST['lname']);
    $student_number = htmlspecialchars($_POST['sn']);
    $class = htmlspecialchars($_POST['class']);
    $password = $_POST['pwd']; // Get the plain text password
    $role = htmlspecialchars($_POST['role']);

    // --- IMPORTANT: Hash the password before storing it ---
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // --- Check if student number already exists ---
    $check_stmt = $conn->prepare("SELECT Snumber FROM students WHERE Snumber = ?");
    $check_stmt->bind_param("s", $student_number);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();

    if ($check_result->num_rows > 0) {
        $registration_message = "<p style='color:red;'>Student number already exists. Please use a different one or log in.</p>";
    } else {
        // --- Prepare SQL statement for inserting data ---
        // Use prepared statements to prevent SQL Injection
        $stmt = $conn->prepare("INSERT INTO students (fname, lname, Snumber, class, password, role) VALUES (?, ?, ?, ?, ?, ?)");

        if ($stmt === false) {
            $registration_message = "<p style='color:red;'>Error preparing statement: " . htmlspecialchars($conn->error) . "</p>";
        } else {
            // Bind parameters: 'ssssss' means six string parameters
            $stmt->bind_param("ssssss", $fname, $lname, $student_number, $class, $hashed_password, $role);

            // Execute the statement
            if ($stmt->execute()) {
                $registration_message = "<p style='color:green;'>Registration successful! You can now log in.</p>";
                // Optional: Redirect to login page after successful registration
                // header("Location: login.php");
                // exit();
            } else {
                $registration_message = "<p style='color:red;'>Error registering user: " . htmlspecialchars($stmt->error) . "</p>";
            }

            // Close the statement
            $stmt->close();
        }
    }
    $check_stmt->close();
}

// Close the database connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ASSESSMENT - Register New User</title>
    <link rel="stylesheet" href="home.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.6.0/css/fontawesome.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <link rel="stylesheet" href="../css/login.css"> </head>
<body>

    <form action="registration.php" method="post"> <section class="container login"> <div class="lpg">
                <h1>Register New User</h1>
                <?php echo $registration_message; // Display registration messages here ?>
                <table>
                    <tr>
                        <td><label for="fname">FirstName</label><br></td>
                        <td><input type="text" placeholder="Enter your FirstName" id="fname" name="fname" required><br></td>
                    </tr>
                    <tr>
                        <td><label for="lname">LastName</label><br></td>
                        <td><input type="text" id="lname" name="lname" placeholder="Enter your LastName" required><br></td>
                    </tr>
                    <tr>
                        <td><label for="sn">Student_number</label><br></td>
                        <td><input type="text" id="sn" name="sn" placeholder="Enter your Student_number" required><br></td>
                    </tr>
                    <tr>
                        <td><label for="class_select">Choose your class</label><br></td> <td>
                            <select name="class" id="class_select" required><br>
                                <option value="">-- Select Class --</option>
                                <option value="P6">P6</option>
                                <option value="S3">S3</option>
                                <option value="S6">S6</option>
                            </select><br>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="pw">Password</label><br></td>
                        <td><input type="password" name="pwd" id="pw" required placeholder="Enter your password"></td>
                    </tr>
                    <tr>
                        <td><label for="role_input">Role</label><br></td> <td>
                            <select name="role" id="role_input" required>
                                <option value="">-- Select Role --</option>
                                <option value="Student">Student</option>
                                </select><br>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="submit" value="Register" name="submit_registration" id="submit_registration_btn">
                        </td>
                    </tr>
                </table>
            </div>
        </section>
    </form>

    <footer class="footer">
        <div class="container footer_container">
            <div class="footer_1">
                <a href="hometab.html" class="footer_logo"><h4>ASSESSMENT</h4></a>
                <p>This site contains assessments for P6, Senior 3, and Senior 6.</p>
            </div>
            <div class="footer_2">
                <h4>Permalinks</h4>
                <ul class="permalinks">
                    <li><a href="hometab.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="subject.html">Subject</a></li>
                </ul>
            </div>
            <div class="footer_3">
                <h4>Privacy</h4>
                <ul class="privacy">
                    <li><a href="#">Privacy Policy</a> </li>
                    <li><a href="#">Terms and Conditions</a> </li>
                    <li><a href="#">Refund Policy</a> </li>
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