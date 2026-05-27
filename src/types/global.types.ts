export interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  webm?: string;
  mp4?: string;
  poster: string;
  alt: string;
  className?: string;
}

export interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}