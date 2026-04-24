import React from "react";
import { Button } from "react-bootstrap";

type Props = {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    register: any;
    errors: any;
    handleInputChange: (field: string, value: any) => void;
    text?: string;
    formModel?: {
        saidi?: number;
        saifi?: number;
        [key: string]: any;
    };
};

const ModalConfirmJadwal = ({
    show,
    onConfirm,
    onCancel,
    formModel,
    text,
}: Props) => {
    if (!show) return null;
    console.log("formModel", formModel); // <-- di sini

    const saidi = formModel?.saidi ?? "";
    const saifi = formModel?.saifi ?? "";

    console.log("💡 SAIDI:", saidi);
    console.log("💡 SAIFI:", saifi);

    const displayText =
        text ??
        `
Estimasi dari usulan jadwal pemeliharaan ini:
SAIDI : <b>${saidi}</b> menit / pelanggan
SAIFI : <b>${saifi}</b> kali / pelanggan<br/>
Apakah Anda yakin akan menyimpan data?
`;


    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-box">
                <h5 className="custom-title">KONFIRMASI PEMELIHARAAN</h5>

                {/* ✅ ubah bagian ini */}
                <div
                    style={{ whiteSpace: "pre-wrap", margin: 0 }}
                    dangerouslySetInnerHTML={{ __html: displayText }}
                />

                <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button className="btn-cancel" onClick={onCancel}>Tidak</Button>
                    <Button
                        className="btn-ok"
                        onClick={() => {
                            onConfirm();
                        }}
                    >
                        Ya
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmJadwal;
