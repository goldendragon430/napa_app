import React from 'react';
import {SvgXml} from 'react-native-svg';

type PolkadotIconProps = {
  bgColor?: string;
  iconColor?: string;
};

export const PolkadotIcon = ({bgColor, iconColor}: PolkadotIconProps) => {
  const xml = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="24" fill=${bgColor ? bgColor : '#192020'}/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.0004 17.977C26.1418 17.977 27.8777 16.9748 27.8777 15.7385C27.8777 14.5022 26.1418 13.5 24.0004 13.5C21.8591 13.5 20.1231 14.5022 20.1231 15.7385C20.1231 16.9748 21.8591 17.977 24.0004 17.977ZM33.2961 25.0555C34.3746 25.6737 34.381 27.6671 33.3103 29.5079C32.2396 31.3488 30.4974 32.34 29.4188 31.7218C28.3403 31.1037 28.334 29.1103 29.4046 27.2694C30.4753 25.4286 32.2176 24.4374 33.2961 25.0555ZM27.8777 32.6053C27.8777 33.8416 26.1418 34.8438 24.0004 34.8438C21.8591 34.8438 20.1231 33.8416 20.1231 32.6053C20.1231 31.369 21.8591 30.3668 24.0004 30.3668C26.1418 30.3668 27.8777 31.369 27.8777 32.6053ZM18.5816 16.6224C19.6608 17.241 19.6678 19.2347 18.5971 21.0756C17.5264 22.9165 15.7835 23.9073 14.7042 23.2888C13.6249 22.6702 13.618 20.6764 14.6887 18.8356C15.7594 16.9947 17.5023 16.0038 18.5816 16.6224ZM18.5821 31.7214C19.6613 31.1028 19.6683 29.1091 18.5976 27.2682C17.5269 25.4274 15.784 24.4365 14.7048 25.0551C13.6255 25.6736 13.6185 27.6674 14.6892 29.5082C15.7599 31.3491 17.5028 32.3399 18.5821 31.7214ZM33.3113 18.8368C34.3821 20.6777 34.3757 22.6711 33.2971 23.2892C32.2186 23.9073 30.4763 22.9162 29.4056 21.0753C28.3349 19.2345 28.3412 17.2411 29.4198 16.6229C30.4983 16.0048 32.2406 16.996 33.3113 18.8368Z" fill=${
    iconColor ? iconColor : 'white'
  }/>
</svg>
`;
  return <SvgXml xml={xml} />;
};