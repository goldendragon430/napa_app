import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';

export const MuteIcon = ({color}: any) => {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width=${moderateScale(
    18,
  )} height=${moderateScale(
    18,
  )} viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill=${color} stroke="none">
<path d="M102 5099 c-78 -39 -118 -133 -92 -215 10 -31 127 -154 603 -631 l592 -593 -56 0 c-82 0 -168 -18 -222 -48 -63 -34 -132 -109 -165 -180 l-27 -57 0 -815 0 -815 31 -65 c39 -83 101 -145 184 -184 l65 -31 468 -3 468 -3 895 -715 c492 -394 910 -722 929 -730 44 -18 87 -18 132 1 48 20 71 41 94 87 18 34 19 63 19 383 0 190 3 345 7 345 4 0 192 -184 418 -409 403 -402 411 -410 457 -416 87 -13 161 24 197 97 25 52 27 95 6 146 -22 52 -4793 4826 -4850 4853 -53 25 -100 24 -153 -2z"/>
<path d="M3774 5106 c-27 -12 -1584 -1245 -1641 -1300 l-23 -21 955 -955 955 -955 0 1553 c0 1504 -1 1554 -19 1590 -23 46 -46 67 -94 87 -44 18 -92 19 -133 1z"/>
</g>
</svg>
`;
  return <SvgXml xml={xml} />;
};
