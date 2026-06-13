import { useState } from "react";
import Cropper from "react-easy-crop";

function ImageUploader({ label, onImageReady }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [tempImage, setTempImage] = useState(null);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleSelect = (file) => {
        if (!file) return;

        const url = URL.createObjectURL(file);

        setTempImage(url);
        setModalOpen(true);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const getCroppedImage = async () => {
        const image = new Image();
        image.src = tempImage;

        await new Promise((resolve) => {
            image.onload = resolve;
        });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const { x, y, width, height } = croppedAreaPixels;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(
            image,
            x,
            y,
            width,
            height,
            0,
            0,
            width,
            height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const file = new File([blob], "cropped-image.jpg", {
                    type: "image/jpeg",
                });

                resolve({
                    file,
                    previewUrl: URL.createObjectURL(blob),
                });
            }, "image/jpeg");
        });
    };

    const saveCroppedImage = async () => {
        if (!croppedAreaPixels) return;

        const result = await getCroppedImage();

        onImageReady(result.file, result.previewUrl);

        setModalOpen(false);
        setTempImage(null);
    };

    return (
        <>
            <label className="file-upload">
                {label}
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleSelect(e.target.files[0])}
                />
            </label>

            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Edit Image</h3>

                        <div className="image-crop-box">
                            <Cropper
                                image={tempImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="rect"
                                showGrid={true}
                                objectFit="contain"
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>

                        <input
                            className="image-crop-range"
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                        />

                        <div className="modal-buttons">
                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setModalOpen(false);
                                    setTempImage(null);
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                className="delete-btn"
                                onClick={saveCroppedImage}
                            >
                                Save Image
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ImageUploader;