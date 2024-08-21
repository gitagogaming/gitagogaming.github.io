<!DOCTYPE html>
<html>
<head>
    <title>Logo Slider</title>
    <!-- Add the necessary CSS styles here -->
    <style>
        body {
            margin: 0;
            padding: 0;
        }

        .logo-container {
            display: flex;
            width: 100%;
            overflow: hidden;
        }

        .logo-slides {
            display: flex;
            animation: slideAnimation 10s linear infinite;
        }

        .logo-slide {
            flex: 0 0 25%;
            transition: transform 0.5s; /* Add a smooth transition on transform property */
        }

        .logo-slide img {
            max-width: 100%;
            height: auto;
        }

        @keyframes slideAnimation {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-25%);
            }
        }
    </style>
</head>
<body>
    <div class="logo-container">
        <div class="logo-slides">
            <?php
            // Define the path to the images folder
            $imagesFolder = 'gallery/organizers';

            // Function to check if the file is an image (you can add more image extensions if needed)
            function isImageFile($file) {
                $allowedExtensions = array('jpg', 'jpeg', 'png', 'gif');
                $fileExtension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                return in_array($fileExtension, $allowedExtensions);
            }

            // RecursiveDirectoryIterator to traverse through subdirectories and files
            $album_dir = new RecursiveDirectoryIterator($imagesFolder);
            foreach (new RecursiveIteratorIterator($album_dir) as $filename => $file) {
                if (isImageFile($filename)) {
                    // Output the image tag with inline CSS styles
                    echo '<div class="logo-slide">';
                    echo '<img src="' . $filename . '" alt="Logo">';
                    echo '</div>';
                }
            }
            ?>
        </div>
    </div>

    <!-- Add the JavaScript code for rotating the logos -->
    <script>
        let currentIndex = 0;

        function rotateLogos() {
            const logoSlides = document.querySelectorAll('.logo-slide');
            const totalSlides = logoSlides.length;
            const slideWidth = logoSlides[0].clientWidth;

            // Move the current slide to the left to hide it
            logoSlides[currentIndex].style.transform = `translateX(-${slideWidth}px)`;

            // Update the current index to the next one
            currentIndex = (currentIndex + 1) % totalSlides;

            // Calculate the index of the next slide to show partially on the right
            const nextIndex = (currentIndex + 4) % totalSlides;

            // Reset the next slide's position to show partially on the right
            logoSlides[nextIndex].style.transform = `translateX(${slideWidth}px)`;

            // Move the next slide to the center
            logoSlides[nextIndex].style.transform = `translateX(0)`;
        }

        // Call the rotateLogos function every 2 seconds
        setInterval(rotateLogos, 2000);
    </script>
</body>
</html>
