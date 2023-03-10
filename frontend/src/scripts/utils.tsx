import {useEffect, useState} from 'react';
import {JobType} from "../constants/types";
import {useSetRecoilState} from "recoil";
import {authAtom} from "../constants/atoms";

export const classNames = (...classes: (string)[]) => {
    return classes.filter(Boolean).join(' ')
}

const getWindowDimensions = ():{width:number, height:number} => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export const useWindowDimensions = ():{width:number, height:number} => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export const getDarkerColor = (color: string): string => {
    // Convert the hexadecimal color string to RGB values
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate the darker color by subtracting 20% from each RGB value
    const darkerR = Math.floor(r * 0.5);
    const darkerG = Math.floor(g * 0.5);
    const darkerB = Math.floor(b * 0.5);

    // Convert the darker RGB values back to a hexadecimal color string
    return `#${darkerR.toString(16)}${darkerG.toString(16)}${darkerB.toString(16)}`;
}

export const getAccessToken = (): string|null => {
    return localStorage.getItem('accessToken');
}

export const setAccessToken = (token:string) => {
    localStorage.setItem('accessToken', token);
}

export const getRefreshToken = (): string|null => {
    return sessionStorage.getItem('refreshToken');
}

export const setRefreshToken = (token:string) => {
    sessionStorage.setItem('refreshToken', token);
}

export const getJobTypesString = (types: JobType[]): string => {
    let result = "";
    types.forEach(type => {
        result += type + ', '
    })
    return result.substring(0, result.length-2);
}

export const handleLogout = () => {
    sessionStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    setAuthenticated(false)
    // it is important to setAuth after to refresh components
    // only when the code above is executed
    const setAuth = useSetRecoilState(authAtom);
    setAuth({ isAuthenticated: false });
};

export const setAuthenticated = (value:boolean) => {
    localStorage.setItem('isAuthenticated', String(value).toLowerCase());
}
