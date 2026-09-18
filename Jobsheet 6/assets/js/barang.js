const keysBarang = ["nama_barang", "kategori", "merek", "tahun_masuk", "stok"];

function muatDaftarBarang() {
    muatDataGenerik("../data/barang.json", keysBarang);
}

document.addEventListener("DOMContentLoaded", () => {
    muatDaftarBarang();

    const btnMuatUlang = document.getElementById("btn-muat-ulang");
    if (btnMuatUlang) {
        btnMuatUlang.addEventListener("click", function() {
            muatDaftarBarang();
        });
    }
});
