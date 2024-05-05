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
import './style.css'

function InfoUser() {
  const _id = getCookie("id");
  const [info, setInfo] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [mess, contextHolder] = message.useMessage();

  const fetchApi = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/detail-user",
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
        "http://localhost:5000/api/detail-user",
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

  return (
    <>
      {/* <div className="container">
        <div className="button-container">
          <button onClick={handleLogout}>Logout</button>
        </div>

        {info && (
          <div className="user-info-card">
            <h2>Thông tin</h2>

            <form id="userForm">
              <div className="form-group">
                <label for="fullname">Họ và tên:</label>
                <input type="text" id="fullname" name="fullname" />
              </div>

              <div className="form-group">
                <label for="username">Tên đăng nhập:</label>
                <input type="text" id="username" name="username" />
              </div>

              <div className="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" />
              </div>

              <div className="form-group">
                <label for="address">Địa chỉ:</label>
                <input type="text" id="address" name="address" />
              </div>

              <div className="form-group">
                <label for="history">Lịch sử truy cập:</label>
                <textarea id="history" name="history" rows="10" disabled></textarea>
              </div>

              <div className="form-actions">
                <button type="button" id="editButton" onClick={handleEdit}>
                  Chỉnh sửa
                </button>
                <button type="button" id="cancelButton" disabled={!isEdit} onClick={handleCancel}>
                  Hủy
                </button>
                <button type="submit" id="saveButton" disabled={!isEdit} onClick={handleFinish}>
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        )}
      </div> */}
      {contextHolder}
        <Button onClick={handleLogout} className="button-logout">Logout</Button>
        {info && (
          <Card
            title="Thông tin"
            extra={
              !isEdit ? (
                <Button onClick={handleEdit}>Chỉnh sửa</Button>
              ) : (
                <Button onClick={handleCancel}>Hủy</Button>
              )
            }
            style={{backgroundColor: 'transparent'}}
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
                  <Form.Item label="Họ và tên" name="fullname" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tên đăng nhập" name="username" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name="email" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Địa chỉ" name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Lịch sử truy cập" name="history">
                    <TextArea rows={16} disabled={true}/>
                  </Form.Item>
                </Col>
                {isEdit && (
                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Cập nhật
                      </Button>
                      <Button onClick={handleCancel} className="ml-10">
                        Hủy
                      </Button>
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Form>
          </Card>
        )}
    </>
  );
}

export default InfoUser;