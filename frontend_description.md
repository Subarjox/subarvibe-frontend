# SubarVibe Frontend — Deskripsi Proyek Lengkap

## 1. Gambaran Umum Proyek

**SubarVibe** adalah aplikasi web berbasis AI yang berfungsi sebagai antarmuka utama (*frontend*) untuk sistem generasi website otomatis. Pengguna memasukkan informasi bisnis mereka, dan sistem secara otomatis menghasilkan website HTML statis yang siap dipakai melalui pipeline backend yang terdiri dari LLM (Large Language Model), RAG (Retrieval-Augmented Generation), dan model generasi gambar (Flux AI).

Frontend ini **bukan** situs publik biasa — ia adalah **dashboard aplikasi berbasis SaaS** yang memungkinkan pengguna terdaftar untuk membuat, melihat, mengedit, dan mengunduh website yang dihasilkan AI.

---

## 2. Tujuan Aplikasi

| Tujuan | Deskripsi |
|---|---|
| **Abstraksi Pipeline AI** | Menyembunyikan kompleksitas backend (FastAPI + LLM + RAG) di balik antarmuka yang intuitif |
| **Manajemen Proyek** | Pengguna dapat membuat, melihat, mengedit, mengunduh, dan menghapus proyek website mereka |
| **Preview Real-time** | Hasil generasi website dapat langsung dilihat di dalam dashboard melalui iframe |
| **Editing In-line** | Pengguna dapat mengklik teks atau gambar langsung di dalam preview untuk mengeditnya |
| **Publish ke Internet** | Pengguna dapat mempublikasikan website ke Surge.sh langsung dari drawer detail proyek |

---

## 3. Tech Stack

### 3.1 Framework & Runtime
| Teknologi | Versi | Peran |
|---|---|---|
| **Next.js** | 16.1.7 | Framework utama, App Router, SSR/SSG |
| **React** | 19.2.4 | UI Library |
| **TypeScript** | 5.9.3 | Type safety di seluruh codebase |

### 3.2 Styling
| Teknologi | Versi | Peran |
|---|---|---|
| **Tailwind CSS** | 4.2.1 | Utility-first CSS framework |
| **tw-animate-css** | 1.4.0 | Animasi CSS tambahan |
| **shadcn/ui** | 4.7.0 | Komponen UI berbasis Radix UI |
| **Space Grotesk** | Google Fonts | Font utama (sans & heading) |
| **Space Mono** | Google Fonts | Font monospace (kode & label) |

### 3.3 State & Data
| Teknologi | Versi | Peran |
|---|---|---|
| **@supabase/ssr** | 0.12.0 | Autentikasi SSR-safe & database client |
| **@supabase/supabase-js** | 2.108.2 | Supabase JavaScript client |
| **@tanstack/react-table** | 8.21.3 | Tabel data yang powerful |
| **Recharts** | 3.8.0 | Visualisasi chart (Dashboard) |
| **Zod** | 4.4.3 | Schema validation |

### 3.4 UI & Interaksi
| Teknologi | Versi | Peran |
|---|---|---|
| **@dnd-kit/core** | 6.3.1 | Drag-and-drop foundation |
| **@dnd-kit/sortable** | 10.0.0 | Sortable drag-and-drop list |
| **@dnd-kit/modifiers** | 9.0.0 | Modifikasi behavior drag-and-drop |
| **@dnd-kit/utilities** | 3.2.2 | Utilitas pembantu dnd-kit |
| **@hugeicons/react** | 1.1.6 | Icon library (HugeIcons) |
| **@hugeicons/core-free-icons** | 4.1.1 | Paket ikon gratis HugeIcons |
| **sonner** | 2.0.7 | Toast notification sistem |
| **vaul** | 1.1.2 | Drawer/sheet component |
| **next-themes** | 0.4.6 | Dark mode & theme management |

### 3.5 Alat Pengembangan
| Teknologi | Versi | Peran |
|---|---|---|
| **ESLint** | 9.39.4 | Linting kode |
| **Prettier** | 3.8.1 | Code formatter |
| **prettier-plugin-tailwindcss** | 0.7.2 | Otomatis urutkan class Tailwind |

