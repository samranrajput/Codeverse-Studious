import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import "./ClientReviews.css";
// Assuming GradientText component and its imports are correct
import GradientText from "../GradientText/GradientText";
import ShinyButtonText from "../ShinyButtonText/ShinyButtonText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { IoMdPhotos } from "react-icons/io";

// ⚠️ ZAROORI: CLOUDINARY CONFIGURATION KO APNE ACCOUNT DETAILS SE BADALEIN ⚠️
const CLOUDINARY_CLOUD_NAME = "dgztym2e5"; // <-- APNA CLOUD NAME YAHAN DAALEIN
const CLOUDINARY_UPLOAD_PRESET = "image-url"; // <-- APNA UNSIGNED PRESET YAHAN DAALEIN
// -------------------------------------------------------------------------

function ClientReviews() {
  // FORM FIELDS STATES
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null); // { type: 'success' | 'error', text: '...' }

  // FORM ENDPOINT
  const FORM_ENDPOINT = "https://formspree.io/f/xanvgrry";

  // IMAGE/CROP STATES
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null); // Base64 data
  const [zoom, setZoom] = useState(1);
  const [rating, setRating] = useState(5);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const fileInputRef = useRef(null);

  // --- CROPPER/IMAGE LOGIC (NO CHANGE) ---

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
      setSubmitMessage({
        type: "success",
        text: "Image loaded. Please crop and apply.",
      });
    }
  };

  const getCroppedImg = async () => {
    if (!croppedAreaPixels) {
      setSubmitMessage({ type: "error", text: "Please crop the image first." });
      return;
    }

    try {
      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve) => (image.onload = resolve));

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const { x, y, width, height } = croppedAreaPixels;

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

      const base64 = canvas.toDataURL("image/jpeg", 0.9);
      setCroppedImage(base64); // Base64 data store
      setImageSrc(null);
      setImageDimensions({ width: 0, height: 0 });
      setSubmitMessage({
        type: "success",
        text: "Image Cropped and Applied. You can now submit your review.",
      });
    } catch (error) {
      console.error("Cropping Error:", error);
      setSubmitMessage({
        type: "error",
        text: "Image cropping failed. Try another image.",
      });
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCancel = () => {
    setImageSrc(null);
    setCroppedAreaPixels(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setImageDimensions({ width: 0, height: 0 });

    if (fileInputRef.current) fileInputRef.current.value = "";
    setSubmitMessage(null);
  };

  const getCropperContainerStyle = () => {
    const maxWidth = 310;
    const maxHeight = 310;

    if (imageDimensions.width === 0 || imageDimensions.height === 0) {
      return { width: `${maxWidth}px`, height: `${maxHeight}px` };
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

  // --- RATING LOGIC (NO CHANGE) ---

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const renderStars = () => {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      const difference = rating - i;
      let icon = faStar;
      let color = difference >= -0.5 ? "text-warning" : "text-secondary";

      if (difference < 0 && difference >= -0.5) {
        icon = faStarHalfStroke;
      }
      stars.push(<FontAwesomeIcon key={i} icon={icon} className={color} />);
    }
    return stars;
  };

  const renderStarsHtmlForEmail = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let starString = "★".repeat(fullStars); // Unicode Black Star
    if (halfStar) {
      starString += "½"; // Unicode Half Star
    }
    starString += "☆".repeat(emptyStars); // Unicode White Star

    return `${starString} (${rating.toFixed(1)} / 5.0)`;
  };

  // --- 🚀 FINAL SUBMISSION LOGIC (CLOUDINARY ADDED) ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Basic Validation
    if (!fullName || !country || !message || rating === 0) {
      setIsSubmitting(false);
      setSubmitMessage({
        type: "error",
        text: "Barahe karam saare zaroori fields bharein.",
      });
      return;
    }

    const base64Data = croppedImage;
    let finalImageUrl = "N/A";

    // 1. ☁️ CLOUDINARY UPLOAD LOGIC
    // Check karte hain ki Base64 data hai aur Cloudinary ki settings bhi hain
    if (
      base64Data &&
      base64Data !== "N/A" &&
      CLOUDINARY_CLOUD_NAME &&
      CLOUDINARY_UPLOAD_PRESET
    ) {
      try {
        const uploadFormData = new FormData();
        // Base64 data ko 'file' field mein daalte hain
        uploadFormData.append("file", base64Data);
        uploadFormData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: uploadFormData,
          }
        );

        if (!cloudinaryResponse.ok) {
          const errorData = await cloudinaryResponse.json();
          throw new Error(
            `Cloudinary Upload Failed: ${errorData.error.message}`
          );
        }

        const cloudinaryResult = await cloudinaryResponse.json();
        // CLEAN AND SHORT URL MIL GAYA!
        finalImageUrl = cloudinaryResult.secure_url;
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        setSubmitMessage({
          type: "error",
          text: `Image upload mein ghalti hui. Review sirf text mein bheja jaayega.`,
        });
        // Agar fail hua, toh ek message finalImageUrl mein store kar dete hain
        finalImageUrl = "Image upload failed. See console for details.";
      }
    } else if (base64Data && base64Data !== "N/A") {
      // Agar Base64 data hai lekin Cloudinary ki settings adhoori hain
      finalImageUrl =
        "⚠️ Cloudinary setup incomplete or failed. Base64 data below (long and may be blocked):";
    }

    // 2. FORMSPREE SUBMISSION LOGIC
    const formData = {
      // Subject
      _subject: `New Client Review from ${fullName} (Rating: ${rating.toFixed(
        1
      )})`,

      // The 4 required fields for email listing
      "Full Name": fullName,
      "Your Country": country,
      Rating: renderStarsHtmlForEmail(),
      Message: message,

      // Image Link (Chota URL ya Error Message)
      "Profile Picture Link": finalImageUrl,

      // Fallback: Agar Image upload fail ho ya settings adhoori hon, toh Base64 data bhej dete hain
      ...(finalImageUrl.includes("failed") ||
      finalImageUrl.includes("Cloudinary setup incomplete")
        ? { "Fallback Image Data (Large)": base64Data }
        : {}),
    };

    // 3. FETCH AND RETRY LOGIC (NO CHANGE)

    try {
      let response;
      const maxRetries = 3;

      for (let i = 0; i < maxRetries; i++) {
        response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          break;
        }

        if (i < maxRetries - 1) {
          const delay = Math.pow(2, i) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      if (response && response.ok) {
        setSubmitMessage({
          type: "success",
          text: "Aapka Review Safaltapoorvak Bhej Diya Gaya Hai! Shukriya.",
        });
        // Reset form fields
        setFullName("");
        setCountry("");
        setMessage("");
        setRating(5);
        setCroppedImage(null);
      } else if (response) {
        const result = await response.json();
        setSubmitMessage({
          type: "error",
          text: `Bhejne mein ghalti hui. Error: ${
            result.error || "Unknown Error"
          }. Please check Formspree.`,
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: "Network mein koi masla hai. Please dobara koshish karein.",
        });
      }
    } catch (error) {
      console.error("Submission Network Error:", error);
      setSubmitMessage({
        type: "error",
        text: "Network mein koi masla hai. Please dobara koshish karein.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 🖼️ JSX RENDER (NO CHANGE) ---

  return (
    <>
      {submitMessage && (
        <div
          className={`message-box ${submitMessage.type}`}
          style={{
            backgroundColor:
              submitMessage.type === "success" ? "#060121" : "#060121",
            color: submitMessage.type === "success" ? "green" : "red",
            border: submitMessage.type === "success" ? "2px solid green" : "2px solid red",
          }}
        >
          <div className="message-box-center-part">
            {submitMessage.type === "success" ? (
              <IoMdPhotos className="sm-heading" />
            ) : (
              <IoMdPhotos className="sm-heading" />
            )}
            <p className="normal-text">{submitMessage.text}</p>
          </div>
          <button onClick={() => setSubmitMessage(null)} className="message-box-close-btn normal-heading">
            &times;
          </button>
        </div>
      )}

      {/* GradientText component jaisa aapka hai */}
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={true}
        className="custom-class"
      >
        Client Reviews
      </GradientText>

      <form onSubmit={handleSubmit} className="submit-review">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={true}
          className="custom-class"
        >
          Submit Review
        </GradientText>
        <div className="form-group-upload-pic">
          <label className="profile-label themed-text">Profile Picture</label>

          <div className="profile-wrapper">
            <div className="avatar-container">
              {croppedImage ? (
                <img src={croppedImage} alt="Profile" className="profile-img" />
              ) : (
                <div className="placeholder themed-text">+</div>
              )}

              <label htmlFor="fileInput" className="camera-icon">
                <IoMdPhotos className="normal-heading" />
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

              <button
                type="button"
                onClick={getCroppedImg}
                className="btn-save normal-text"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-cancel normal-text"
              >
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
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder=" "
          />
          <label className="themed-text lg-text" htmlFor="country">
            Your Country
          </label>
        </div>

        <label className="ratting-label themed-text">
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
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder=" "
          ></textarea>
          <label className="themed-text lg-text" htmlFor="meassage">
            Message
          </label>
        </div>
        {/* Submit Button (Bootstrap classes removed) */}
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          <ShinyButtonText
            text={isSubmitting ? "Sending..." : "Submit Review"}
            speed={2.5}
          />
        </button>
      </form>
    </>
  );
}

export default ClientReviews;
