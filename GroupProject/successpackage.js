document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("package-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Define package messages
        const packageMessages = {
            1: "The package you choose is successfully booked! You have paid RM50 for this package.",
            2: "The package you choose is successfully booked! You have paid RM80 for this package.",
            3: "The package you choose is successfully booked! You have paid RM110 for this package."
        };

        // Clear all error messages
        document.querySelectorAll(".error-message").forEach((error) => (error.textContent = ""));

        // Validate Full Name
        const name = document.getElementById("name");
        if (name.value.trim() === "") {
            isValid = false;
            document.getElementById("name-error").textContent = "Full Name is required.";
        }

        // Validate Age
        const age = document.getElementById("age");
        if (age.value.trim() === "" || isNaN(age.value) || age.value <= 0) {
            isValid = false;
            document.getElementById("age-error").textContent = "Please enter a valid age.";
        }

        // Validate School Type
        const schoolType = document.querySelector('input[name="school-type"]:checked');
        if (!schoolType) {
            isValid = false;
            document.getElementById("schooltype-error").textContent = "Please select a school type.";
        }

        // Validate Email
        const email = document.getElementById("email");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            isValid = false;
            document.getElementById("email-error").textContent = "Please enter a valid email address.";
        }

        // Validate Phone Number
        const phone = document.getElementById("phone");
        if (phone.value.trim() === "" || phone.value.length < 10) {
            isValid = false;
            document.getElementById("phone-error").textContent = "Please enter a valid phone number.";
        }

        // Validate Package Number
        const packageField = document.getElementById("package");
        const packageNumber = parseInt(packageField.value.trim());
        if (!packageNumber || !packageMessages[packageNumber]) {
            isValid = false;
            document.getElementById("package-error").textContent = "Please enter a valid package number (1, 2, or 3).";
        }

        // Validate Payment Method
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
        if (!paymentMethod) {
            isValid = false;
            document.getElementById("payment-error").textContent = "Please select a payment method.";
        }

        // Redirect to successpackage.html with package details if valid
        if (isValid) {
            const packageDetails = packageMessages[packageNumber];
            window.location.href = `successpackage.html?package=${encodeURIComponent(packageDetails)}`;
        }
    });
});