---

## 4. Arsitektur Proyek

### 4.1 Struktur Direktori

```
subarvibe-frontend/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (font, theme, toaster)
│   ├── page.tsx                # Dashboard utama (hanya untuk dev/demo)
│   ├── globals.css             # CSS global & design tokens
│   ├── data.json               # Data statis untuk dashboard dev
│   ├── login/                  # Halaman autentikasi
│   ├── project/                # Halaman daftar proyek (SSR)
│   ├── create/                 # Halaman pembuatan proyek baru (wizard carousel)
│   ├── create_v2/              # Versi alternatif halaman create
│   ├── edit/                   # Halaman editor website
│   ├── preview/                # Halaman preview website
│   └── generating/             # Halaman loading saat generasi
├── components/                 # Komponen React yang reusable
│   ├── ui/                     # Komponen shadcn/ui (primitives)
│   ├── app-sidebar.tsx         # Sidebar navigasi utama
│   ├── create-carousel.tsx     # Wizard pembuatan proyek (3 langkah)
│   ├── create-dialog.tsx       # Dialog create proyek (versi lama/legacy)
│   ├── edit-project.tsx        # Editor proyek dengan iframe dua arah + style injector
│   ├── preview-project.tsx     # Preview website dalam iframe
│   ├── project-cards.tsx       # Grid kartu semua proyek
│   ├── project-detail-drawer.tsx # Drawer detail proyek + fitur Publish ke Surge
│   ├── image-manager-modal.tsx # Modal manajemen gambar (hanya tab Upload aktif)
│   ├── login-form.tsx          # Form login & registrasi
│   ├── generating-view.tsx     # UI loading state saat generate
│   ├── template-pick-card.tsx  # Kartu pemilihan template
│   ├── model-template-card.tsx # Kartu info model AI
│   ├── nav-main.tsx            # Navigasi utama sidebar
│   ├── nav-documents.tsx       # Daftar proyek terbaru di sidebar
│   ├── nav-secondary.tsx       # [BARU] Navigasi sekunder sidebar (link generik)
│   ├── nav-user.tsx            # Info user di footer sidebar
│   ├── new-project-card.tsx    # [BARU] Kartu proyek versi UI baru (belum terhubung data)
│   ├── new-project.tsx         # [BARU] Halaman create proyek versi lama (progress + accordion)
│   ├── site-header.tsx         # Header halaman
│   ├── data-table.tsx          # Tabel data generik
│   ├── chart-area-interactive.tsx # Chart interaktif (dashboard)
│   ├── section-cards.tsx       # Kartu statistik dashboard
│   ├── delete-project-dialog.tsx # Dialog konfirmasi hapus
│   └── theme-provider.tsx      # Context provider untuk dark mode
├── lib/                        # Utilitas & helper
│   ├── api-client.ts           # HTTP client dengan JWT injection
│   ├── api.ts                  # Definisi endpoint API
│   ├── download-project.ts     # Logic download project ke ZIP
│   ├── fetch_columns.ts        # Helper fetch data Supabase (incl. public_url)
│   └── utils.ts                # Utility umum (cn, dll)
├── hooks/                      # Custom React hooks
├── public/                     # File statis publik
├── middleware.ts               # Route guard autentikasi
├── next.config.mjs             # Konfigurasi Next.js
├── tailwind.config             # Konfigurasi Tailwind CSS
└── package.json                # Dependencies & scripts
```

---

## 5. Desain Sistem (Design System)

### 5.1 Color Palette

Aplikasi menggunakan skema warna **dark mode permanen** dengan aksen warna kuning-hijau neon yang khas:

| Token CSS | Nilai | Fungsi |
|---|---|---|
| `--background` | `#0A0A0A` | Latar belakang utama (hitam pekat) |
| `--foreground` | `#F5F5F0` | Teks utama (putih krem) |
| `--card` | `#111111` | Latar belakang kartu |
| `--primary` | `#E8FF47` | Warna aksen utama (kuning-hijau neon) |
| `--primary-foreground` | `#0A0A0A` | Teks di atas primary |
| `--muted` | `#1A1A1A` | Elemen redup |
| `--muted-foreground` | `#666666` | Teks sekunder |
| `--border` | `rgba(232, 255, 71, 0.12)` | Garis tepi dengan efek neon tipis |
| `--destructive` | `#EF4444` | Warna peringatan/hapus |

