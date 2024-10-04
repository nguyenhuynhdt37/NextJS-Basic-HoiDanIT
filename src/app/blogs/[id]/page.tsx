"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import useSWR, { Fetcher } from "swr";

const Blog = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log("check", id);

  const fetcher: Fetcher<IBlogs, string> = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${id}`,
    fetcher
  );
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <>
      <Link href={"/blogs"}>Go Back</Link>
      <Card style={{ width: "100%" }}>
        <Card.Header>Featured</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Title: {data?.title}</ListGroup.Item>
          <ListGroup.Item>author: {data?.author}</ListGroup.Item>
          <ListGroup.Item>Content: {data?.content}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default Blog;
