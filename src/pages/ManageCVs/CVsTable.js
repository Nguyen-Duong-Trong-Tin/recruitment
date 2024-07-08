import { useEffect, useState } from "react";
import { deleteCV, getCVs } from "../../services/CVsServices";
import { getCookie } from "../../helpers/cookies";
import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import { getJobs } from "../../services/jobsServices";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function CVsTable() {
  const [data, setData] = useState([]);
  const idCompany = getCookie("id");

  const [reload, setReload] = useState(false);
  const handleReload = () => {
    setReload(!reload);
  }

  useEffect(() => {
    const fetchApi = async () => {
      const resultCVs = await getCVs(`?idCompany=${idCompany}`);
      const resultJobs = await getJobs();

      setData(resultCVs.map(item => {
        const resultSearch = resultJobs.find(itemJob => itemJob.id === item.idJob);

        return (
          {
            ...item,
            name: resultSearch ? resultSearch.name : "NOT FOUND THIS JOB"
          }
        )
      }));
    }
    fetchApi();
  }, [reload]);

  const confirm = async (id) => {
    const result = await deleteCV(id);

    if (result) {
      message.success('Deleted the CV');
      handleReload();
    }
  };
  const cancel = () => {
    message.error('Click on No');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Full name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Sent',
      dataIndex: 'sent',
      key: 'sent',
    },
    {
      title: 'Status read',
      dataIndex: 'statusRead',
      key: 'statusRead',
      render: (statusRead) => (
        <>
          {statusRead ? (
            <Tag color="green">Read</Tag>
          ) : (
            <Tag color="red">Unread</Tag>
          )}
        </>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Space direction="vertical">
            <Link to={`CVDetail/${record.id}`}>
              <Button>
                <FaEye />
              </Button>
            </Link>

            <Popconfirm
              title="Delete the job"
              description="Are you sure to delete this job?"
              onConfirm={() => confirm(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>
                <MdDeleteOutline />
              </Button>
            </Popconfirm>
          </Space>
        </>
      )
    }
  ]

  return (
    <>
      <div className="cvs-table">
        <h1 className="cvs-table__title">List Of CVs</h1>
        <Table columns={columns} dataSource={data} />;
      </div>
    </>
  )
}

export default CVsTable;