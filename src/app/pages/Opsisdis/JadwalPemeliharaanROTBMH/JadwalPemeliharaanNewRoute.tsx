import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const DaftarRencanaPemeliharaanPageJQ = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarRencanaPemeliharaan/DaftarRencanaPemeliharaanPageJQ"))
const DaftarRencanaPemeliharaanDetailPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarRencanaPemeliharaan/DaftarRencanaPemeliharaanDetailPage"))
const DaftarRencanaPemeliharaanFormPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarRencanaPemeliharaan/DaftarRencanaPemeliharaanFormPage"))

const DaftarPelaksanaanPemeliharaanPageJQ = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarPelaksanaanPemeliharaan/DaftarPelaksanaanPemeliharaanPageJQ"))
const DaftarPelaksanaanPemeliharaanDetailPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarPelaksanaanPemeliharaan/DaftarPelaksanaanPemeliharaanDetailPage"))
const DaftarPelaksanaanPemeliharaanFormPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarPelaksanaanPemeliharaan/DaftarPelaksanaanPemeliharaanFormPage"))

const DaftarRealisasiPemeliharaanPageJQ = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarRealisasiPemeliharaan/DaftarRealisasiPemeliharaanPageJQ"))
const DaftarRealisasiPemeliharaanDetailPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarRealisasiPemeliharaan/DaftarRealisasiPemeliharaanDetailPage"))
const DaftarRealisasiPemeliharaanFormPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarRealisasiPemeliharaan/DaftarRealisasiPemeliharaanDetailPage"))

const DaftarBatalPemeliharaanPageJQ = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarBatalPemeliharaan/DaftarBatalPemeliharaanPageJQ"))
const DaftarBatalPemeliharaanDetailPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarBatalPemeliharaan/DaftarBatalPemeliharaanDetailPage"))
const DaftarBatalJadwalHarFormPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarBatalPemeliharaan/DaftarBatalJadwalHarFormPage"))

const DaftarManuverPemeliharaanPageJQ = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarManuverPemeliharaan/DaftarManuverPemeliharaanPageJQ"))
const DaftarManuverPemeliharaanDetailPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarManuverPemeliharaan/DaftarManuverPemeliharaanDetailPage"))
const DaftarManuverPemeliharaanFormPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/InfoJadwalPemeliharaan/DaftarManuverPemeliharaan/DaftarManuverPemeliharaanFormPage"))


// const UsulanJadwalHarJQ = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/UsulanJadwalHAR/UsulanJadwalHarJQ"))
const UsulanJadwalHar = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/UsulanJadwalHAR/UsulanJadwalHarCoba"))
const UsulanJadwalHarDetailPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/UsulanJadwalHAR/UsulanJadwalHarDetailPage"))
const UsulanJadwalHarFormPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/UsulanJadwalHAR/UsulanJadwalHarFormPage"))

const PostingJadwalHar = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/PostingJadwalHAR/PostingJadwalHar"))
const PostingJadwalHarDetailPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/PostingJadwalHAR/PostingJadwalHarDetailPage"))
const PostingJadwalHarFormPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/PostingJadwalHAR/PostingJadwalHarFormPage"))

const ApproveJadwalHar = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/ApproveJadwalHAR/ApproveJadwalHar"))
const ApproveJadwalHarDetailPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/ApproveJadwalHAR/ApproveJadwalHarDetailPage"))
const ApproveJadwalHarFormPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/ApproveJadwalHAR/ApproveJadwalHarFormPage"))

const ApproveJadwalHarUid = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/ApproveJadwalHARUID/ApproveJadwalHarUid"))
const ApproveJadwalHarUidDetailPageCopy = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/ApproveJadwalHARUID/ApproveJadwalHarUidDetailPageCopy"))
const ApproveJadwalHarUidFormPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/ApproveJadwalHARUID/ApproveJadwalHarUidFormPage"))

const UpdateJadwalHar = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/UpdateProgresJadwal/UpdateJadwalHar"))
const UpdateJadwalHarDetailPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/UpdateProgresJadwal/UpdateJadwalHarDetailPage"))
const UpdateJadwalHarFormPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/UpdateProgresJadwal/UpdateJadwalHarFormPage"))
// const UploadDokumenDetailFormPage = React.lazy(() => import("@app/pages/Opsisdis/Dokumen/UploadDokumen/UploadDokumenDetailFormPage"))

