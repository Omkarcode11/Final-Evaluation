import React, { useState, HTMLAttributes } from "react";
import { BASE_URL, CURRENT_URL } from "../../utils/constant";
import shareSVG from "./../../assets/share.svg";
import copiedSVG from "./../../assets/tick.svg";

type Props = HTMLAttributes<HTMLImageElement> & {
  id: string;
  showToast: () => void;
};

const CopyButton: React.FC<Props> = ({ id, showToast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    if (copied == false) {
      try {
        await navigator.clipboard.writeText(`${CURRENT_URL}/startQuiz/${id}`);
        setCopied(true);
        showToast();
        setTimeout(() => setCopied(false), 3000); // Reset after 2 seconds
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <img
      src={copied ? copiedSVG : shareSVG}
      onClick={handleCopyClick}
      alt="Copy to clipboard"
    />
  );
};

export default CopyButton;
