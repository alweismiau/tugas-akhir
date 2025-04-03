const questionsEI = [
  {
    question: "Ketika bertemu dengan orang baru kamu biasanya",
    options: [
      { text: "Memulai membuka topik pembicaraan", value: "E" },
      { text: "Menunggu orang membuka topik pembicaraan", value: "I" },
    ],
  },
  {
    question:
      "Pekerjaan yang mengharuskan diri kamu menghadapi banyak orang baru membuat kamu…",
    options: [
      { text: "Lebih semangat bekerja", value: "E" },
      { text: "Merasa tertekan", value: "I" },
    ],
  },
  {
    question: "Mana yang lebih kamu pilih?",
    options: [
      { text: "Banyak teman walaupun jarang bertemu", value: "E" },
      { text: "Sedikit teman, namun sering bertemu", value: "I" },
    ],
  },
  {
    question: "Dalam kelompok pertemanan kamu, kamu adalah seorang…",
    options: [
      { text: "“Badut” yang meramaikan setiap pertemuan", value: "E" },
      {
        text: "“Tempat” curhat karena dianggap merupakan pendengar yang baik",
        value: "I",
      },
    ],
  },
  {
    question: "Ketika ada masalah biasanya kamu…",
    options: [
      { text: "Memilih untuk menceritakannya kepada teman-teman", value: "E" },
      { text: "Memilih untuk memendamnya", value: "I" },
    ],
  },
  {
    question: "Ketika ada gosip baru, kamu…",
    options: [
      { text: "Selalu ingin jadi yang pertama kali tahu", value: "E" },
      { text: "Tidak terlalu peduli", value: "I" },
    ],
  },
  {
    question: "Ketika bertemu orang baru, kamu biasanya…",
    options: [
      {
        text: "Mudah memulai pembicaraan dan pembicaraan tersebut bertahan lama",
        value: "E",
      },
      {
        text: "Sulit mencari topik pembicaraan dan biasanya pembicaraan tidak bertahan lama",
        value: "I",
      },
    ],
  },
  {
    question: "Ketika harus berbicara di depan publik, kamu biasanya…",
    options: [
      { text: "Spontan dengan apa yang ingin dibicarakan", value: "E" },
      {
        text: "Melatih apa yang ingin dibicarakan beberapa kali sebelum acara berlangsung",
        value: "I",
      },
    ],
  },
  {
    question: "Ketika mendatangi pesta, kamu biasanya…",
    options: [
      {
        text: "Bertahan sampai acara selesai karena merasa semakin bersemangat",
        value: "E",
      },
      {
        text: "Memilih untuk pulang lebih awal karena merasa semakin lelah",
        value: "I",
      },
    ],
  },
  {
    question: "Ketika tidak suka pada seseorang, kamu biasanya…",
    options: [
      { text: "Langsung mengomunikasikan kepada orang tersebut", value: "E" },
      {
        text: "Tidak mengutarakan kepada orang tersebut karena merasa diri sendiri memiliki kekurangan",
        value: "I",
      },
    ],
  },
];

const questionsNS = [
  {
    question: "Mana yang lebih kamu percayai?",
    options: [
      { text: "Intuisi", value: "N" },
      { text: "Fakta", value: "S" },
    ],
  },
  {
    question:
      "Jika sekarang kamu diminta untuk menulis buku, judul apa yang akan kamu pilih?",
    options: [
      { text: "“Peluang Bisnis di Masa Depan”", value: "N" },
      { text: "“Cara Praktis Menjadi Kaya dalam Waktu 1 Bulan”", value: "S" },
    ],
  },
  {
    question: "Menurutmu, anak-anak seharusnya…",
    options: [
      {
        text: "Melatih kemampuan imajinasinya agar dapat berinovasi",
        value: "N",
      },
      { text: "Melatih kemampuannya untuk berpikir secara logis", value: "S" },
    ],
  },
  {
    question: "Menurut, orang tidak akan dapat hidup tanpa…",
    options: [
      { text: "Prinsip", value: "N" },
      { text: "Fakta", value: "S" },
    ],
  },
  {
    question:
      "Mana yang lebih menarik bagimu jika kamu bekerja di suatu perusahaan?",
    options: [
      { text: "Berspekulasi terkait peluang untuk produk lainnya", value: "N" },
      {
        text: "Memproduksi suatu barang yang terbukti laris di perusahaan",
        value: "S",
      },
    ],
  },
  {
    question: "Kamu yakin bahwa bungee jumping aman dilakukan dari…",
    options: [
      { text: "Firasatmu berkata hal tersebut aman", value: "N" },
      {
        text: "Teman-temanmu, berdasarkan pengalaman mereka mengatakan aman",
        value: "S",
      },
    ],
  },
  {
    question: "Ketika melakukan sesuatu biasanya kamu…",
    options: [
      { text: "Melakukannya dengan caramu sendiri", value: "N" },
      {
        text: "Melakukannya dengan cara yang orang lain lakukan pada umumnya",
        value: "S",
      },
    ],
  },
  {
    question: "Kamu lebih mengagumi orang yang…",
    options: [
      { text: "Dapat mempersuasi lewat visi", value: "N" },
      { text: "Dapat memberikan bukti konkret", value: "S" },
    ],
  },
  {
    question: "Kamu lebih tertarik pada…",
    options: [
      { text: "Apa yang mungkin terjadi nanti", value: "N" },
      { text: "Apa yang sedang terjadi saat ini", value: "S" },
    ],
  },
];

