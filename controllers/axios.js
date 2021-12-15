const axios = require('axios');
const controller = {};

controller.postClientAPI = function () {
    const response = axios({
        method: 'post',
        url: 'https://prototipe.unpas.ac.id/situ/api/public/api-v1/klien/auth/login',
        data: {
          email: 'agung@gmail.com',
          password: '112233'
        }
    }).then((response) => response.data);
    return response;
}

controller.postLoginUser = function (token) {
    const response = axios({
        method: 'post',
        url: 'https://prototipe.unpas.ac.id/situ/api/public/api-v1/user/login',
        headers: {
            token: token
        },
        data: {
            nama: '173040123',
            sandi: '173040123'
        }
    }).then((response) => response.data);
    return response;
}


// Formulir API
controller.getAllFormulir = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/formulir?page=${page}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.addFormulir = function (username, token, data) {
    const response = axios({
        method: 'post',
        url: 'https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/formulir',
        data: {
            Nama: data['nama'],
            KodeID: 'demo',
            JumlahPilihan: data['jmlPilihan'],
            Harga: data['harga'],
            HanyaProdi1: data['hanyaProdi1'],
            KecualiProdi1: data['kecualiProdi1'],
            HanyaProdi2: data['hanyaProdi2'],
            KecualiProdi2: data['kecualiProdi2'],
            HanyaProdi3: data['hanyaProdi3'],
            KecualiProdi3: data['kecualiProdi3'],
            Keterangan:  data['ket'],
            NA: data['Y'] ? 'Y' : 'N'
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.editFormulir = function (username, token, data, id) {
    const response = axios({
        method: 'put',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/formulir/${id}`,
        data: {
            Nama: data['nama'],
            KodeID: 'demo',
            JumlahPilihan: data['jmlPilihan'],
            Harga: data['harga'],
            HanyaProdi1: data['hanyaProdi1'],
            KecualiProdi1: data['kecualiProdi1'],
            HanyaProdi2: data['hanyaProdi2'],
            KecualiProdi2: data['kecualiProdi2'],
            HanyaProdi3: data['hanyaProdi3'],
            KecualiProdi3: data['kecualiProdi3'],
            Keterangan:  data['ket'],
            NA: data['NA'] ? 'Y' : 'N'
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.deleteFormulir = function (username, token, id) {
    const response = axios({
        method: 'delete',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/formulir/${id}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}
// End Formulir API


// Periode API
controller.getAllPeriode = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/gelombang?page=${page}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.addPeriode = function (username, token, data) {
    const response = axios({
        method: 'post',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/gelombang`,
        data: {
            PMBPeriodID: data['kodeP'],
            KodeID: 'demo',
            Nama: data['namaP'],
            TglMulai: data['tglMulai'],
            TglSelesai: data['tglSelesai'],
            WaktuSelesaiOnline: '2021-12-12',
            UjianMulai: data['ujianMulai'],
            UjianSelesai: data['ujianSelesai'],
            JamUjianMulai: data['jamUjianMulai'],
            JamUjianSelesai: data['jamUjianSelesai'],
            PengumumanMulai:  data['pMulai'],
            PengumumanSelesai:  data['pSelesai'],
            BayarMulai: data['bayarMulai'],
            BayarSelesai: data['bayarSelesai'],
            TelitiBayarProdi: data['tBayarProdi'],
            NA: data['nap'] ? 'Y' : 'N',
            NomorPengumuman: data['noP'],
            NomorSuket: data['noSuket'],
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.editPeriode = function (username, token, data, id) {
    const response = axios({
        method: 'put',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/gelombang/${id}`,
        data: {
            Nama: data['namaP'],
            TglMulai: data['tglMulai'],
            TglSelesai: data['tglSelesai'],
            WaktuSelesaiOnline: '2021-12-12',
            UjianMulai: data['ujianMulai'],
            UjianSelesai: data['ujianSelesai'],
            JamUjianMulai: data['jamUjianMulai'],
            JamUjianSelesai: data['jamUjianSelesai'],
            PengumumanMulai:  data['pMulai'],
            PengumumanSelesai:  data['pSelesai'],
            BayarMulai: data['bayarMulai'],
            BayarSelesai: data['bayarSelesai'],
            TelitiBayarProdi: data['tBayarProdi'],
            NA: data['NA'] ? 'Y' : 'N',
            NomorPengumuman: data['noP'],
            NomorSuket: data['noSuket'],
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.deletePeriode = function (username, token, id) {
    const response = axios({
        method: 'delete',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/gelombang/${id}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}
// End Periode API

// Komponen USM API
controller.getAllKomponenUSM = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/usm?page=${page}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.addKomponenUSM = function (username, token, data) {
    const response = axios({
        method: 'post',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/usm`,
        data: {
            PMBUSMID: data['ID'],
            Nama: data['nama'],
            LMSName: data['LMSName'],
            Keterangan: data['ket'],
            NA: data['NA'] ? 'Y' : 'N',
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.editKomponenUSM = function (username, token, data, id) {
    const response = axios({
        method: 'put',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/usm/${id}`,
        data: {
            Nama: data['nama'],
            LMSName: data['LMSName'],
            Keterangan: data['ket'],
            NA: data['NA'] ? 'Y' : 'N',
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.deleteKomponenUSM = function (username, token, id) {
    const response = axios({
        method: 'delete',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/usm/${id}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

// End Komponen USM API

// OPMB API
controller.getAllOpmb = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst/opmb?page=${page}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.addOpmb = function (username, token, data) {
    const response = axios({
        method: 'post',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst/opmb`,
        data: {
            Tahun: data['Tahun'],
            Nama: data['Nama'],
            Tempat: data['Tempat'],
            PerKelompok: data['PerKelompok'],
            Kelompok: data['Kelompok'],
            WaktuMulai: data['WaktuMulai'],
            WaktuSelesai: data['WaktuSelesai'],
            NA: data['NA'] ? 'Y' : 'N',
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.editOpmb = function (username, token, data, id) {
    const response = axios({
        method: 'put',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst/opmb/${id}`,
        data: {
            Tahun: data['Tahun'],
            KodeID: data['KodeID'],
            Nama: data['Nama'],
            Tempat: data['Tempat'],
            PerKelompok: data['PerKelompok'],
            Kelompok: data['Kelompok'],
            WaktuMulai: data['WaktuMulai'],
            WaktuSelesai: data['WaktuSelesai'],
            NA: data['NA'] ? 'Y' : 'N',
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.deleteOpmb = function (username, token, id) {
    const response = axios({
        method: 'delete',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst/opmb/${id}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

// Persyaratan API
controller.getAllPersyaratan = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/persyaratan?page=${page}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.addPersyaratan = function (username, token, data) {
    const response = axios({
        method: 'post',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/persyaratan`,
        data: {
            PMBSyaratID: data['SyaratID'],
            KodeID: data['KodeID'],
            Nama: data['Nama'],
            StatusAwalID: data['StatusAwal'],
            ProdiID: data['ProdiID'],
            NA: data['NA'] ? 'Y' : 'N',
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.editPersyaratan = function (username, token, data, id) {
    const response = axios({
        method: 'put',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/persyaratan/${id}`,
        data: {
            Nama: data['Nama'],
            StatusAwalID: data['StatusAwal'],
            ProdiID: data['ProdiID'],
            NA: data['NA'] ? 'Y' : 'N',
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.deletePersyaratan = function (username, token, id) {
    const response = axios({
        method: 'delete',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/persyaratan/${id}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}
// End persyaratan API

// Usm umum
controller.getUsmUmum = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/trn/usm-umum?page=${page}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.addUsmUmum = function (username, token, data) {
    const response = axios({
        method: 'post',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/trn/usm-umum`,
        data: {
            USMUmumID: data['ID'],
            Nama: data['nama'],
            RuangID: data['Ruang'],
            NA: data['NA'] ? 'Y' : 'N',
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.editUsmUmum = function (username, token, data, id) {
    const response = axios({
        method: 'put',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/trn/usm-umum/${id}`,
        data: {
            Nama: data['nama'],
            RuangID: data['Ruang'],
            NA: data['NA'] ? 'Y' : 'N',
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.deleteUsmUmum = function (username, token, id) {
    const response = axios({
        method: 'delete',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/trn/usm-umum/${id}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}
// End usm umum

// Usm umum
controller.getUsmProdi = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/trn/usm-prodi?page=${page}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.addUsmProdi = function (username, token, data) {
    const response = axios({
        method: 'post',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/trn/usm-prodi`,
        data: {
            ProdiUSMID: data['ProdiUSMID'],
            PMBUSMID: data['PMBUSMID'],
            PMBPeriodID: data['PMBPeriodID'],
            ProdiID: data['ProdiID'],
            Urutan: data['Urutan'],
            TanggalUjian: data['TanggalUjian'],
            RuangID: data['RuangID'],
            JumlahSoal: data['JumlahSoal'],
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.editUsmProdi = function (username, token, data, id) {
    const response = axios({
        method: 'put',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/trn/usm-prodi/${id}`,
        data: {
            PMBUSMID: data['PMBUSMID'],
            PMBPeriodID: data['PMBPeriodID'],
            ProdiID: data['ProdiID'],
            Urutan: data['Urutan'],
            TanggalUjian: data['TanggalUjian'],
            RuangID: data['RuangID'],
            JumlahSoal: data['JumlahSoal'],
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.deleteUsmProdi = function (username, token, id) {
    const response = axios({
        method: 'delete',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/trn/usm-prodi/${id}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}
// End usm umum

// Status Awal
controller.getStatusAwal = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/jalak/ref-status-awal?page=${page}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
    
}

controller.addStatusAwal = function (username, token, data) {
    const response = axios({
        method: 'post',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/jalak/ref-status-awal`,
        data: {
            id: data['id'],
            nama: data['nama'],
            beli_formulir: data['beli_formulir'] ? 'Y' : 'N',
            jalur_khusus: data['jalur_khusus'] ? 'Y' : 'N',
            tanpa_test: data['tanpa_test'] ? 'Y' : 'N',
            NA: data['NA'] ? 'Y' : 'N',
            catatan: data['catatan'],
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.editStatusAwal = function (username, token, data, id) {
    const response = axios({
        method: 'put',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/jalak/ref-status-awal/${id}`,
        data: {
            nama: data['nama'],
            beli_formulir: data['beli_formulir'] ? 'Y' : 'N',
            jalur_khusus: data['jalur_khusus'] ? 'Y' : 'N',
            tanpa_test: data['tanpa_test'] ? 'Y' : 'N',
            NA: data['NA'] ? 'Y' : 'N',
            catatan: data['catatan'],
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.deleteStatusAwal = function (username, token, id) {
    const response = axios({
        method: 'delete',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/jalak/ref-status-awal/${id}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

// End Status Awal

// Asal Sekolah
controller.getAsalSekolah = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/ref/asal-sekolah?page=${page}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.addAsalSekolah = function (username, token, data) {
    const response = axios({
        method: 'post',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/ref/asal-sekolah`,
        data: {
            SekolahID: data['npsn'],
            Nama: data['nama_sekolah'],
            Alamat1: data['alamat_sekolah'],
            KodePos: data['kode_pos'],
            JenisSekolahID: data['js'],
            Kota: data['kab_kota'],
            Fax: data['fax'],
            Email: data['email'],
            Telephone: data['no_telepon'],
            NA: data['status'] ? 'Y' : 'N',
            Website: data['web'],
            Kontak: data['kontak'],
            JabatanKontak: data['jabatan_kontak'],
            HandphoneKontak: data['hp_kontak'],
            EmailKontak: data['email_kontak'],
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.editAsalSekolah = function (username, token, data, id) {
    const response = axios({
        method: 'put',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/ref/asal-sekolah/${id}`,
        data: {
            Nama: data['nama_sekolah'],
            Alamat1: data['alamat_sekolah'],
            KodePos: data['kode_pos'],
            JenisSekolahID: data['js'],
            Kota: data['kab_kota'],
            Fax: data['fax'],
            Email: data['email'],
            Telephone: data['no_telepon'],
            NA: data['status'] ? 'Y' : 'N',
            Website: data['web'],
            Kontak: data['kontak'],
            JabatanKontak: data['jabatan_kontak'],
            HandphoneKontak: data['hp_kontak'],
            EmailKontak: data['email_kontak'],
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.deleteAsalSekolah = function (username, token, SekolahId) {
    const response = axios({
        method: 'delete',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/ref/asal-sekolah/${SekolahId}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}
// End Asal Sekolah

// Jenis Sekolah
controller.getJenisSekolah = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/ref/jenis-sekolah?page=${page}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.addJenisSekolah = function (username, token, data) {
    const response = axios({
        method: 'post',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/ref/jenis-sekolah`,
        data: {
            JenisSekolahID: data['id'],
            Nama: data['nama'],
            SatuGroup: data['sg'] ? 'Y' : 'N',
            NA: data['status'] ? 'Y' : 'N',
            TemplateSuratPMB: data['temp'],
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.editJenisSekolah = function (username, token, data, id) {
    const response = axios({
        method: 'put',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/ref/jenis-sekolah/${id}`,
        data: {
            Nama: data['nama'],
            SatuGroup: data['sg'] ? 'Y' : 'N',
            NA: data['status'] ? 'Y' : 'N',
            TemplateSuratPMB: data['temp'],
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.deleteJenisSekolah = function (username, token, SekolahId) {
    const response = axios({
        method: 'delete',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/ref/jenis-sekolah/${SekolahId}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}
// End Asal Sekolah

// Penjualan Form
// controller.getAllPenjualanForm = function (username, token, page) {
//     const response = axios({
//         method: 'get',
//         url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/trn/formulir`,
//         headers: {
//             username: username,
//             token: token
//         }
//     }).then((response) => response.data);
//     return response;
// }
// End Penjualan Form

// Denah USM
controller.getAllDenahUSM = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/formulir`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}
// End Denah USM

// Daftar USM
controller.getAllDaftarUSM = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/mst-pmb/sekolah?page=${page}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}
// End Daftar USM

// File USM
controller.getAllFileUSM = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/usm-file`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}
// End File USM

// Hasil USM
controller.getAllHasilUSM = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/usm-kunci`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}
// End Hasil USM

// Info Peserta
controller.getAllInfoPeserta = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/trn/pmb`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}
// End Info Peserta

// Perguruan Tinggi

controller.getAllPerguruanTinggi = function (username, token, page) {
    const response = axios({
        method: 'get',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/perguruanTinggi?page=${page}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.addPerguruanTinggi = function (username, token, data) {
    const response = axios({
        method: 'post',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/perguruanTinggi`,
        data: {
PerguruanTinggiID: data['PerguruanTinggiID'],
Nama: data['Nama'],
SingkatanNama: data['SingkatanNama'],
Alamat1: data['Alamat1'],
Alamat2: data['Alamat2'],
Kota: data['Kota'],
KodePos: data['KodePos'],
JenisPerguruanTinggiID: data['JenisPerguruanTinggiID'],
Grup: data['Grup'],
Telephone: data['Telephone'],
Fax: data['Fax'],
Website: data['Website'],
Email: data['Email'],
Kontak: data['Kontak'],
JabatanKontak: data['JabatanKontak'],
HandphoneKontak: data['HandphoneKontak'],
EmailKontak: data['EmailKontak'],
NA: data['NA'] ? 'Y' : 'N',
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.deletePerguruanTinggi = function (username, token, id) {
    const response = axios({
        method: 'delete',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/perguruanTinggi/${id}`,
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}

controller.editPerguruanTinggi = function (username, token, data, id) {
    const response = axios({
        method: 'put',
        url: `https://prototipe.unpas.ac.id/situ/api/public/api-v1/modul/pmb/perguruanTinggi/${id}`,
        data: {
            Nama: data['Nama'],
            SingkatanNama: data['SingkatanNama'],
            Alamat1: data['Alamat1'],
            Alamat2: data['Alamat2'],
            Kota: data['Kota'],
            KodePos: data['KodePos'],
            JenisPerguruanTinggiID: data['JenisPerguruanTinggiID'],
            Grup: data['Grup'],
            Telephone: data['Telephone'],
            Fax: data['Fax'],
            Website: data['Website'],
            Email: data['Email'],
            Kontak: data['Kontak'],
            JabatanKontak: data['JabatanKontak'],
            HandphoneKontak: data['HandphoneKontak'],
            EmailKontak: data['EmailKontak'],
            NA: data['NA'] ? 'Y' : 'N',
        },
        headers: {
            username: username,
            token: token
        }
    }).then((response) => response.data);
    return response;
}


// End Perguruan Tinggi

module.exports = controller;