### 5.2 Tipografi

| Font | Variable | Penggunaan |
|---|---|---|
| **Space Grotesk** | `--font-sans`, `--font-heading` | Body teks & heading |
| **Space Mono** | `--font-mono` | Monospace (kode, label teknis) |

### 5.3 Border Radius System

Sistem radius berbasis variabel CSS dengan skala proporsional:
- `--radius`: `10px` (base)
- `--radius-sm`: `6px`, `--radius-md`: `8px`, `--radius-lg`: `10px`
- `--radius-xl`: `14px`, `--radius-2xl`: `18px`, dst.

---

## 6. Sistem Autentikasi

### 6.1 Provider: Supabase Auth
Autentikasi dikelola sepenuhnya oleh **Supabase** menggunakan paket `@supabase/ssr` yang mendukung cookie-based session management di Next.js App Router.

### 6.2 Middleware Route Guard ([middleware.ts](./middleware.ts))

Middleware Next.js mencegat **setiap request** (kecuali aset statis) dan menerapkan logika perlindungan rute:

```
Request Masuk
    │
    ├─ Halaman Terlindungi (/preview, /project, /create, /edit)?
    │       └─ Tidak ada user? → Redirect ke /login
    │
    └─ Halaman Auth (/login, /register)?
            └─ User sudah login? → Redirect ke /project
```

**Rute Terlindungi:** `/preview`, `/project`, `/create`, `/edit`

**Rute Publik:** `/login`, `/register`

### 6.3 Login Form ([login-form.tsx](./components/login-form.tsx))

Form tunggal yang mendukung dua mode: **Login** dan **Sign Up**, dengan animasi transisi `slide-up/down` yang halus saat pergantian mode. Fitur:
- Email + Password untuk login
- Email + Username + Password + Confirm Password untuk sign up
- Validasi client-side (password match)
- Toast notification untuk feedback
- State loading saat proses autentikasi

---

## 7. Alur Pengguna (User Flow) & Halaman

### 7.1 Halaman Login (`/login`)

Entry point bagi pengguna baru. Menampilkan form login/register dengan desain minimal. Setelah berhasil, pengguna diarahkan ke `/project`.

---

### 7.2 Halaman Proyek (`/project`) — [project page](./app/project/page.tsx)

**Halaman utama dashboard** setelah login. Dirender di sisi server (Server Component) menggunakan Supabase SSR untuk mengambil semua proyek milik pengguna.

**Tampilan:**
- `ModelSectionCard`: Menampilkan informasi model AI yang digunakan
- `ProjectCards`: Grid kartu proyek dengan layout `1 → 2 → 3 kolom` (responsive)
- Kartu pertama selalu berupa **tombol "Add New Project"**
- Setiap kartu proyek menampilkan:
  - **Thumbnail** website (screenshot diambil oleh Playwright di backend)
  - **Status badge**: `QUEUED` | `GENERATING` | `READY` | `FAILED`
  - **Nama bisnis** dan deskripsi singkat
  - **Tanggal pembuatan**
  - **Dropdown menu**: Open, Download, Edit, Delete

---

### 7.3 Halaman Buat Proyek (`/create`) — [create page](./app/create/page.tsx)

Menampilkan **wizard 3 langkah** (carousel) melalui komponen `CreateCarousel`:

#### Langkah 1 — Isi Informasi Bisnis
Form input dengan field:
- Business Name *(wajib)*
- Business Address
- Business Email
- Business Phone
- Business Description *(wajib)*
- Image Generation Method *(wajib)*:
  - **Placeholder Images** → ~1 menit, gambar generik
  - **Stock Image** → gambar dari library online
  - **AI Generated Image** → gambar unik dari Flux AI

