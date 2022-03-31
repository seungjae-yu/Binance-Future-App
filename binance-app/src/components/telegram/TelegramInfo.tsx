import { Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";

export interface TelegramInfo {
    token: string;
    chatId: string;
}

const TelegramInfo = () => {
    const [token, setToken] = useState<string>();
    const [chatId, setChatId] = useState<string>();

    useEffect(() => {
        const telegramInfo = localStorage.getItem("telegramInfo");
        if (telegramInfo) {
            const telegramInfoJson: TelegramInfo = JSON.parse(telegramInfo);
            setToken(telegramInfoJson.token);
            setChatId(telegramInfoJson.chatId);
        }
    }, []);

    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.currentTarget.id;
        const value = e.currentTarget.value;
        switch (id) {
            case "token": {
                setToken(value);
                break;
            }
            case "chatId": {
                setChatId(value);
                break;
            }
        }
    };

    const onSaveTelegramInfo = () => {
        if (token && chatId) {
            const telegramInfo: TelegramInfo = {
                token: token,
                chatId: chatId,
            };
            localStorage.setItem("telegramInfo", JSON.stringify(telegramInfo));
            alert("저장이 완료되었습니다.");
        } else {
            alert("정보를 모두 입력해주세요.");
        }
    };

    return (
        <div>
            <div style={{ margin: "20px" }}>
                <TextField
                    id={"token"}
                    label={"Telegram Token"}
                    variant={"standard"}
                    style={{ width: "500px" }}
                    value={token}
                    onChange={onChangeText}
                />
            </div>
            <div style={{ margin: "20px" }}>
                <TextField
                    id={"chatId"}
                    label={"Telegram Chat Id"}
                    variant={"standard"}
                    style={{ width: "500px" }}
                    value={chatId}
                    onChange={onChangeText}
                />

                <Button
                    id={"saveInfo"}
                    color={"primary"}
                    variant={"outlined"}
                    onClick={onSaveTelegramInfo}
                >
                    저장
                </Button>
            </div>
        </div>
    );
};

export default TelegramInfo;
