import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { resultType } from "../../types/types";

interface Props {
    items: resultType[];
}

const ResultTable = ({ items }: Props) => {
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "symbol", headerName: "Symbol", width: 350 },
        // {
        //     field: "slowK",
        //     headerName: "slow %K",
        //     description: "slow k",
        //     sortable: false,
        //     width: 200,
        // },
    ];

    return (
        <div
            style={{
                height: 600,
                width: "100%",
                marginRight: "10px",
                marginLeft: "10px",
            }}
        >
            {/* <div>Result Table</div> */}
            <DataGrid
                rows={items}
                columns={columns}
                pageSize={100}
                checkboxSelection
                disableSelectionOnClick
                //style={{ borderColor: "#2b6777", borderWidth: "1px" , }}
            />
        </div>
    );
};

export default ResultTable;
