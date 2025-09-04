async function downloadVideo() {
    const url = document.getElementById('videoUrl').value.trim();
    const resultDiv = document.getElementById('result');
    const loader = document.getElementById('loader');
    
    // Validasi URL
    if (!url) {
        alert('Masukkan URL video!');
        return;
    }
    
    // Reset tampilan
    resultDiv.classList.add('hidden');
    loader.classList.remove('hidden');
    
    try {
        // Gunakan API eksternal (contoh: yt1s.com)
        const response = await fetch(`https://yt1s.com/api/ajaxSearch/index?query=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data.status !== 'ok') throw new Error('Video tidak ditemukan!');
        
        // Tampilkan info video
        const videoInfo = `
            <h4>${data.title}</h4>
            <img src="${data.thumb}" alt="Thumbnail" style="max-width: 200px; border-radius: 8px;">
            <p>Durasi: ${data.t} | Ukuran: ${data.a}</p>
        `;
        document.getElementById('videoInfo').innerHTML = videoInfo;
        
        // Tampilkan link unduhan
        const downloadLinks = data.links.mp4.map(format => 
            `<a href="${format.k}" class="download-link" target="_blank">
                Unduh ${format.q} (${format.size})
            </a>`
        ).join('');
        
        document.getElementById('downloadLinks').innerHTML = downloadLinks;
        resultDiv.classList.remove('hidden');
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        loader.classList.add('hidden');
    }
}
