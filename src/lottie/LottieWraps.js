import {forwardRef} from 'react'
import Lottie from "lottie-react";
import bankRaw from "./raw/lottie-bank.json";
import gameRaw from "./raw/lottie-play.json";
import communityRaw from "./raw/lottie-profile.json";

export const BankAnimation = forwardRef(function(props, ref) {
  return <Lottie lottieRef={ref} animationData={bankRaw} {...props} />;
});

export const GameAnimation = forwardRef(function(props, ref) {
  return <Lottie lottieRef={ref} animationData={gameRaw} {...props} />;
});

export const CommunityAnimation = forwardRef(function(props, ref) {
  return <Lottie lottieRef={ref} animationData={communityRaw} {...props} />;
});