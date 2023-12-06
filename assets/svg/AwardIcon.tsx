import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Svg, Path} from 'react-native-svg';

type AwardIconProps = {
  color?: string;
};

export const AwardIcon: React.FC<AwardIconProps> = ({color = 'white'}) => {
  return (
    <Svg
      width={moderateScale(20)}
      height={moderateScale(20)}
      viewBox="0 0 20 20"
      fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0001 12.5C13.2217 12.5 15.8334 9.88831 15.8334 6.66665C15.8334 3.44499 13.2217 0.833313 10.0001 0.833313C6.77842 0.833313 4.16675 3.44499 4.16675 6.66665C4.16675 9.88831 6.77842 12.5 10.0001 12.5Z"
        stroke={color}
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.00833 11.575L5 18.7501L10 16.6667L15 18.7501L13.9917 11.5667"
        stroke={color}
        stroke-width="1.4"
        stroke-linecap="square"
      />
    </Svg>
  );
};
