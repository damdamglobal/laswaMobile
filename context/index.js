import React, { useState, useEffect } from "react";

import { AuthContextFile, AuthProviderFile } from "./AuthContext";
import { GeneralDatContextFile, GeneralDataProviderFile } from "./GeneralData";

import {
  ActivitiesHandleContextFile,
  ActivitiesHandleProviderFile,
} from "./ActivitiesHandleContext";

import {
  OnboardingScreenContextFile,
  OnboardingScreenProviderFile,
} from "./OnboardingScreenContext";
import {
  SplashscreenContextFile,
  SplashscreenProviderFile,
} from "./SplashscreenContext";
import {
  MainScreenContextFile,
  MainScreenProviderFile,
} from "./MainScreenContext";

export const AuthContext = AuthContextFile;
export const AuthProvider = AuthProviderFile;

export const GeneralDatContext = GeneralDatContextFile;
export const GeneralDataProvider = GeneralDataProviderFile;

export const ActivitiesHandleContext = ActivitiesHandleContextFile;
export const ActivitiesHandleProvider = ActivitiesHandleProviderFile;

export const OnboardingScreenContext = OnboardingScreenContextFile;
export const OnboardingScreenProvider = OnboardingScreenProviderFile;

export const SplashscreenContext = SplashscreenContextFile;
export const SplashscreenProvider = SplashscreenProviderFile;

export const MainScreenContext = MainScreenContextFile;
export const MainScreenProvider = MainScreenProviderFile;
