import axios from "axios";
import telegramInfo from '../config/telegramInfo.json';

export namespace TelegramAPIs{
    export async function sendMessage(message : string) {
        await axios.get(`https://api.telegram.org/bot${telegramInfo.token}/sendMessage?chat_id=${telegramInfo.chat_id}&text=${message}`);
    }
}
