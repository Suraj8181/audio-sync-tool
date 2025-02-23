document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show progress section
    document.getElementById('progress-section').style.display = 'block';

    // Get files and language
    const audioFile = document.getElementById('audio-file').files[0];
    const srtFile = document.getElementById('srt-file').files[0];
    const language = document.getElementById('language-select').value;

    // Create FormData
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('srt', srtFile);
    formData.append('language', language);

    // Upload files and process
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        // Show download section
        document.getElementById('download-section').style.display = 'block';
        document.getElementById('download-link').href = data.download_link;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing the files.');
    }
});


document.getElementById("process-btn").addEventListener("click", function () {
    let audioFile = document.getElementById("audio-upload").files[0];
    let srtFile = document.getElementById("srt-upload").files[0];

    if (!audioFile || !srtFile) {
        alert("Please upload both an audio file and a subtitle file.");
        return;
    }

    // Simulate progress bar
    let progressBar = document.getElementById("progress-bar");
    let progressText = document.getElementById("progress-text");
    let downloadBtn = document.getElementById("download-btn");

    document.querySelector(".progress-container").style.display = "block";
    let progress = 0;
    let interval = setInterval(() => {
        progress += 10;
        progressBar.value = progress;
        progressText.innerText = `Processing... ${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            progressText.innerText = "Processing Complete!";
            downloadBtn.style.display = "block";
            downloadBtn.href = "#"; // Replace with actual audio download link
            downloadBtn.innerText = "Download Synced Audio";
        }
    }, 500);
});
