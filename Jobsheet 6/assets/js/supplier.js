const keysSupplier = ["kode_supplier", "nama", "alamat", "no_hp", "tanggal_kerjasama", "email"];

function muatDaftarSupplier() {
    muatDataGenerik("../data/supplier.json", keysSupplier);
}

document.addEventListener("DOMContentLoaded", () => {
    muatDaftarSupplier();

    const btnMuatUlang = document.getElementById("btn-muat-ulang");
    if (btnMuatUlang) {
        btnMuatUlang.addEventListener("click", function() {
            muatDaftarSupplier();
        });
    }
});
