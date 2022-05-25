import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Form, Select } from 'antd';
import { useIntl } from 'umi';
const Welcome = () => {
  const onjec = [
    {
      Key: 1,
      Object: 'Value 1',
    },
    {
      Key: 2,
      Object: 'Value 2',
    },
  ];
  const intl = useIntl();
  const Option = Select;
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };
  return (
    <PageContainer>
      <Card>
        <Form.Item name="note" label="Note">
          <Select
            size="small"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {onjec.map((values, index) => {
              return (
                <Option key={index} value={values.Key}>
                  {values.Object}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <br />
        <Button size="small">Ok</Button>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
