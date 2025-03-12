// Types
import type { Photo } from "pexels";

// Components
import ExternalIcon from "../../icons/External";

// Styles
import { DetailsContainer, AvgColorContainer, AvgColor } from "./styles";
import { ExternalLink } from "../../pages/styles";

interface PhotoDetailsProps {
  details: Photo;
}

const PhotoDetails = ({ details }: PhotoDetailsProps) => {
  const { alt, avg_color, src, photographer, photographer_url, url } = details;
  return (
    <DetailsContainer>
      <img src={src.large} alt={alt || ""} />
      <p>🖼️ {alt || "No description"}</p>
      <p>
        📸 taken by{" "}
        {photographer && photographer_url ? (
          <ExternalLink href={photographer_url} target="_blank">
            {photographer}
            <ExternalIcon />
          </ExternalLink>
        ) : (
          `${photographer || "Unknow author"}`
        )}
      </p>
      {avg_color && (
        <AvgColorContainer>
          🎨 Average color of the picture:
          <AvgColor color={avg_color} />
        </AvgColorContainer>
      )}
      <p>
        <ExternalLink href={url} target="_blank">
          Show on Pexels
          <ExternalIcon />
        </ExternalLink>
      </p>
    </DetailsContainer>
  );
};

export default PhotoDetails;
