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
