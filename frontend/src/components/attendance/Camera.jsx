import { useEffect, useRef } from "react";

function Camera({ onFrameCapture }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error(err);
      }
    };
    startCamera();

    const interval = setInterval(() => {
      captureFrame();
    }, 1000);

    return () => {
      clearInterval(interval);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);
  const captureFrame = () => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(videoRef.current, 0, 0);

    canvas.toBlob((blob) => {
      if (blob && onFrameCapture) {
        onFrameCapture(blob);
      }
    }, "image/jpeg");
  };
  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded-xl w-full border"
      ></video>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </>
  );
}

export default Camera;
