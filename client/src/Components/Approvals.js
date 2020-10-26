import React, { useEffect, useState } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import "./Approvals.css";
import { Button } from "reactstrap";
import axios from "axios";

export default function Approvals() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const homeId = JSON.parse(localStorage.getItem("userInfo"));

    axios({
      method: "get",
      url: "http://127.0.0.1:3000/api/pendingUsers/" + homeId.userHomeId,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("err::", err);
      });
  }, []);

  const approve = (e) => {
    axios({
      method: "get",
      url: "http://127.0.0.1:3000/api/approveUsers/" + e.row.email,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("err::", err);
      });
  };

  const decline = (e) => {
    axios({
      method: "get",
      url:
        "http://127.0.0.1:3000/api/declineUsers/" +
        e.row._original.userHomeId +
        "/" +
        e.row._original._id,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("err::", err);
      });
  };

  const columns = [
    {
      Header: "Name",
      accessor: "name", // String-based value accessors!
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Action",
      Cell: (props) => (
        <span className="number">
          {props.row._original.adminApproved === true ? (
            <div>
              <p>Approved</p>
            </div>
          ) : (
            <div>
              <Button className="action" onClick={() => approve(props)}>
                Approve
              </Button>
              <Button className="action" onClick={() => decline(props)}>
                Decline
              </Button>
            </div>
          )}
        </span>
      ),
    },
  ];

  return (
    <div className="approvals-wrapper">
      <ReactTable
        className="-striped"
        filterable
        minRows={8}
        data={userData}
        columns={columns}
      />
    </div>
  );
}
