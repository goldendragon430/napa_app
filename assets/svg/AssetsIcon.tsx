import React from 'react';
import { verticalScale } from 'react-native-size-matters';
import { Svg, Path, Circle } from 'react-native-svg';

export const AssestsIcon = () => {
    return (
        <Svg width={verticalScale(20)} height={verticalScale(15)} viewBox="0 0 20 20" fill="none">
            <Circle cx="10" cy="10" r="10" fill="white" />
            <Path d="M13.2821 14.4141V9.49507C13.2821 9.12587 13.2496 8.82726 13.1847 8.59923C13.1305 8.36034 13.0276 8.17574 12.8759 8.04543C12.7351 7.90427 12.5347 7.80654 12.2748 7.75225C12.0256 7.69796 11.7061 7.67081 11.3161 7.67081H8.68389C8.30477 7.67081 7.98522 7.69796 7.72525 7.75225C7.47611 7.80654 7.27572 7.90427 7.12407 8.04543C6.97242 8.17574 6.86409 8.36034 6.7991 8.59923C6.74494 8.82726 6.71786 9.12587 6.71786 9.49507V14.4141H4.29688V9.41363C4.29688 8.70781 4.36187 8.11059 4.49185 7.62194C4.63267 7.1333 4.86556 6.74239 5.19053 6.4492C5.51549 6.14516 5.94878 5.92799 6.49038 5.79768C7.03199 5.65652 7.709 5.58594 8.52141 5.58594H11.4623C12.2856 5.58594 12.968 5.65652 13.5096 5.79768C14.0512 5.92799 14.4845 6.14516 14.8095 6.4492C15.1344 6.74239 15.3619 7.1333 15.4919 7.62194C15.6327 8.11059 15.7031 8.70781 15.7031 9.41363V14.4141H13.2821Z" fill="#1B3F41" />
        </Svg>

    );
};




