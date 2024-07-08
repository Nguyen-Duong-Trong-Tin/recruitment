import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookies";
import { deleteJob, getJobs } from "../../services/jobsServices";
import { Button, message, Modal, Popconfirm, Space, Table, Tag } from "antd";
import { FaEye } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import EditJob from "./EditJob";

function JobsTable() {
  const [data, setData] = useState([]);
  const idCompany = getCookie("id");

  const [reload, setReload] = useState(false);
  const handleReload = () => {
    setReload(!reload);
  }

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getJobs(`?idCompany=${idCompany}`);
      setData(result);
    }
    fetchApi();
  }, [reload]);

  // Modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataModal, setDataModal] = useState();
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  // End Modal

  const confirm = async (id) => {
    const result = await deleteJob(id);

    if (result) {
      message.success('Deleted the job');
      handleReload();
    }
  };
  const cancel = () => {
    message.error('Click on No');
  };

  const columns = data.length > 0 && [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map(item => (
            <Tag color="geekblue">{item}</Tag>
          ))}
        </>
      )
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Create at',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <>
          {status ? (
            <Tag color="green">On</Tag>
          ) : (
            <Tag color="red">Off</Tag>
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
            <Link to={`/resultSearch/${record.id}`}>
              <Button>
                <FaEye />
              </Button>
            </Link>
            <Button onClick={() => {
              setDataModal(data.find(item => item.id === record.id));
              showModal();
            }}>
              <FaPen />
            </Button>
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
  ];

  return (
    <>
      <div className="jobs-table">
        <Modal
          title="Edit The Job"
          open={open}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[
            <Button onClick={handleCancel}>
              Cancel
            </Button>
          ]}
        >
          <EditJob
            dataModal={dataModal}
            setConfirmLoading={setConfirmLoading}
            setOpen={setOpen}
            handleReload={handleReload}
          />
        </Modal>
      </div>
      <div>
        <div>
          <Link to="createJob">
            <Button>Create a new job</Button>
          </Link>
        </div>
        <h1 className="jobs-table__title">List Of Jobs</h1>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default JobsTable;