Setelah klik "Next", frontend memanggil `POST /api/templates/recommend` ke backend dengan deskripsi bisnis. Backend RAG akan menemukan 3 template yang paling relevan.

#### Langkah 2 — Pilih Template
Menampilkan 3 kartu template yang direkomendasikan oleh RAG, masing-masing dengan preview image, nama, dan deskripsi. Pengguna memilih satu.

#### Langkah 3 — Konfirmasi
Ringkasan semua data yang diisi dan template yang dipilih. Tombol "Create Project" akan:
1. Mengirim `POST /generate` ke backend dengan semua data + ID template terpilih
2. Backend memproses secara asinkron (antrian generasi)
3. Frontend **polling setiap 5 detik** ke `/generate/status/{projectId}` hingga status menjadi `ready`
4. Saat `ready`, otomatis pindah ke halaman `/preview?id={projectId}`

#### Generating View
Selama polling, layar berganti ke `GeneratingView` — animasi loading yang menampilkan nama template dan metode gambar yang dipilih.

---

### 7.4 Halaman Preview (`/preview?id={projectId}`) — [preview](./components/preview-project.tsx)

**Viewer read-only** untuk hasil generasi website.

**Mekanisme:**
1. Ambil `project_id` dari URL query parameter
2. Query Supabase untuk mendapatkan `folder_path` (nama folder fisik di server)
3. Bangun URL iframe: `{NGROK_URL}/projects/{folder_path}/index.html?t={cache_bust}`
4. Render iframe dalam container yang mengisi seluruh layar

**Fitur Topbar:**
- Nama folder proyek (sebagai breadcrumb)
- Label "Preview Mode" + tooltip informasi
- Tombol **"Project Details"** → membuka `ProjectDetailDrawer`
- Tombol **"Edit Project"** → navigasi ke `/edit?id={projectId}`

---

### 7.5 Halaman Edit (`/edit?id={projectId}`) — [edit](./components/edit-project.tsx)

**Editor in-line** yang menggunakan pola **postMessage API** antara Next.js dan iframe.

**Mekanisme Inisialisasi:**
1. Translasi UUID → `folder_path` melalui Supabase
2. Fetch `data.json` dari `{NGROK_URL}/projects/{folder_path}/data.json` — source of truth konten website
3. Load iframe dengan mode edit: `?mode=edit`

**Mekanisme Editing:**
- Saat pengguna klik elemen teks di website dalam iframe → iframe mengirim pesan `UPDATE_DATA` dengan key dan value baru ke parent Next.js
- Next.js menyimpan perubahan di state `projectData.content`
- Saat pengguna klik gambar di website dalam iframe → iframe mengirim pesan `OPEN_IMAGE_MODAL`
- Modal `ImageManagerModal` terbuka, pengguna bisa:
  - **Upload** gambar lokal → dikirim ke `POST /project/{id}/upload-image`
  - **AI Generate** gambar dari prompt (via Flux AI) *(saat ini dinonaktifkan/dikomentar)*
  - **Stock Search** gambar dari Unsplash *(saat ini dinonaktifkan/dikomentar)*

**Injeksi Style pointer-events (BARU):**
Setiap kali iframe selesai load, fungsi `injectEditorStyles` secara otomatis menyuntikkan `<style>` ke dalam `iframeDoc.head` via `onLoad` event. CSS ini mengatur:
- Wrapper div (`.container`, `.row`, `.col`, dll.) → `pointer-events: none` agar kursor tembus
- Elemen teks (`h1`–`h6`, `p`, `span`, dll.) → `pointer-events: auto`, `z-index: 10000`
- Elemen gambar & `[data-bg-key]` → `pointer-events: auto`, `cursor: pointer`, `z-index: 10`

**Mekanisme Simpan:**
- Tombol "Save" aktif hanya jika ada perubahan (`changed === true`)
- Klik Save → konfirmasi dialog
- Eksekusi `PUT /project/{projectId}/update` dengan payload JSON (konten + gambar + theme)
- Jika berhasil → iframe di-refresh dengan `?t={timestamp}` baru untuk cache busting

