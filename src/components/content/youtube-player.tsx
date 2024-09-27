"use client";

import ReactPlayer from "react-player/youtube";

export function YoutubePlayer({ url }: { url: string }) {
  return (
    <div className="aspect-[16/9]">
      <ReactPlayer url={url} controls={true} width={"100%"} height={"100%"} />
    </div>
  );
}
