document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});

function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

function initHapusConfirm() {
    document.querySelectorAll(".btn-hapus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const row = btn.closest("tr");
            const nama = row ? row.querySelector("td")?.textContent.trim() : "data ini";
            const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
            
            if (yakin && row) {
                row.remove();
                
                const searchInput = document.getElementById("search-input");
                if (searchInput) {
                    searchInput.dispatchEvent(new Event("keyup"));
                }
            }
        });
    });
}

function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    
    if (!input || !table) return;

    const counterInfo = document.createElement("p");
    counterInfo.className = "text-muted fw-semibold mb-3 small";
    table.parentElement.insertAdjacentElement("beforebegin", counterInfo);

    function updateCounter(visible, total) {
        counterInfo.textContent = `Menampilkan ${visible} dari ${total} baris`;
    }

    const initialRows = table.querySelectorAll("tbody tr");
    updateCounter(initialRows.length, initialRows.length);

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        let visibleCount = 0;
        const currentRows = table.querySelectorAll("tbody tr");
        const totalCount = currentRows.length;

        currentRows.forEach(function (row) {
            const firstCell = row.querySelector("td");
            
            if (firstCell) {
                const teks = firstCell.textContent.toLowerCase();
                if (teks.includes(keyword)) {
                    row.style.display = "";
                    visibleCount++;
                } else {
                    row.style.display = "none";
                }
            }
        });
        
        updateCounter(visibleCount, totalCount);
    });
}

function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error text-danger small d-block mt-1";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valid = true;

        const fieldWajib = ["judul", "pengarang", "tahun", "stok", "isbn", "nama", "no_anggota"];
        
        fieldWajib.forEach(function (name) {
            const input = form.querySelector(`[name='${name}']`);
            
            if (input) {
                if (input.value.trim() === "") {
                    tampilkanError(input, "Field ini wajib diisi.");
                    valid = false;
                } else {
                    hapusError(input);
                }
            }
        });

        const inputIsbn = form.querySelector("[name='isbn']");
        if (inputIsbn && inputIsbn.value.trim() !== "") {
            const regexIsbn = /^[0-9\-]+$/;
            if (!regexIsbn.test(inputIsbn.value.trim())) {
                tampilkanError(inputIsbn, "Format tidak valid. ISBN hanya boleh berisi angka dan tanda hubung (-).");
                valid = false;
            }
        }

        if (!valid) {
            e.preventDefault();
        }
    });
}