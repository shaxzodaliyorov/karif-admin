type VideoPlayerProps = {
  url?: string;
};

export const VideoPlayer = ({ url }: VideoPlayerProps) => {
  if (!url) {
    return <p className="text-red-500">Invalid video URL</p>;
  }

  return (
    <div className="w-full h-full">
      <video
        src={url}
        controls
        autoPlay
        muted
        className="w-full h-full object-contain bg-black rounded-md"
      />
    </div>
  );
};
