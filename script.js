async function loadNotes() {

    const { data, error } = await supabaseClient
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });


    if (error) {

        console.error(error);

        document.getElementById("notesContainer").innerHTML = `
            <p>Could not load notes.</p>
        `;

        return;
    }


    displayNotes(data);
}


function displayNotes(notesToDisplay) {

    const container = document.getElementById("notesContainer");

    container.innerHTML = "";


    if (notesToDisplay.length === 0) {

        container.innerHTML = `
            <p>No notes found.</p>
        `;

        return;
    }


    notesToDisplay.forEach(note => {

        const card = document.createElement("div");

        card.className = "note-card";

        card.innerHTML = `
    <div class="pdf-icon">📄</div>

    <h3>${note.title}</h3>

    <p class="note-info">
        📚 ${note.subject}
    </p>

    <p class="note-info">
        🎓 Class ${note.class_name}
    </p>

    <p class="note-info">
        📖 ${note.chapter}
    </p>

    <p class="file-name">
        ${note.file_name}
    </p>

    <a
        href="${note.file_url}"
        target="_blank"
        rel="noopener noreferrer"
        class="view-button"
    >
        View / Download
    </a>
`;

        container.appendChild(card);

    });
}


async function searchNotes() {

    const searchText = document
        .getElementById("searchInput")
        .value
        .trim();

    if (searchText === "") {
        loadNotes();
        return;
    }

    const { data, error } = await supabaseClient
        .from("notes")
        .select("*")
        .or(
            `title.ilike.%${searchText}%,subject.ilike.%${searchText}%,chapter.ilike.%${searchText}%,class_name.ilike.%${searchText}%`
        )
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    displayNotes(data);
}


async function selectSubject(subject) {

    const { data, error } = await supabaseClient
        .from("notes")
        .select("*")
        .eq("subject", subject);


    if (error) {

        console.error(error);

        return;
    }


    displayNotes(data);
}


loadNotes();

document
    .getElementById("searchInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchNotes();
        }

    });