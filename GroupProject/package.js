document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("package-form");

    const packageMessages = {
        1: "The package you choose is successfully booked! You have paid RM50 for this package",
        2: "The package you choose is successfully booked! You have paid RM80 for this package",
        3: "The package you choose is successfully booked! You have paid RM110 for this package",
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll(".error-message").forEach((error) => (error.textContent = ""));

        // Full Name validation
        const name = document.getElementById("name");
        if (name.value.trim() === "") {
            isValid = false;
            document.getElementById("name-error").textContent = "Full Name is required.";
        }

        // Age validation
        const age = document.getElementById("age");
        if (age.value.trim() === "" || isNaN(age.value) || age.value <= 0) {
            isValid = false;
            document.getElementById("age-error").textContent = "Please enter a valid age.";
        }

        // Type of School validation
        const schoolType = document.querySelector('input[name="school-type"]:checked');
        if (!schoolType) {
            isValid = false;
            document.getElementById("schooltype-error").textContent = "Please select a school type.";
        }

        // Email validation
        const email = document.getElementById("email");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            isValid = false;
            document.getElementById("email-error").textContent = "Please enter a valid email address.";
        }

        // Phone Number validation
        const phone = document.getElementById("phone");
        if (phone.value.trim() === "" || phone.value.length < 10) {
            isValid = false;
            document.getElementById("phone-error").textContent = "Please enter a valid phone number.";
        }

        // Package validation
        const packageField = document.getElementById("package");
        if (packageField.value.trim() === "") {
            isValid = false;
            document.getElementById("package-error").textContent = "Package number is required.";
        }

        // Payment Method validation
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
        if (!paymentMethod) {
            isValid = false;
            document.getElementById("payment-error").textContent = "Please select a payment method.";
        }

        // If all validations pass, save data to local storage
        if (isValid) {
            // Collect form data
            const formData = {
                name: name.value.trim(),
                age: age.value.trim(),
                schoolType: schoolType.value,
                email: email.value.trim(),
                phone: phone.value.trim(),
                package: packageField.value.trim(),
                paymentMethod: paymentMethod.value,
            };

            // Save data in local storage but it didnt detect my data. if i put ajax code, it turn out error for some reason.
            localStorage.setItem("formData", JSON.stringify(formData));

            //even the pop up doesnt comes out. but if the user insert other than the package number, it will not let you to go next part.
            const packageDetails = packageMessages[formData.package] || "Package details unavailable.";
            alert(packageDetails);
            window.location.href = `successpackage.html?message=${encodeURIComponent(packageDetails)}`;
        }
    });
});
