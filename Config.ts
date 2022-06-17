import axios from "axios";
import { Platform } from "react-native";

export const API_URL = Platform.OS==='android' ? 'http://10.0.2.2:3000' : 'http://127.0.0.1:3000';

export const BASE_URL = 'https://api.chec.io/v1';