const questionsTF = [
  {
    question:
      "Ketika ada yang menanyakan perihal cinta padamu, kamu akan menjawab bahwa cinta itu…",
    options: [
      { text: "Hubungan timbal-balik yang intim antara dua orang", value: "T" },
      {
        text: "Sebuah ikatan emosional yang mengikat dua orang sehingga menciptakan rasa saling memiliki",
        value: "F",
      },
    ],
  },
  {
    question: "Mana yang menurutmu lebih penting?",
    options: [
      { text: "Ketepatan dalam berpikir", value: "T" },
      { text: "Hubungan antarindividu yang harmonis", value: "F" },
    ],
  },
  {
    question: "Menurutmu, mana yang lebih memuaskan?",
    options: [
      { text: "Mendiskusikan isu secara mendetail", value: "T" },
      { text: "Mencapai persetujuan bersama", value: "F" },
    ],
  },
  {
    question: "Mana yang menurutmu lebih mudah kamu korbankan?",
    options: [
      { text: "Keputusan tepat berdasarkan nalar", value: "T" },
      { text: "Hubungan baik dengan orang lain", value: "F" },
    ],
  },
  {
    question: "Pujian mana yang akan lebih membuatmu merasa terapresiasi?",
    options: [
      { text: "“Kamu orang yang sangat logis, ya”", value: "T" },
      { text: "“Kamu sangat perhatian, deh”", value: "F" },
    ],
  },
  {
    question: "Kamu akan lebih percaya dengan orang yang…",
    options: [
      { text: "Kuat dengan penjelasan nalarnya", value: "T" },
      { text: "Mampu mengekpresikan emosi", value: "F" },
    ],
  },
  {
    question: "Akan lebih buruk bagimu jika menjadi orang yang…",
    options: [
      { text: "Tidak logis", value: "T" },
      { text: "Tidak memiliki belas kasih", value: "F" },
    ],
  },
  {
    question: "Apa yang paling mempengaruhimu?",
    options: [
      { text: "Isi kepalamu", value: "T" },
      { text: "Isi hatimu", value: "F" },
    ],
  },
  {
    question: "Mana yang lebih penting bagimu?",
    options: [
      { text: "Dapat meyakinkan orang dengan kata-katamu", value: "T" },
      { text: "Dapat menyentuh orang dengan kata-katamu", value: "F" },
    ],
  },
  {
    question: "Mana yang paling menggambarkan dirimu?",
    options: [
      { text: "Pemikir kritis", value: "T" },
      { text: "Perasa", value: "F" },
    ],
  },
  {
    question: "Pilih salah satu!",
    options: [
      { text: "Berorientasi pada masalah (problem-oriented)", value: "T" },
      { text: "Berorientasi pada orang (people-oriented)", value: "F" },
    ],
  },
];

const questionsPJ = [
  {
    question: "Kamu merupakan orang yang…",
    options: [
      { text: "Ngaretan", value: "P" },
      { text: "Tepat waktu", value: "J" },
    ],
  },
  {
    question: "Kamu lebih memilih…",
    options: [
      { text: "Fleksibel dengan segala sesuatu", value: "P" },
      { text: "Merencanakan segala sesuatu", value: "J" },
    ],
  },
  {
    question: "Pekerjaan seperti apa yang lebih kamu minati?",
    options: [
      { text: "Fleksibel", value: "P" },
      { text: "Sistematis", value: "J" },
    ],
  },
  {
    question: "Jika ada tugas, kamu biasanya lebih memilih…",
    options: [
      { text: "Mengerjakan ketika sudah mendekati deadline", value: "P" },
      { text: "Nyicil dari jauh-jauh hari", value: "J" },
    ],
  },
  {
    question: "Kamu tipe orang yang…",
    options: [
      { text: "Spontan", value: "P" },
      { text: "Tenang dan berhati-hati", value: "J" },
    ],
  },
  {
    question: "Jika belanja ke swalayan, kamu memilih untuk…",
    options: [
      {
        text: "Membeli barang sesuai dengan apa yang diingat dan terbuka pada kemungkinan pilihan untuk membeli barang lain",
        value: "P",
      },
      {
        text: "Mencatat daftar barang yang perlu dibeli agar tidak membeli barang yang tidak diperlukan",
        value: "J",
      },
    ],
  },
  {
    question: "Pilihlah salah satu!",
    options: [
      {
        text: "Hidup fleksibel dan mudah beradaptasi pada perubahan",
        value: "P",
      },
      { text: "Hidup teratur dan terorganisasi", value: "J" },
    ],
  },
  {
    question: "Ketika memutuskan sesuatu kamu biasanya…",
    options: [
      { text: "Memutuskannya dengan spontan", value: "P" },
      { text: "Memutuskannya dengan sangat hati-hati", value: "J" },
    ],
  },
  {
    question: "Liburan seperti apa yang menurutmu lebih dapat kamu nikmati?",
    options: [
      { text: "Dadakan", value: "P" },
      { text: "Terencana dengan baik", value: "J" },
    ],
  },
  {
    question: "Menurutmu, kamu adalah orang yang…",
    options: [
      { text: "Easy-going", value: "P" },
      { text: "Determined", value: "J" },
    ],
  },
];

export { questionsEI, questionsNS, questionsTF, questionsPJ };
