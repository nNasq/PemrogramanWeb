# Wireframe & User Flow — SIMPUS-Mini

**Nama:** Hafizh Arrasyiid Syahbana  
**NIM:** 254107060026  
**Kelas:** SIB 1A  
**Mata Kuliah:** Pemrograman Web  
**Sub-CPMK:** Merancang UI/UX aplikasi (proyek)  

Halaman yang sudah ada (Beranda, Daftar/Tambah Buku, Daftar/Tambah Anggota — Jobsheet 1-3) belum mencakup fitur Login, Dashboard Petugas, dan Peminjaman/Pengembalian. Dokumen ini merancang wireframe untuk halaman-halaman tersebut sebelum diimplementasikan mulai Jobsheet 5 dan seterusnya.

## 1. Aktor & Otorisasi

*   **Tamu:** hanya bisa melihat katalog buku (Beranda, Daftar Buku) tanpa login.
*   **Petugas:** login untuk mengakses seluruh fitur CRUD dan transaksi peminjaman/pengembalian buku.

---

## 2. User Flow

### 2.1 User Flow — Peminjaman Buku

```text
[Petugas Login] -> [Dashboard] -> [Pilih menu "Peminjaman Baru"]
        -> [Pilih Anggota] -> [Pilih Buku (stok > 0)]
        -> [Simpan] -> [Stok buku berkurang 1] -> [Kembali ke Dashboard]
```

### 2.2 User Flow — Pengembalian Buku

```text
[Dashboard] -> [Menu "Pengembalian"] -> [Cari transaksi aktif (anggota/buku)]
        -> [Tandai "Dikembalikan"] -> [Stok buku bertambah 1]
        -> [Kembali ke Dashboard]
```

---

## 3. Wireframe Antarmuka (ASCII Design)

### 3.1 Halaman Login

```text
+--------------------------------------+
|              SIMPUS-Mini             |
|--------------------------------------|
|                                      |
|          [ Login Petugas ]           |
|                                      |
|   Username : [______________]        |
|   Password : [______________]        |
|                                      |
|          [   Masuk   ]               |
|                                      |
|   Belum punya akun? Daftar di sini   |
+--------------------------------------+
```

### 3.2 Dashboard Petugas

```text
+-------------------------------------------------------------------+
| SIMPUS-Mini      Beranda | Buku | Anggota | Peminjaman | (Nama Petugas) Logout |
|-------------------------------------------------------------------|
|  [Total Buku]         [Total Anggota]        [Sedang Dipinjam]    |
|                                                                   |
|  Aksi Cepat:                                                      |
|  [ + Peminjaman Baru ]   [ + Pengembalian ]                       |
|                                                                   |
|  Transaksi Terbaru                                                |
|  --------------------------------------------------------------   |
|  Anggota        | Buku              | Tgl Pinjam | Status         |
|  Siti Aminah    | Laskar Pelangi    | 2026-09-01 | Dipinjam       |
|  Budi Santoso   | Bumi Manusia      | 2026-09-02 | Dipinjam       |
+-------------------------------------------------------------------+
```

### 3.3 Form Peminjaman

```text
+--------------------------------------+
|  Form Peminjaman Buku                |
|--------------------------------------|
|  Anggota : [ dropdown pilih anggota ]|
|  Buku    : [ dropdown, hanya stok>0 ]|
|  Tanggal Pinjam : [ auto: hari ini ] |
|                                      |
|          [  Simpan Peminjaman  ]     |
+--------------------------------------+
```

### 3.4 Form Pengembalian

```text
+--------------------------------------+
|  Pengembalian Buku                   |
|--------------------------------------|
|  Cari transaksi aktif:               |
|  [ nama anggota / judul buku ______ ]|
|                                      |
|  Anggota | Buku | Tgl Pinjam | Aksi  |
|  Siti A. | Laskar... | 01/09 | [Kembalikan] |
+--------------------------------------+
```

### 3.5 Riwayat Peminjaman per Anggota

```text
+------------------------------------------------------------+
|  Riwayat Peminjaman — Siti Aminah                          |
|------------------------------------------------------------|
|  Buku                 | Pinjam     | Kembali    | Status   |
|  Laskar Pelangi       | 2026-08-01 | 2026-08-08 | Selesai  |
|  Bumi Manusia         | 2026-09-01 | -          | Dipinjam |
+------------------------------------------------------------+
```

---

## 4. Konsistensi dengan Desain yang Sudah Berjalan

*   Warna aksen, tipografi navbar, dan gaya tabel/kartu mengikuti `assets/css/style.css` yang sudah dibangun sejak Jobsheet 2-3.
*   Navbar akan ditambah menu **Peminjaman** dan indikator status login (nama petugas / tombol Logout) mulai implementasi di Jobsheet 10.
*   **Edge case** yang perlu ditangani saat implementasi: buku stok habis tidak boleh dipilih di form peminjaman; anggota dengan tunggakan terlambat divalidasi di Jobsheet 12 (tugas mandiri).