**Auto-save setelah upload gambar:**
Setelah upload gambar sukses, sistem langsung menjalankan `PUT /project/{projectId}/update` otomatis tanpa konfirmasi dialog — menjamin sinkronisasi path gambar ke database Supabase segera.

---

## 8. Komponen Kunci

### 8.1 AppSidebar ([app-sidebar.tsx](./components/app-sidebar.tsx))

Sidebar navigasi yang **dinamis** — secara otomatis mengambil 7 proyek terbaru dari Supabase dan menampilkannya sebagai shortcut navigasi di panel kiri.

Struktur:
- **Header**: Logo "Subarvibe" + ikon Command
- **NavMain**: Link ke `/project`
- **NavDocuments**: Daftar 7 proyek terbaru (dinamis dari Supabase)
- **NavSecondary** *(BARU)*: Navigasi link sekunder generik (konfigurasi via props)
- **Footer**: Info & avatar pengguna

### 8.2 ProjectDetailDrawer ([project-detail-drawer.tsx](./components/project-detail-drawer.tsx))

Komponen `Sheet` (drawer dari kanan) shadcn/ui yang menampilkan detail proyek. **Telah diperbarui secara signifikan** dengan fitur baru:

**Tampilan data:**
- Thumbnail proyek
- Nama proyek
- Tanggal update & pembuatan
- Deskripsi bisnis

**Fitur Publish ke Surge.sh (BARU):**
- Tombol **"Publish"** memanggil `POST /project/{projectId}/publish` ke backend
- Backend men-deploy website ke Surge.sh dan mengembalikan URL publik
- URL disimpan di state lokal drawer (`publicUrl`) dan ditampilkan dalam input read-only + tombol copy
- Jika proyek sudah pernah di-publish (`public_url` ada di Supabase), URL langsung ditampilkan tanpa perlu publish ulang
- Tombol berganti menjadi **"Re-publish"** jika sudah ada URL
- Indikator loading (`Loading03Icon` berputar) muncul selama proses publish
- Copy URL ke clipboard dengan feedback visual 2 detik (ikon berubah ke `Tick01Icon`)

**Tombol footer:**
- Download Project → memanggil `handleDownloadProject`
- Delete Project → membuka `DeleteProjectDialog`

### 8.3 ImageManagerModal ([image-manager-modal.tsx](./components/image-manager-modal.tsx))

Modal dengan tab untuk manajemen gambar. **Status tab saat ini:**
1. **Upload** *(AKTIF)* — upload file lokal langsung ke server FastAPI, dengan cache-busting `?v={timestamp}` pada URL hasil upload
2. **AI Generate** *(DINONAKTIFKAN — dikomentar)* — placeholder menggunakan Picsum, belum terhubung ke endpoint nyata
3. **Stock Search** *(DINONAKTIFKAN — dikomentar)* — placeholder menggunakan Unsplash source URL, belum terhubung

### 8.4 NavSecondary ([nav-secondary.tsx](./components/nav-secondary.tsx)) — BARU

Komponen navigasi sekunder untuk sidebar. Menerima array `items` (title, url, icon) via props dan merendernya sebagai `SidebarMenu`. Digunakan untuk link-link tambahan yang tidak masuk kategori main nav atau documents.

### 8.5 NewProjectCard ([new-project-card.tsx](./components/new-project-card.tsx)) — BARU

Komponen kartu proyek dengan desain UI yang lebih baru — masih menggunakan **data statis hardcoded** ("Project A"). Belum dihubungkan ke state atau data Supabase. Kemungkinan merupakan komponen iterasi desain yang sedang dikerjakan.

Fitur UI: thumbnail placeholder (ikon gambar), dropdown menu (Open/Download/Edit/Delete), hover effect pada border, `CardTitle` + `CardDescription`.

### 8.6 NewProjectPage ([new-project.tsx](./components/new-project.tsx)) — BARU

Halaman create proyek versi lama (bukan wizard carousel). Menampilkan:
- **Progress stepper** horizontal 3 langkah dengan garis progress
- Tombol "Create your Project" yang membuka `CreateDialog`
- **Accordion** detail 3 bagian: Describe (form bisnis), Generating (tabel progres), Finalization
- Semua state masih hardcoded/dummy, belum terhubung ke backend

