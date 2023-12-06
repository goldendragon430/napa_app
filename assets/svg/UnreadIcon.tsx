import React from 'react';
import {SvgXml} from 'react-native-svg';
 
export const UnreadIcon = () => {
  const xml = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="6" cy="6" r="5" fill="#16E6EF" stroke="black" stroke-width="2"/>
  </svg>
  
`;
  return <SvgXml xml={xml} />;
};
