import axios from "axios";
import { TelegramInfos } from "../components/telegram/TelegramInfo";
//import telegramInfo from '../config/telegramInfo.json';

export namespace TelegramAPIs {
    export async function sendMessage(
        message: string,
        telegramInfo: TelegramInfos
    ) {
        await axios.get(
            `https://api.telegram.org/bot${telegramInfo.token}/sendMessage?chat_id=${telegramInfo.chatId}&text=${message}`
        );
    }
}
