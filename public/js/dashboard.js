function handleFormSubmit(event) {
    event.preventDefault();

    // Get the form data
    const formData = {
        title: document.getElementById("postTitle").value,
        content: document.getElementById("postContent").value
    };

    // Send a POST request to the backend endpoint to save the data
    fetch("/api/posts/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Post saved successfully:", data);
            // You can perform additional actions here after the post is saved
            document.location.replace("/dashboard");
        })
        .catch(error => {
            console.error("Error saving the post:", error);
        });
}

// Attach the form submission handler to the form
document.getElementById("postForm").addEventListener("submit", handleFormSubmit);