import { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import GradientText from "../GradientText/GradientText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import "./ClientReviews.css";

function ClientReviews() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rating, setRating] = useState(5);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const fileInputRef = useRef(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageData = URL.createObjectURL(file);
      setImageSrc(imageData);

      const img = new Image();
      img.onload = () => {
        setImageDimensions({
          width: img.width,
          height: img.height,
        });
      };
      img.src = imageData;
    }
  };

  const getCroppedImg = async () => {
    if (!croppedAreaPixels) {
      alert("Please crop the image first.");
      return;
    }

    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const { x, y, width, height } = croppedAreaPixels;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

    const base64 = canvas.toDataURL("image/jpeg");
    setCroppedImage(base64);
    setImageSrc(null);
    setImageDimensions({ width: 0, height: 0 });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCancel = () => {
    setImageSrc(null);
    setCroppedAreaPixels(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setImageDimensions({ width: 0, height: 0 });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getCropperContainerStyle = () => {
    const maxWidth = 310;
    const maxHeight = 310;

    if (imageDimensions.width === 0 || imageDimensions.height === 0) {
      return { width: maxWidth, height: maxHeight };
    }

    const widthRatio = maxWidth / imageDimensions.width;
    const heightRatio = maxHeight / imageDimensions.height;

    const scale = Math.min(widthRatio, heightRatio);

    const scaledWidth = imageDimensions.width * scale;
    const scaledHeight = imageDimensions.height * scale;

    return {
      width: `${Math.round(scaledWidth)}px`,
      height: `${Math.round(scaledHeight)}px`,
      margin: "0 auto",
    };
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const renderStars = () => {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      const difference = rating - i;

      let icon = faStar;
      let color = "text-secondary";

      if (difference >= -0.5) {
        color = "text-warning";

        if (difference < 0 && difference >= -0.5) {
          icon = faStarHalfStroke;
        } else {
          icon = faStar;
        }
      } else {
        color = "text-secondary";
        icon = faStar;
      }

      stars.push(<FontAwesomeIcon key={i} icon={icon} className={color} />);
    }
    return stars;
  };

  return (
    <>
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={true}
        className="custom-class"
      >
        Client Reviews
      </GradientText>

      <div className="submit-review">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={true}
          className="custom-class"
        >
          Submit Review
        </GradientText>
        <div className="form-group-upload-pic">
          <label className="profile-label themed-text lg-text">
            Profile Picture
          </label>

          <div className="profile-wrapper">
            <div className="avatar-container">
              {croppedImage ? (
                <img src={croppedImage} alt="Profile" className="profile-img" />
              ) : (
                <div className="placeholder">+</div>
              )}

              <label htmlFor="fileInput" className="camera-icon">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="camera-svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7l3-3h4l3 3h4l3 3v10H3V7z"
                  />
                </svg>
              </label>
              <input
                type="file"
                ref={fileInputRef}
                id="fileInput"
                accept="image/*"
                className="file-input"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {imageSrc && (
            <div className="editor-modal themed-bg">
              {/* 🔥 Apply dynamic style here */}
              <div
                className="cropper-container"
                style={getCropperContainerStyle()}
              >
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  onCropChange={setCrop}
                  cropShape="round"
                  aspect={1}
                  zoom={zoom}
                  zoomSpeed={0.1}
                  showGrid={false}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="crop-slider"
              />

              <button onClick={getCroppedImg} className="btn-save">
                Apply
              </button>
              <button onClick={handleCancel} className="btn-cancel">
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="form-group">
          <input
            className="themed-text lg-text"
            id="fullName"
            type="text"
            placeholder=" "
          />
          <label className="themed-text lg-text" htmlFor="fullName">
            Full Name
          </label>
        </div>
        <div className="form-group">
          <input
            className="themed-text lg-text"
            id="country"
            type="text"
            placeholder=" "
          />
          <label className="themed-text lg-text" htmlFor="country">
            Your Country
          </label>
        </div>

        <label className="profile-label themed-text lg-text">
          Rating: {rating.toFixed(1)} Stars
        </label>

        <div className="stars-container normal-heading">{renderStars()}</div>

        <div className="form-group">
          <input
            className="themed-text"
            id="ratingStar"
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={rating}
            onChange={handleRatingChange}
          />
        </div>
        <div className="form-group">
          <textarea
            className="themed-text lg-text"
            id="meassage"
            type="text"
          ></textarea>
          <label
            className="themed-text lg-text"
            htmlFor="meassage"
            placeholder=" "
          >
            Meassage
          </label>
        </div>
      </div>
    </>
  );
}

export default ClientReviews;
