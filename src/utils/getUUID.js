//引入uuid
import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
    //先试着读取看本地存储中是否有uuid，如果没有我们就生成一个，然后存入本地存储
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    if (!uuid_token) {
        let uuid_token = uuidv4();
        localStorage.setItem("UUIDTOKEN", uuid_token)
    }
    return uuid_token;
}