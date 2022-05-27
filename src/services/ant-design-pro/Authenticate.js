import React, { useEffect } from "react";
import { history } from 'umi';

export default function Authenticate() {
    useEffect(() => {
        history.push(redirect || '/');
    }, [localStorage.getItem('Token')])
}