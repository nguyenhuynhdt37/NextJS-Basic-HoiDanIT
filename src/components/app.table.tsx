import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CreateModal from "./create.modal";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
import Link from "next/link";
interface IProps {
  blogs: IBlogs[];
}
function AppTable({ blogs }: IProps) {
  blogs = blogs.sort((a: IBlogs, b: IBlogs) => b.id - a.id);
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [blog, setBlog] = useState<IBlogs | undefined>();
  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`http://localhost:8000/blogs/${id}`);
      console.log(res);
      toast.success("Done");
      mutate("http://localhost:8000/blogs");
    } catch (e) {
      toast.error("Error");
      console.log(e);
    }
  };
  return (
    <div className="">
      <div className="d-flex pb-2 justify-content-between">
        <div className="text-2xl">Table Blogs</div>
        <Button className="" onClick={() => setShow(true)}>
          Add new
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td className="d-flex align-items-center">
                <Link href={`/blogs/${blog.id}`} className="btn btn-primary">
                  View
                </Link>
                <Button
                  variant="warning"
                  className="mx-3"
                  onClick={() => {
                    setBlog(blog);
                    setShow2(true);
                  }}
                >
                  Edit
                </Button>

                <Button variant="danger" onClick={() => handleDelete(blog.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {show && (
        <CreateModal show={show} setShow={setShow} dataUpdate={undefined} />
      )}
      {show2 && (
        <CreateModal show={show2} setShow={setShow2} dataUpdate={blog} />
      )}
    </div>
  );
}

export default AppTable;