> **Catatan:** Komponen ini terlihat merupakan prototipe lama yang digantikan oleh `CreateCarousel`. Kemungkinan tidak dirender di rute aktif manapun saat ini.

### 8.7 fetchWithAuth ([lib/api-client.ts](./lib/api-client.ts))

**Wrapper HTTP client** yang secara otomatis:
1. Mengambil sesi aktif dari cookie Supabase
2. Menyuntikkan header `Authorization: Bearer {jwt_token}`
3. Menambahkan header `ngrok-skip-browser-warning: true`
4. Mengatur `Content-Type: application/json` (kecuali untuk FormData)
5. Mengirim request ke `API_BASE_URL` (URL Ngrok backend)

Semua komunikasi ke FastAPI backend wajib melalui fungsi ini.

### 8.8 fetchProjectColumns ([lib/fetch_columns.ts](./lib/fetch_columns.ts))

Utility Supabase untuk mengambil detail satu proyek berdasarkan ID. Kolom yang di-fetch:
`business_name`, `created_at`, `updated_at`, `content_data`, `folder_path`, **`public_url`** *(kolom baru — untuk status publish Surge.sh)*

### 8.9 handleDownloadProject ([lib/download-project.ts](./lib/download-project.ts))

Utility yang:
1. Memanggil `GET /project/{id}/download` (dengan auth)
2. Mengonversi response body menjadi `Blob`
3. Membuat URL objek sementara dan anchor element
4. Memicu download otomatis file `.zip` tanpa intervensi pengguna
5. Membersihkan memory setelah download selesai

---

## 9. Integrasi Backend

### 9.1 Supabase

**Database & Auth** dikelola oleh Supabase PostgreSQL. Tabel utama:

**`projects`** (tabel yang diakses frontend):
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID | Primary key, digunakan sebagai `projectId` di URL |
| `business_name` | text | Nama bisnis/proyek |
| `status` | text | `queued`, `generating`, `ready`, `failed` |
| `created_at` | timestamptz | Waktu pembuatan |
| `updated_at` | timestamptz | Waktu update terakhir |
| `folder_path` | text | Nama folder fisik di server FastAPI |
| `content_data` | jsonb | Data konten bisnis (deskripsi, dll.) |
| `public_url` | text | URL publik Surge.sh setelah publish *(kolom baru)* |

### 9.2 FastAPI Backend (via Ngrok)

Backend berjalan di mesin lokal dan diekspos ke internet melalui **Ngrok**. Semua endpoint dikonsumsi via `fetchWithAuth`.

| Endpoint | Method | Fungsi |
|---|---|---|
| `/api/templates/recommend` | POST | RAG: Cari 3 template terbaik |
| `/generate` | POST | Mulai generasi website |
| `/generate/status/{projectId}` | GET | Cek status generasi |
| `/project/{projectId}/update` | PUT | Simpan perubahan edit |
| `/project/{projectId}/upload-image` | POST | Upload gambar baru |
| `/project/{projectId}/download` | GET | Download project sebagai ZIP |
| `/project/{projectId}/publish` | POST | **[BARU]** Deploy website ke Surge.sh, return `{ url }` |
| `/projects/{folderPath}/index.html` | GET (static) | File website hasil generasi |
| `/projects/{folderPath}/data.json` | GET (static) | Data JSON konten website |
| `/projects/{folderPath}/thumbnail.jpg` | GET (static) | Screenshot thumbnail proyek |

---

## 10. Pola Arsitektur Penting

### 10.1 UUID ↔ Folder Path Translation

Backend menggunakan **nama folder fisik** (contoh: `kopi_nusantara_xyz`) untuk menyimpan file website, sedangkan frontend menggunakan **UUID** Supabase sebagai identifier di URL. Setiap kali frontend perlu membangun URL untuk iframe atau thumbnail, ia harus terlebih dahulu mengquery Supabase untuk mendapatkan `folder_path` dari `project_id`.

