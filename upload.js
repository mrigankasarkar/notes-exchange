const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const title = document.getElementById("noteTitle").value.trim();
    const subject = document.getElementById("subject").value;
    const className = document.getElementById("className").value;
    const chapter = document.getElementById("chapter").value.trim();
    const file = document.getElementById("file").files[0];


    if (!file) {
        alert("Please select a PDF.");
        return;
    }


    if (file.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
    }

    const maxFileSize = 10 * 1024 * 1024; // 10 MB

if (file.size > maxFileSize) {
    alert("PDF must be smaller than 10 MB.");
    return;
}


    try {

        const fileName =
            Date.now() + "-" + file.name;


        // Upload PDF to Supabase Storage

        const { error: storageError } =
            await supabaseClient
                .storage
                .from("notes")
                .upload(fileName, file);


        if (storageError) {
            throw storageError;
        }


        // Get public URL

        const { data } =
            supabaseClient
                .storage
                .from("notes")
                .getPublicUrl(fileName);


        const fileUrl = data.publicUrl;


        // Save note information in database

        const { error: databaseError } =
            await supabaseClient
                .from("notes")
                .insert([
                    {
                        title: title,
                        subject: subject,
                        class_name: className,
                        chapter: chapter,
                        file_name: file.name,
                        file_url: fileUrl
                    }
                ]);


        if (databaseError) {
            throw databaseError;
        }


        alert("Note uploaded successfully! 🎉");

        uploadForm.reset();

    }

    catch (error) {

        console.error(error);

        alert(
            "Upload failed.\n\n" +
            error.message
        );

    }

});