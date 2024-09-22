/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Slider,
  message,
} from "antd";
import { rules } from "./rule";
import { getCookie } from "../Login/cookie";
import { useEffect, useState } from "react";
const { TextArea } = Input;
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

function InfoUser() {
  const _id = getCookie("id");
  const [info, setInfo] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [mess, contextHolder] = message.useMessage();

  const fetchApi = async () => {
    try {
      const response = await axios.post(
        "https://coiboicuchay.azurewebsites.net/api/detail-user",
        {
          _id,
        }
      );
      if (response) {
        setInfo(response);
      }
    } catch (error) {
      console.error("Error fetchApi:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleFinish = async (values) => {
    try {
      const response = await axios.patch(
        "https://coiboicuchay.azurewebsites.net/api/detail-user",
        {
          _id,
          values,
        }
      );
      if (response) {
        mess.success("Cập nhật thành công!");
        fetchApi();
        setIsEdit(false);
      }
    } catch (error) {
      console.error("Error handleFinish:", error);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    form.resetFields();
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/logout");
  };

  console.log(info);

  return (
    <>
      <Helmet>
        <title>Thông Tin Người Dùng</title>
        <meta name="description" content="Xem và chỉnh sửa thông tin người dùng của bạn." />
      </Helmet>
      <main>
        {contextHolder}
          <Button onClick={handleLogout} style={{ backgroundColor: '#FAACA9', color: '#fff', margin: '30px 0px 30px 0px', fontSize: '15px', fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>Logout</Button>
          {info && (
            <Card
              style={{ borderColor: '#FAACA9', borderWidth: '2px', borderStyle: 'solid', backgroundColor: 'transparent' }}
              title={<span style={{ color: '#FAACA9', fontSize: '40px', fontFamily: 'Playfair Display, serif' }}>Thông tin</span>}
              extra={
                !isEdit ? (
                  <Button style={{ backgroundColor: '#FAACA9', color: '#fff', fontSize: '15px', fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }} onClick={handleEdit}>Chỉnh sửa</Button>
                ) : (
                  <Button style={{ backgroundColor: '#FAACA9', color: '#fff', fontSize: '15px', fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }} onClick={handleCancel}>Hủy</Button>
                )
              }
            >
              <Form
                layout="vertical"
                onFinish={handleFinish}
                initialValues={info.data}
                form={form}
                disabled={!isEdit}
              >
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item label={<span style={{ color: '#FAACA9', fontSize: '20px', fontFamily: 'Playfair Display, serif' }}>Họ và tên</span>} name="fullname" rules={rules}>
                      <Input style={{color: '#FAACA9', fontSize: '20px', fontFamily: 'Playfair Display, serif', borderColor: '#FAACA9', borderWidth: '2px', borderStyle: 'solid'}} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={<span style={{ color: '#FAACA9', fontSize: '20px', fontFamily: 'Playfair Display, serif' }}>Tên đăng nhập</span>} name="username" rules={rules}>
                      <Input style={{color: '#FAACA9', fontSize: '20px', fontFamily: 'Playfair Display, serif', borderColor: '#FAACA9', borderWidth: '2px', borderStyle: 'solid'}} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={<span style={{ color: '#FAACA9', fontSize: '20px', fontFamily: 'Playfair Display, serif' }}>Email</span>} name="email" rules={rules}>
                      <Input style={{color: '#FAACA9', fontSize: '20px', fontFamily: 'Playfair Display, serif', borderColor: '#FAACA9', borderWidth: '2px', borderStyle: 'solid'}} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={<span style={{ color: '#FAACA9', fontSize: '20px', fontFamily: 'Playfair Display, serif' }}>Địa chỉ</span>} name="address">
                      <Input style={{color: '#FAACA9', fontSize: '20px', fontFamily: 'Playfair Display, serif', borderColor: '#FAACA9', borderWidth: '2px', borderStyle: 'solid'}} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label={<span style={{ color: '#FAACA9', fontSize: '20px', fontFamily: 'Playfair Display, serif' }}>Lịch sử truy cập</span>} name="history">
                      <TextArea rows={16} disabled={true} style={{color: '#FAACA9', fontSize: '20px', fontFamily: 'Playfair Display, serif', borderColor: '#FAACA9', borderWidth: '2px', borderStyle: 'solid'}}/>
                    </Form.Item>
                  </Col>
                  {isEdit && (
                    <Col span={24}>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#FAACA9', color: '#fff', fontSize: '15px', fontFamily: 'Playfair Display, serif', fontWeight: 'bold', margin: '0px 30px 0px 0px' }}>
                          Cập nhật
                        </Button>
                        <Button onClick={handleCancel} style={{ backgroundColor: '#FAACA9', color: '#fff', fontSize: '15px', fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                          Hủy
                        </Button>
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              </Form>
            </Card>
          )}
      </main>
    </>
  );
}

export default InfoUser;