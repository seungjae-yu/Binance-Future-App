import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Tooltip,
} from "@material-ui/core";
import { CloudDownload, CloudUpload } from "@material-ui/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { conditionItem } from "../../modules/condition";
import { movingAvgItem } from "../../modules/movingAvg";
import { SearchListItem } from "../../modules/searchList";
import SaveSearchListTable from "../table/SaveSearchListTable";

interface Props {
    list: (movingAvgItem | conditionItem)[];
    addListItem(
        list: (movingAvgItem | conditionItem)[],
        itemName: string
    ): void;
    importItem(items: SearchListItem[]): any;
    importType: "스토캐스틱" | "이동평균선";
}

const SaveSearchListDialog = ({
    list,
    addListItem,
    importItem,
    importType,
}: Props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    const { searchListItems } = useSelector(
        (state: RootState) => state.searchListRedurcer
    );

    const onClickSaveList = () => {
        const itemName = window.prompt("저장할 이름을 입력해주세요.") || "";
        console.log(itemName);
        if (itemName) {
            addListItem(list, itemName);
            alert(itemName + " 항목이 저장되었습니다.");
        }
    };

    const handleClickOpen = () => {
        setSelectedItem(undefined);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleImport = () => {
        setOpenDialog(false);
        if (selectedItem) {
            importItem(selectedItem);
        }
    };

    return (
        <Grid
            container
            spacing={2}
            style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "5px",
                marginBottom: "5px",
            }}
        >
            <Tooltip title="저장하기" placement="top" arrow>
                <IconButton onClick={onClickSaveList}>
                    <CloudUpload fontSize={"large"} />
                </IconButton>
            </Tooltip>

            <Tooltip title="가져오기" placement="top" arrow>
                <IconButton onClick={handleClickOpen}>
                    <CloudDownload fontSize={"large"} />
                </IconButton>
            </Tooltip>

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"저장된 리스트를 불러옵니다."}
                </DialogTitle>
                <DialogContent>
                    <SaveSearchListTable
                        items={searchListItems.filter(
                            (item) => item.type === importType
                        )}
                        isRemove={false}
                        onRemove={() => {}}
                        setSelectedItem={setSelectedItem}
                    />
                    <DialogContentText id="alert-dialog-description">
                        {/* {selectedItem
                            ? JSON.stringify(selectedItem)
                            : "선택해주세요"} */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleImport}
                        variant="contained"
                        color="primary"
                        autoFocus
                    >
                        가져오기
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default SaveSearchListDialog;
