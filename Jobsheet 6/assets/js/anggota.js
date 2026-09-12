const keysAnggota = ["no_anggota", "nama", "alamat", "no_hp", "tanggal_bergabung", "email"];

function muatDaftarAnggota() {
    muatDataGenerik("../data/anggota.json", keysAnggota);
}

document.addEventListener("DOMContentLoaded", () => {
    muatDaftarAnggota();

    const btnMuatUlang = document.getElementById("btn-muat-ulang");
    if (btnMuatUlang) {
        btnMuatUlang.addEventListener("click", function() {
            muatDaftarAnggota(); 
        });
    }
});