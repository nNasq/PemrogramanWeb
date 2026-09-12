const keysBuku = ["judul", "kategori", "pengarang", "tahun", "stok"];

function muatDaftarBuku() {
    muatDataGenerik("../data/buku.json", keysBuku);
}

document.addEventListener("DOMContentLoaded", () => {
    muatDaftarBuku();

    const btnMuatUlang = document.getElementById("btn-muat-ulang");
    if (btnMuatUlang) {
        btnMuatUlang.addEventListener("click", function() {
            muatDaftarBuku(); 
        });
    }
});