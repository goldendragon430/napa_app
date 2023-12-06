import React from 'react';
import {SvgXml} from 'react-native-svg';

export const NapaGreenIcon = () => {
  const xml = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3162 13.5V7.09225C12.3162 6.61132 12.2735 6.22233 12.188 5.92528C12.1168 5.61408 11.9815 5.37362 11.7821 5.20387C11.5969 5.01999 11.3333 4.89268 10.9915 4.82196C10.6638 4.75123 10.2436 4.71587 9.73077 4.71587H6.26923C5.77066 4.71587 5.35043 4.75123 5.00855 4.82196C4.68091 4.89268 4.41738 5.01999 4.21795 5.20387C4.01852 5.37362 3.87607 5.61408 3.7906 5.92528C3.71937 6.22233 3.68376 6.61132 3.68376 7.09225V13.5H0.5V6.98616C0.5 6.06673 0.58547 5.28875 0.75641 4.65221C0.941595 4.01568 1.24786 3.50646 1.67521 3.12454C2.10256 2.72848 2.67236 2.44557 3.38462 2.27583C4.09687 2.09194 4.98718 2 6.05556 2H9.92308C11.0057 2 11.9031 2.09194 12.6154 2.27583C13.3276 2.44557 13.8974 2.72848 14.3248 3.12454C14.7521 3.50646 15.0513 4.01568 15.2222 4.65221C15.4074 5.28875 15.5 6.06673 15.5 6.98616V13.5H12.3162Z" fill="#16E6EF"/>
</svg>

`;
  return <SvgXml xml={xml} />;
};
