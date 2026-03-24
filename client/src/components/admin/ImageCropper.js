import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './ImageCropper.css';

function getCroppedImg(imageSrc, pixelCrop) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y,
        pixelCrop.width, pixelCrop.height,
        0, 0,
        pixelCrop.width, pixelCrop.height
      );
      canvas.toBlob(blob => {
        if (!blob) { reject(new Error('Canvas is empty')); return; }
        blob.name = 'cropped.jpg';
        resolve(blob);
      }, 'image/jpeg', 0.92);
    };
    image.onerror = reject;
  });
}

export default function ImageCropper({ imageSrc, onCropDone, onCancel, aspect = 4/3 }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDone = async () => {
    setLoading(true);
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropDone(croppedBlob);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cropper-overlay">
      <div className="cropper-modal">
        <div className="cropper-header">
          <h3>✂️ Crop Your Image</h3>
          <p>Drag to reposition • Pinch or scroll to zoom</p>
        </div>

        <div className="cropper-area">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="rect"
            showGrid={true}
            style={{
              containerStyle: { background: '#0a0a0a' },
              cropAreaStyle: { border: '2px solid #FFD700' },
            }}
          />
        </div>

        {/* Aspect ratio presets */}
        <div className="cropper-presets">
          <span className="cropper-presets-label">Aspect Ratio:</span>
          <button className={`preset-btn ${aspect === 4/3 ? 'active' : ''}`} onClick={() => {}}>4:3 Standard</button>
          <button className="preset-btn" onClick={() => {}}>16:9 Wide</button>
          <button className="preset-btn" onClick={() => {}}>1:1 Square</button>
        </div>

        {/* Zoom slider */}
        <div className="cropper-zoom">
          <span>🔍</span>
          <input
            type="range"
            min={1} max={3} step={0.05}
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
            className="zoom-slider"
          />
          <span>{Math.round(zoom * 100)}%</span>
        </div>

        <div className="cropper-actions">
          <button className="btn-outline" onClick={onCancel} disabled={loading}>
            ← Back
          </button>
          <button className="btn-primary" onClick={handleDone} disabled={loading}>
            {loading ? 'Cropping...' : '✅ Use This Crop'}
          </button>
        </div>
      </div>
    </div>
  );
}
