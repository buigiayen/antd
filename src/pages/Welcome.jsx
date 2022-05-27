import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Card, Form, Input, Select } from 'antd';
import { useState } from 'react';
import { GETBucket, GETFileBucket } from '../services/ant-design-pro/api';

const Welcome = () => {
  const { Option } = Select;
  const [Bucket, SetBucket] = useState();
  const [IP, SetIP] = useState([]);
  const [form] = Form.useForm();
  const [ListFileBucket, setListFileBucket] = useState();
  const GetBucket = async () => {
    let data = [];
    data = await GETBucket();
    SetIP(data.data.data);
  };
  const GetFileBucket = async () => {
    let data = [];
    data = await GETFileBucket(Bucket);
    console.log(data.data.data);
    setListFileBucket(data.data);
  };
  const onFinish = (values) => {
    console.log('Finish:', values);
  };
  const handleChange = (value) => {
    SetBucket(value);
    console.log(`selected ${value}`);
  };
  const columns = [
    {
      title: 'Hiển thị',
      dataIndex: 'File',
    },
    {
      title: 'Thao tác',
      dataIndex: 'Action',
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
          <Form.Item label={'IP'}>
            <Input value={IP} size="small" />
          </Form.Item>

          <Form.Item label={'Bucket'}>
            <Select style={{ width: 120 }} onChange={handleChange}>
              {IP.map((rs, index) => {
                return (
                  <Option key={index} value={rs.bucketName}>
                    {rs.bucketName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button size="small" onClick={GetBucket}>
              GET IP
            </Button>
          </Form.Item>
          <Form.Item>
            <Button size="small" onClick={GetFileBucket}>
              Lấy dữ liệu
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Form.Item>
        <ProTable
          rowKey="key"
          search={{
            labelWidth: 120,
          }}
          request={async (params) => {
            {
              return ListFileBucket;
            }
          }}
          columns={columns}
          size="small"
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
      </Form.Item>
    </PageContainer>
  );
};

export default Welcome;
