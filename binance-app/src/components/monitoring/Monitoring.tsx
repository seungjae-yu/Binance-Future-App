import { Button, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";

const Monitoring = () => {
    let running: boolean = false;

    const { conditionItems } = useSelector(
        (state: RootState) => state.conditionReducer
    );

    const saveConditionInfo = () => {
        const result = window.confirm("테이블의 정보를 저장하시겠습니까?");
        if (result) {
            localStorage.setItem(
                "conditionItems",
                JSON.stringify(conditionItems)
            );
            alert("정보를 저장했습니다.");
        }
    };

    const onClickMonitoringStart = () => {
        const result = window.confirm("모니터링을 시작하시겠습니까?");
        if (result) {
            saveConditionInfo();
            if (running) {
                alert("이미 동작중인 작업이 존재합니다.");
                return;
            }
            running = true;
            const timer = setInterval(() => {
                if (running === false) {
                    clearInterval(timer);
                    return;
                }
                alert("ㅎㅇ" + running);
            }, 3000);
        }
    };

    const onClickMonitoringStop = () => {
        const result = window.confirm("모니터링을 중지하시겠습니까?");
        if (result) {
            if (!running) {
                alert("동작중인 모니터링 작업이 존재하지 않습니다.");
                return;
            }
            running = false;
            alert("모니터링이 종료되었습니다.");
        }
    };

    return (
        <div style={{ marginRight: "10px" }}>
            <Grid
                container
                spacing={2}
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                }}
            >
                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{ background: "#DDD1C7" }}
                        onClick={saveConditionInfo}
                    >
                        정보 저장
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{ background: "#DDD1C7" }}
                        onClick={onClickMonitoringStart}
                    >
                        모니터링 시작
                    </Button>
                </Grid>

                <Grid item>
                    <Button
                        size="large"
                        variant="contained"
                        style={{ background: "#DDD1C7" }}
                        onClick={onClickMonitoringStop}
                    >
                        모니터링 중지
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Monitoring;