const ReleaseJadwalHar = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/ReleaseJadwalHAR/UsulanJadwalHarCoba"))
const ReleaseJadwalHarDetailPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/ReleaseJadwalHAR/UsulanJadwalHarDetailPage"))
const ReleaseJadwalHarFormPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/ReleaseJadwalHAR/UsulanJadwalHarFormPage"))

const MenuKepencetBatal = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/MenuKepencetBatal/KepencetJadwalHar"))
const MenuKepencetBatalDetailPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/MenuKepencetBatal/KepencetJadwalHarDetailPage"))
const MenuKepencetBatalFormPage = React.lazy(() => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/MenuKepencetBatal/KepencetJadwalHarFormPage"))

const PelangganBulananUP3 = React.lazy(
  () => import("@app/pages/Opsisdis/JadwalPemeliharaanROTBMH/PelangganUP3/PelangganBulananUP3")
);

export default function DokumenRoute() {
  return (
    <>
      <Routes>
        <Route path='pelanggan-bulan-har'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><PelangganBulananUP3 /></React.Suspense>} />
        </Route>

        <Route path="daftar-rencana-har">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarRencanaPemeliharaanPageJQ />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarRencanaPemeliharaanFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarRencanaPemeliharaanFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <DaftarRencanaPemeliharaanDetailPage />
                </React.Suspense>
              }
            />

          </Route>
        </Route>

        <Route path="daftar-realisasi-har">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarRealisasiPemeliharaanPageJQ />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarRealisasiPemeliharaanFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarRealisasiPemeliharaanFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <DaftarRealisasiPemeliharaanDetailPage />
                </React.Suspense>
              }
            />

          </Route>
        </Route>

        <Route path="daftar-pelaksanaan-har">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarPelaksanaanPemeliharaanPageJQ />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarPelaksanaanPemeliharaanFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarPelaksanaanPemeliharaanFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <DaftarPelaksanaanPemeliharaanDetailPage />
                </React.Suspense>
              }
            />

          </Route>
        </Route>

        <Route path="daftar-batal-har">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarBatalPemeliharaanPageJQ />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarBatalJadwalHarFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarBatalJadwalHarFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <DaftarBatalPemeliharaanDetailPage />
                </React.Suspense>
              }
            />

          </Route>
        </Route>

        <Route path="daftar-manuver-har">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarManuverPemeliharaanPageJQ />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarManuverPemeliharaanFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarManuverPemeliharaanFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <DaftarManuverPemeliharaanDetailPage />
                </React.Suspense>
              }
            />

          </Route>
        </Route>


        <Route path="usulan-jadwal-har">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <UsulanJadwalHar />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <UsulanJadwalHarFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <UsulanJadwalHarFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <UsulanJadwalHarDetailPage />
                </React.Suspense>
              }
            />

          </Route>
        </Route>

        <Route path="posting-jadwal-har">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <PostingJadwalHar />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <PostingJadwalHarFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <PostingJadwalHarFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <PostingJadwalHarDetailPage />
                </React.Suspense>
              }
            />

          </Route>
        </Route>

        <Route path="approve-jadwal-har">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <ApproveJadwalHar />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <ApproveJadwalHarFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <ApproveJadwalHarFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <ApproveJadwalHarDetailPage />
                </React.Suspense>
              }
            />

          </Route>
        </Route>

        <Route path="approve-jadwal-har-uid">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <ApproveJadwalHarUid />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <ApproveJadwalHarUidFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <ApproveJadwalHarUidFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <ApproveJadwalHarUidDetailPageCopy />
                </React.Suspense>
              }
            />

          </Route>
        </Route>

        <Route path="update-jadwal-har">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <UpdateJadwalHar />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <UpdateJadwalHarFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <UpdateJadwalHarFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <UpdateJadwalHarDetailPage />
                </React.Suspense>
              }
            />

          </Route>
        </Route>

        <Route path="release-jadwal-har">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <ReleaseJadwalHar />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <ReleaseJadwalHarFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <ReleaseJadwalHarFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <ReleaseJadwalHarDetailPage />
                </React.Suspense>
              }
            />

          </Route>
        </Route>

        <Route path="kepencet-jadwal-har">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <MenuKepencetBatal />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <MenuKepencetBatalFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <MenuKepencetBatalFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <MenuKepencetBatalDetailPage />
                </React.Suspense>
              }
            />

          </Route>
        </Route>

        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
