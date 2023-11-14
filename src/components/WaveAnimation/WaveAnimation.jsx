import React from 'react';
import Wave from 'react-wavify'

const WaveAnimation = () => {
    return (
        <Wave
            mask="url(#mask)"
            fill="#1277b0"
            options={{
                height: 8,
                amplitude: 10,
                speed: 0.25,
                points: 3
            }}
        >
            <defs>
                <linearGradient id="gradient" gradientTransform="rotate(90)">
                    <stop offset="0" stopColor="white" />
                    <stop offset="0.5" stopColor="black" />
                </linearGradient>
                <mask id="mask">
                    <rect x="0" y="0" width="2000" height="250" fill="url(#gradient)" />
                </mask>
            </defs>
        </Wave>
    );
}

export default WaveAnimation;
