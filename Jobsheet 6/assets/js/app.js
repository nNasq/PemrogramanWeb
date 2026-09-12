document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});

async function muatDataGenerik(urlJson, daftarKunci) {
    const tbody = document.querySelector(".table-responsive table tbody");
    
    const loadingRow = document.getElementById("loading-row"); 
    
    if (!tbody) return;

    if (loadingRow) {
        loadingRow.style.display = "table-row"; 
        
        const spinner = document.getElementById("loading-indicator");
        if (spinner) spinner.style.display = "inline-block";
    }

    const rows = tbody.querySelectorAll("tr:not(#loading-row)");
    rows.forEach(row => row.remove());

    try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const res = await fetch(urlJson);
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const data = await res.json();

        data.forEach(function (item) {
            const tr = document.createElement("tr");
            let barisHTML = "";
            
            daftarKunci.forEach(function(kunci) {
                const styleCSS = (kunci === "judul" || kunci === "nama") 
                    ? ' class="text-start fw-medium text-dark"' 
                    : '';

                let isiKolom = item[kunci];
                if (kunci === "stok") {
                    if (isiKolom > 0) {
                        isiKolom = `${isiKolom} <span class="badge bg-success rounded-pill ms-1">Tersedia</span>`;
                    } else {
                        isiKolom = `${isiKolom} <span class="badge bg-danger rounded-pill ms-1">Kosong</span>`;
                    }
                }
                
                barisHTML += `<td${styleCSS}>${isiKolom}</td>`;
            });
            
            barisHTML += `
                <td>
                    <button type="button" class="btn btn-warning btn-sm text-white" title="Edit"><i class="bi bi-pencil-square"></i></button>
                    <button type="button" class="btn btn-info btn-sm text-white" title="Detail"><i class="bi bi-eye"></i></button>
                    <button type="button" class="btn btn-danger btn-sm btn-hapus" title="Hapus"><i class="bi bi-trash"></i></button>
                </td>
            `;
            
            tr.innerHTML = barisHTML;
            tbody.appendChild(tr);
        });

        const searchInput = document.getElementById("search-input");
        if(searchInput) searchInput.dispatchEvent(new Event('keyup'));

    } catch (err) {
        const errorTr = document.createElement("tr");
        errorTr.innerHTML = `<td colspan="${daftarKunci.length + 1}" class="text-danger py-3">Gagal memuat data: ${err.message}</td>`;
        tbody.appendChild(errorTr);
    } finally {
        if (loadingRow) {
            loadingRow.style.display = "none";
        }
    }
}

function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        console.log("Elemen yang diklik:", e.target); 

        const btn = e.target.closest(".btn-hapus");
        if (!btn) return;

        const row = btn.closest("tr");
        const nama = row ? row.querySelector("td")?.textContent : "data ini";
        const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
        if (yakin && row) {
            row.remove();
            
            const searchInput = document.getElementById("search-input");
            if(searchInput) searchInput.dispatchEvent(new Event('keyup'));
        }
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

    const countRows = () => table.querySelectorAll("tbody tr:not(#loading-row)").length;
    updateCounter(countRows(), countRows());

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        let visibleCount = 0;
        const currentRows = table.querySelectorAll("tbody tr:not(#loading-row)");
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