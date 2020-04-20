import {_apiBase} from "./configuration";

export const getPost = () => {
        const token = localStorage.token;
        if (token) {
            return fetch(`${_apiBase}/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json());
        }
};


export class PostService {
    constructor(){
        this._apiBase = _apiBase;
    }

    getPosts = async (url) => {
        const _url = url.replace(this._apiBase, '');
        const token = localStorage.token;
        const res = await fetch(this._apiBase + _url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
            }

        });

        if(!res.ok){
            throw new Error(`Could not fetch ${url} status ${res.status}`);
        }

        return await res.json();
    };

    onLikeRequest = async (url) => {
        const _url = url.replace(this._apiBase, '');
        const token = localStorage.token;

        const res = await fetch(this._apiBase + _url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok){
            throw new Error(`could not fetch ${url} status ${res.status}`)
        }

        return await res.json();
    }
}