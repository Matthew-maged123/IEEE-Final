import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faChartLine,
  faCircleExclamation,
  faTriangleExclamation,
  faArrowLeft,
  faRightLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
  faAward,
  faBookmark,
  faRobot,
  faCalendarDays,
  faCheck,
  faCircleCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faClock,
  faMugHot,
  faCompass,
  faCopy,
  faMicrochip,
  faDownload,
  faUpRightFromSquare,
  faEye,
  faEyeSlash,
  faFeatherPointed,
  faFile,
  faFileLines,
  faCircleQuestion,
  faImage,
  faKey,
  faLayerGroup,
  faLock,
  faRightFromBracket,
  faRightToBracket,
  faEnvelope,
  faLocationDot,
  faBars,
  faComment,
  faCommentDots,
  faBoxOpen,
  faPalette,
  faPhone,
  faPhoneVolume,
  faPrint,
  faArrowsRotate,
  faRotateLeft,
  faRotateRight,
  faMagnifyingGlass,
  faPaperPlane,
  faShield,
  faShieldHalved,
  faShirt,
  faPlus,
  faBox,
  faMobileScreenButton,
  faWandMagicSparkles,
  faTag,
  faBullseye,
  faTrashCan,
  faTruckFast,
  faUpload,
  faCloudArrowUp,
  faUser,
  faUserPlus,
  faUsers,
  faXmark,
  faCircleXmark,
  faBolt,
  faSpinner,
  faCircleNotch,
  faCircleInfo,
  faBagShopping,
  faStar,
  faSpa,
  faScissors,
  faGift,
  faPaintbrush,
  faCopyright,
  faCrown,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faGoogle, faApple, faFacebook } from '@fortawesome/free-brands-svg-icons';

export interface IconProps extends React.HTMLAttributes<SVGSVGElement> {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}

export function createIcon(iconDef: IconDefinition, displayName: string) {
  const Component = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className = '', size, color, strokeWidth: _strokeWidth, style, ...props }, ref) => {
      const dynamicStyle: React.CSSProperties = { ...style };
      if (color) dynamicStyle.color = color;
      if (size) {
        const sizeVal = typeof size === 'number' ? `${size}px` : size;
        dynamicStyle.width = sizeVal;
        dynamicStyle.height = sizeVal;
      }

      return (
        <FontAwesomeIcon
          ref={ref as any}
          icon={iconDef}
          className={className}
          style={dynamicStyle as any}
          {...(props as any)}
        />
      );
    }
  );

  Component.displayName = displayName;
  return Component;
}

// Free Font Awesome Icon Components
export const Activity = createIcon(faChartLine, 'Activity');
export const AlertCircle = createIcon(faCircleExclamation, 'AlertCircle');
export const AlertTriangle = createIcon(faTriangleExclamation, 'AlertTriangle');
export const ArrowLeft = createIcon(faArrowLeft, 'ArrowLeft');
export const ArrowLeftRight = createIcon(faRightLeft, 'ArrowLeftRight');
export const ArrowRight = createIcon(faArrowRight, 'ArrowRight');
export const ArrowUpRight = createIcon(faArrowUpRightFromSquare, 'ArrowUpRight');
export const Award = createIcon(faAward, 'Award');
export const BookmarkPlus = createIcon(faBookmark, 'BookmarkPlus');
export const Bot = createIcon(faRobot, 'Bot');
export const Calendar = createIcon(faCalendarDays, 'Calendar');
export const Check = createIcon(faCheck, 'Check');
export const CheckCircle2 = createIcon(faCircleCheck, 'CheckCircle2');
export const ChevronDown = createIcon(faChevronDown, 'ChevronDown');
export const ChevronLeft = createIcon(faChevronLeft, 'ChevronLeft');
export const ChevronRight = createIcon(faChevronRight, 'ChevronRight');
export const Clock = createIcon(faClock, 'Clock');
export const Coffee = createIcon(faMugHot, 'Coffee');
export const Compass = createIcon(faCompass, 'Compass');
export const Copy = createIcon(faCopy, 'Copy');
export const Cpu = createIcon(faMicrochip, 'Cpu');
export const Download = createIcon(faDownload, 'Download');
export const ExternalLink = createIcon(faUpRightFromSquare, 'ExternalLink');
export const Eye = createIcon(faEye, 'Eye');
export const EyeSlash = createIcon(faEyeSlash, 'EyeSlash');
export const Feather = createIcon(faFeatherPointed, 'Feather');
export const File = createIcon(faFile, 'File');
export const FileText = createIcon(faFileLines, 'FileText');
export const HelpCircle = createIcon(faCircleQuestion, 'HelpCircle');
export const Image = createIcon(faImage, 'Image');
export const KeyRound = createIcon(faKey, 'KeyRound');
export const Layers = createIcon(faLayerGroup, 'Layers');
export const Lock = createIcon(faLock, 'Lock');
export const LogIn = createIcon(faRightToBracket, 'LogIn');
export const LogOut = createIcon(faRightFromBracket, 'LogOut');
export const Mail = createIcon(faEnvelope, 'Mail');
export const MapPin = createIcon(faLocationDot, 'MapPin');
export const Menu = createIcon(faBars, 'Menu');
export const MessageCircle = createIcon(faComment, 'MessageCircle');
export const MessageSquare = createIcon(faCommentDots, 'MessageSquare');
export const Package = createIcon(faBox, 'Package');
export const PackageCheck = createIcon(faBoxOpen, 'PackageCheck');
export const Plus = createIcon(faPlus, 'Plus');
export const Palette = createIcon(faPalette, 'Palette');
export const Phone = createIcon(faPhone, 'Phone');
export const PhoneCall = createIcon(faPhoneVolume, 'PhoneCall');
export const Printer = createIcon(faPrint, 'Printer');
export const RefreshCw = createIcon(faArrowsRotate, 'RefreshCw');
export const RotateCcw = createIcon(faRotateLeft, 'RotateCcw');
export const RotateCw = createIcon(faRotateRight, 'RotateCw');
export const Search = createIcon(faMagnifyingGlass, 'Search');
export const Send = createIcon(faPaperPlane, 'Send');
export const ShieldAlert = createIcon(faShield, 'ShieldAlert');
export const ShieldCheck = createIcon(faShieldHalved, 'ShieldCheck');
export const Shirt = createIcon(faShirt, 'Shirt');
export const Smartphone = createIcon(faMobileScreenButton, 'Smartphone');
export const Sparkles = createIcon(faWandMagicSparkles, 'Sparkles');
export const Tag = createIcon(faTag, 'Tag');
export const Target = createIcon(faBullseye, 'Target');
export const Trash2 = createIcon(faTrashCan, 'Trash2');
export const Truck = createIcon(faTruckFast, 'Truck');
export const Upload = createIcon(faUpload, 'Upload');
export const UploadCloud = createIcon(faCloudArrowUp, 'UploadCloud');
export const User = createIcon(faUser, 'User');
export const UserPlus = createIcon(faUserPlus, 'UserPlus');
export const Users = createIcon(faUsers, 'Users');
export const X = createIcon(faXmark, 'X');
export const XCircle = createIcon(faCircleXmark, 'XCircle');
export const Zap = createIcon(faBolt, 'Zap');
export const ShoppingBag = createIcon(faBagShopping, 'ShoppingBag');

