"use client";

import { BASE_URL } from "./config";

export const isLoggedIn = () => {
    if(localStorage.authToken) {
        return true;
    } else {
        return false;
    }
}

export const getUserDetails = () => {
    fetch(`${BASE_URL}/accounts/profile`, {
        headers: {
            "Authorization": `Token ${localStorage.authToken}`,
        }
    })
        .then(res => res.json())
        .then(res => {
            return res;
        });
}