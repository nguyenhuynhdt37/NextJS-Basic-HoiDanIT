"use client";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import { mutate } from "swr";
interface IProps {
  show: boolean;
  setShow: (value: boolean) => void;
  dataUpdate: IDataUpdate | undefined;
}
interface IDataUpdate extends IData {
  id: number;
}
interface IData {
  title: string;
  author: string;
  content: string;
}
function CreateModal({ show, setShow, dataUpdate }: IProps) {
  console.log(dataUpdate);

  const [data, setData] = useState<IData>({
    title: dataUpdate?.title || "",
    author: dataUpdate?.author || "",
    content: dataUpdate?.content || "",
  });
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/blogs", data);
      console.log(res);
      setData({ title: "", author: "", content: "" });
      toast.success("Done");
      setShow(false);
      mutate("http://localhost:8000/blogs");
    } catch (e) {
      toast.error("Error");
      console.log(e);
    }
  };
  const handleClouse = () => {
    setData({ title: "", author: "", content: "" });
    setShow(false);
  };
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/blogs/${dataUpdate.id}`,
        data
      );
      console.log(res);
      setData({ title: "", author: "", content: "" });
      toast.success("Done");
      setShow(false);
      mutate("http://localhost:8000/blogs");
    } catch (e) {
      toast.error("Error");
      console.log(e);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClouse}
        backdrop="static"
        keyboard={false}
      >
        <ToastContainer />

        <Modal.Header closeButton>
          <Modal.Title>
            {dataUpdate ? "Add new form" : "Update form"}
          </Modal.Title>
        </Modal.Header>
        <Form className="px-3">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder=""
              onChange={handleOnchange}
              value={data.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              placeholder=""
              onChange={handleOnchange}
              value={data.author}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              rows={3}
              onChange={handleOnchange}
              value={data.content}
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClouse}>
            Close
          </Button>
          {!dataUpdate ? (
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          ) : (
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