// Additional Font Awesome utility icons
export const Spinner = createIcon(faSpinner, 'Spinner');
export const CircleNotch = createIcon(faCircleNotch, 'CircleNotch');
export const Info = createIcon(faCircleInfo, 'Info');
export const WhatsApp = createIcon(faWhatsapp, 'WhatsApp');
export const Google = createIcon(faGoogle, 'Google');
export const Apple = createIcon(faApple, 'Apple');
export const Facebook = createIcon(faFacebook, 'Facebook');
export const Star = createIcon(faStar, 'Star');
export const Flower = createIcon(faSpa, 'Flower');
export const Scissors = createIcon(faScissors, 'Scissors');
export const Gift = createIcon(faGift, 'Gift');
export const Paintbrush = createIcon(faPaintbrush, 'Paintbrush');
export const Copyright = createIcon(faCopyright, 'Copyright');
export const Crown = createIcon(faCrown, 'Crown');
export const Sun = createIcon(faSun, 'Sun');
export const Moon = createIcon(faMoon, 'Moon');

// Re-export FontAwesome core tools and icon definitions for direct usage
export { FontAwesomeIcon };
export {
  faChartLine,
  faCircleExclamation,
  faTriangleExclamation,
  faArrowLeft,
  faRightLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
  faAward,
  faBookmark,
  faRobot,
  faCalendarDays,
  faCheck,
  faCircleCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faClock,
  faMugHot,
  faCompass,
  faCopy,
  faMicrochip,
  faDownload,
  faUpRightFromSquare,
  faEye,
  faEyeSlash,
  faFeatherPointed,
  faFile,
  faFileLines,
  faCircleQuestion,
  faImage,
  faKey,
  faLayerGroup,
  faLock,
  faRightFromBracket,
  faRightToBracket,
  faEnvelope,
  faLocationDot,
  faBars,
  faComment,
  faCommentDots,
  faBoxOpen,
  faPalette,
  faPhone,
  faPhoneVolume,
  faPrint,
  faArrowsRotate,
  faRotateLeft,
  faRotateRight,
  faMagnifyingGlass,
  faPaperPlane,
  faShield,
  faShieldHalved,
  faShirt,
  faPlus,
  faBox,
  faMobileScreenButton,
  faWandMagicSparkles,
  faTag,
  faBullseye,
  faTrashCan,
  faTruckFast,
  faUpload,
  faCloudArrowUp,
  faUser,
  faUserPlus,
  faUsers,
  faXmark,
  faCircleXmark,
  faBolt,
  faBagShopping,
  faStar,
  faSpa,
  faScissors,
  faGift,
  faPaintbrush,
  faCopyright,
  faCrown,
  faSun,
  faMoon,
  faWhatsapp,
  faGoogle,
  faApple,
  faFacebook,
};