### 10.2 Komunikasi Iframe ↔ Parent (postMessage)

Pada halaman edit, website yang dirender di dalam iframe dimodifikasi oleh backend untuk memiliki script edit mode. Komunikasi dua arah terjadi via `window.postMessage`:

```
[Website dalam iframe] --UPDATE_DATA/OPEN_IMAGE_MODAL--> [Next.js Parent]
[Next.js Parent] --UPDATE_IMAGE--> [Website dalam iframe]
```

### 10.3 Injeksi Style ke Iframe (BARU)

Setiap kali iframe selesai load (`onLoad`), parent menyuntikkan `<style>` langsung ke `iframeDoc.head`. Ini memungkinkan override CSS pada website yang diload — khususnya untuk mengatur `pointer-events` agar kursor pengguna bisa menembus wrapper div transparan dan menyentuh elemen yang benar-benar terlihat.

### 10.4 Cache Busting

Untuk menghindari browser cache pada iframe dan thumbnail, semua URL yang bisa berubah ditambahkan parameter `?t={timestamp}`:

```typescript
const iframeUrl = `.../${folderPath}/index.html?t=${iframeRefreshKey}`
```

`iframeRefreshKey` diperbarui setiap kali ada operasi save.

### 10.5 Polling Status Generasi

Setelah submit generasi, frontend tidak menggunakan WebSocket — melainkan **polling sederhana** dengan `setInterval` implisit via loop `while(true)` dengan `await setTimeout(5000)`:

```
Submit → Backend return project_id
   ↓
while (true) {
  wait 5 seconds
  GET /generate/status/{projectId}
  if (status === "ready") → navigate to /preview
  if (status === "failed") → show error
}
```

### 10.6 Auto-save setelah Upload Gambar (BARU)

Setelah upload gambar berhasil, `handleSelectImage` di `edit-project.tsx` secara otomatis menjalankan `PUT /project/{projectId}/update` tanpa menunggu konfirmasi dari pengguna. Ini menghindari desync antara path gambar di Supabase dan file fisik di server — terutama ketika ekstensi file berubah (contoh: `.png` → `.jpg`).

---

## 11. Catatan Pengembangan & Keterbatasan Saat Ini

| Aspek | Kondisi Saat Ini |
|---|---|
| **Backend Hosting** | Berjalan di mesin lokal developer, diekspos via Ngrok (URL bisa berubah sewaktu-waktu) |
| **URL Ngrok** | Hard-coded di `lib/api-client.ts` dan beberapa komponen — perlu diperbarui manual jika URL Ngrok berubah |
| **Image Manager - AI & Stock Tab** | Dikomentar/dinonaktifkan — masih ada kode placeholder menggunakan Picsum & Unsplash source URL |
| **Dashboard Utama (`/`)** | Menggunakan data statis (`data.json`) untuk demo — belum terhubung ke Supabase |
| **Dark Mode** | Hanya dark mode yang ada; tidak ada mekanisme toggle ke light mode meski `next-themes` sudah terpasang |
| **Error Handling** | Sebagian sudah menggunakan `sonner` toast, tapi `ImageManagerModal` masih menggunakan `alert()` primitif |
| **new-project.tsx & new-project-card.tsx** | Komponen iterasi lama/prototipe, menggunakan data hardcoded, belum terintegrasi ke routing aktif |
| **pointer-events injection** | Hanya menonaktifkan kelas `.container`, `.row`, `.col`, `.wrapper`, `.text-center` — template dengan struktur berbeda mungkin perlu penyesuaian selector |

---

## 12. Cara Menjalankan Lokal

```bash
# 1. Clone repository
git clone [repo-url]

# 2. Install dependencies
npm install

# 3. Buat file environment
cp .env.example .env.local
# Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Jalankan development server
npm run dev

# 5. Akses di browser
# http://localhost:3000
```

> **Penting**: Fitur inti (generasi website, edit, preview, publish) membutuhkan backend FastAPI yang berjalan dan URL Ngrok yang aktif di `lib/api-client.ts`.

---

*Dokumen ini diperbarui berdasarkan analisis source code pada: 2026-07-03*
