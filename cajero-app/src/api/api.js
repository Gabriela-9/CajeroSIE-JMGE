import axios from 'axios';
import { ip_api } from '../utils/constants';

export const api= axios.create({
    baseURL: ip_api,
    headers:{
        'Content.Type': 'application/json',
        'accept': 'application/json'
    }
})