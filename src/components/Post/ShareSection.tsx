import React from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

type Props = {
  id: string;
  picUrl: string;
};

const ShareSection = ({ id, picUrl }) => {
  const shareUrl = `${process.env.NEXTAUTH_URL}/posturl/${id}`;

  return (
    <div className="flex gap-2 h-12 px-2">
      <FacebookShareButton
        title="Pet Feed 🐶"
        url={shareUrl}
        className="hover:scale-125 transition duration-150 ease-in-out"
      >
        <FacebookIcon size={30} round={true} />
      </FacebookShareButton>
      <WhatsappShareButton
        title="Pet Feed 🐶"
        url={shareUrl}
        separator=" | "
        className="hover:scale-125 transition duration-150 ease-in-out"
      >
        <WhatsappIcon size={30} round={true} />
      </WhatsappShareButton>
      <TwitterShareButton
        title="Pet Feed 🐶"
        url={shareUrl}
        className="hover:scale-125 transition duration-150 ease-in-out"
      >
        <TwitterIcon size={30} round={true} />
      </TwitterShareButton>
      <RedditShareButton
        title="Pet Feed 🐶"
        url={shareUrl}
        className="hover:scale-125 transition duration-150 ease-in-out"
      >
        <RedditIcon size={30} round={true} />
      </RedditShareButton>
      <TelegramShareButton
        title="Pet Feed 🐶"
        url={shareUrl}
        className="hover:scale-125 transition duration-150 ease-in-out"
      >
        <TelegramIcon size={30} round={true} />
      </TelegramShareButton>
      <PinterestShareButton
        title="Pet Feed 🐶"
        url={shareUrl}
        media={picUrl}
        className="hover:scale-125 transition duration-150 ease-in-out"
      >
        <PinterestIcon size={30} round={true} />
      </PinterestShareButton>
      <EmailShareButton
        title="Pet Feed 🐶"
        url={shareUrl}
        className="hover:scale-125 transition duration-150 ease-in-out"
      >
        <EmailIcon size={30} round={true} />
      </EmailShareButton>
    </div>
  );
};

export default ShareSection;
