
const moodData = {
    senang: {
        emoji: "😄",
        title: "Kamu Sedang Senang!",
        description: "Senang sekali mendengar kamu sedang merasa bahagia hari ini!",
        quote: "Let your happiness shine. You deserve every little joy.",
        activities: [
            ["🎨", "Lakukan Hobimu", "Gunakan waktu untuk melakukan hal yang paling kamu sukai."],
            ["📸", "Abadikan Momen", "Simpan kenangan indah hari ini melalui foto."],
            ["💌", "Sebarkan Kebahagiaan", "Bagikan energi positif kepada orang-orang di sekitarmu."]
        ]
    },

    sedih: {
        emoji: "😢",
        title: "Tidak Apa-Apa untuk Sedih",
        description: "Kamu tidak harus selalu terlihat kuat. Berikan dirimu waktu.",
        quote: "It's okay to have a bad day. Better days are coming.",
        activities: [
            ["🎧", "Dengarkan Musik", "Putar musik lembut yang membuatmu merasa nyaman."],
            ["📖", "Tulis Perasaanmu", "Tuangkan pikiran dan perasaanmu ke dalam jurnal."],
            ["🤗", "Hubungi Orang Terdekat", "Berbicaralah dengan seseorang yang kamu percaya."]
        ]
    },

    marah: {
        emoji: "😡",
        title: "Tarik Napas, Kamu Bisa!",
        description: "Tidak apa-apa merasa marah. Berikan dirimu waktu untuk menenangkan diri.",
        quote: "You are allowed to pause before you react.",
        activities: [
            ["🌿", "Latihan Pernapasan", "Tarik napas perlahan dan hembuskan secara teratur."],
            ["🚶", "Jalan Santai", "Cobalah berjalan sebentar di tempat yang nyaman."],
            ["📝", "Tuangkan Emosi", "Tuliskan hal yang membuatmu kesal."]
        ]
    },

    lelah: {
        emoji: "😴",
        title: "Saatnya Beristirahat",
        description: "Kamu sudah berusaha sejauh ini. Jangan lupa memberikan waktu untuk dirimu.",
        quote: "Rest is productive too. You deserve a break.",
        activities: [
            ["🛌", "Istirahat Sejenak", "Berikan tubuh waktu untuk beristirahat."],
            ["🍵", "Minuman Hangat", "Buat minuman favorit dan nikmati dengan santai."],
            ["🧘", "Relaksasi", "Lakukan peregangan ringan."]
        ]
    },

    cemas: {
        emoji: "😰",
        title: "Pelan-Pelan, Ya!",
        description: "Kamu tidak harus menyelesaikan semuanya sekaligus.",
        quote: "One step at a time. You are stronger than you think.",
        activities: [
            ["🌸", "Latihan Pernapasan", "Tarik napas perlahan dan fokus pada keadaan saat ini."],
            ["📋", "Buat Daftar Prioritas", "Tuliskan hal yang perlu dilakukan satu per satu."],
            ["☀️", "Cari Udara Segar", "Luangkan waktu sejenak di luar ruangan."]
        ]
    },

    biasa: {
        emoji: "😐",
        title: "Hari yang Biasa Juga Berarti",
        description: "Tidak setiap hari harus luar biasa. Nikmati hari ini apa adanya.",
        quote: "Small moments can make beautiful memories.",
        activities: [
            ["📚", "Baca Buku", "Temukan hal baru melalui buku favorit."],
            ["🎵", "Temukan Musik Baru", "Coba dengarkan lagu dengan suasana berbeda."],
            ["🌻", "Coba Hal Baru", "Lakukan aktivitas kecil yang belum pernah dicoba."]
        ]
    }
};

// HALAMAN PILIH MOOD

const moodOptions = document.querySelectorAll(".mood-option");
const submitButton = document.getElementById("submit-mood");
const selectionInfo = document.getElementById("selection-info");

let selectedMood = null;

moodOptions.forEach(option => {
    option.addEventListener("click", () => {

        moodOptions.forEach(item => {
            item.classList.remove("selected");
        });

        option.classList.add("selected");

        selectedMood = option.dataset.mood;
        submitButton.disabled = false;

        selectionInfo.textContent =
            "Mood dipilih: " +
            option.querySelector("strong").textContent + " ♡";
    });
});

if (submitButton) {
    submitButton.addEventListener("click", () => {

        if (!selectedMood) return;

        const note = document.getElementById("mood-note").value;

        sessionStorage.setItem("selectedMood", selectedMood);
        sessionStorage.setItem("moodNote", note);

        window.location.href = "result.html";
    });
}


// HALAMAN HASIL REKOMENDASI

const resultEmoji = document.getElementById("result-emoji");

if (resultEmoji) {

    const savedMood = sessionStorage.getItem("selectedMood");

    if (!savedMood || !moodData[savedMood]) {

        window.location.replace("mood.html");

    } else {

        const data = moodData[savedMood];

        document.getElementById("result-emoji").textContent = data.emoji;
        document.getElementById("result-title").textContent = data.title;
        document.getElementById("result-description").textContent = data.description;
        document.getElementById("result-quote").textContent = data.quote;

        const recommendationList =
            document.getElementById("recommendation-list");

        data.activities.forEach(activity => {

            const card = document.createElement("div");
            card.className = "recommendation-item";

            const icon = document.createElement("div");
            icon.className = "activity-icon";
            icon.textContent = activity[0];

            const title = document.createElement("h3");
            title.textContent = activity[1];

            const description = document.createElement("p");
            description.textContent = activity[2];

            card.append(icon, title, description);
            recommendationList.appendChild(card);
        });
    }
}
