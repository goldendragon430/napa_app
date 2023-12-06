import React from 'react';
import {SvgXml} from 'react-native-svg';

export const FlashIcon = () => {
  const xml = `<svg
  width="20"
  height="28"
  viewBox="0 0 18 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M12.7815 15.6218L13.1933 15.0557L12.0611 14.2321L11.6494 14.7982L12.7815 15.6218ZM8.00342 21H7.30342V23.1522L8.56948 21.4118L8.00342 21ZM8.00342 14H8.70342V13.3H8.00342V14ZM2.00342 14L1.43735 13.5882L0.628585 14.7H2.00342V14ZM6.35949 9.20178L6.77127 8.63572L5.63913 7.81215L5.22735 8.37822L6.35949 9.20178ZM6.91241 6.05813L6.50054 6.62414L7.63256 7.44788L8.04443 6.88187L6.91241 6.05813ZM10.0034 3H10.7034V0.848312L9.43741 2.58813L10.0034 3ZM9.30342 9V9.7H10.7034V9H9.30342ZM11.0034 9.3H10.3034V10.7H11.0034V9.3ZM16.0034 10L16.5695 10.4117L17.3781 9.3H16.0034V10ZM13.3333 12.4813L12.9216 13.0474L14.0538 13.8708L14.4655 13.3047L13.3333 12.4813ZM11.6494 14.7982L7.43735 20.5882L8.56948 21.4118L12.7815 15.6218L11.6494 14.7982ZM8.70342 21V14H7.30342V21H8.70342ZM8.00342 13.3H2.00342V14.7H8.00342V13.3ZM2.56949 14.4118L6.35949 9.20178L5.22735 8.37822L1.43735 13.5882L2.56949 14.4118ZM8.04443 6.88187L10.5694 3.41187L9.43741 2.58813L6.91241 6.05813L8.04443 6.88187ZM9.30342 3V9H10.7034V3H9.30342ZM11.0034 10.7H16.0034V9.3H11.0034V10.7ZM15.4373 9.58828L13.3333 12.4813L14.4655 13.3047L16.5695 10.4117L15.4373 9.58828Z"
    fill="white"
  />
</svg>
`;
  return <SvgXml xml={xml} />;
};
