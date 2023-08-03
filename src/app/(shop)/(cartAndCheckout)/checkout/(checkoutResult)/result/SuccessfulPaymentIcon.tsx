'use client';

import {useLottie} from "lottie-react";
import verifiedIcon from '../../../../../../../public/icons/verified.json';

export default function SuccessfulPaymentIcon() {
    const {View} = useLottie({animationData: verifiedIcon, loop: false});

    return <>{View}</>;
}