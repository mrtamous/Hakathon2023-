import { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import MiniCard from "../miniCard";
import Modal from "../modal";
import { useFetch, useLocalStorage } from "../../hooks";
import { Endpoints } from "./../../data";
import InputSvg from "../SVG/InputSvg";

export default function ModalAdd({ isOpen, closeModal, handleAdd }) {
  const [formData, setFormData] = useState({ post: "", image: "" });
  const { getData } = useLocalStorage();
  const { fetchData, response, error, setError, loading } = useFetch(
    Endpoints.posts.addNewPost(),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getData("user").accessToken}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjQwOWM4ZDdjMDM0YmEyMWJmODFjZTczIn0sImV4cCI6MTY4MDk4MTU3OCwiaWF0IjoxNjc4Mzg5NTc4fQ.L__A_37aOfQ49A5poEJTDd2yy6d9rVZyHQRxqL4rDpQ`,
      },
      body: JSON.stringify({ text: formData.post, image: formData.image }),
    }
  );
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name == "image") {
      setFormData({ ...formData, image: event.target.files[0] });
      return;
    }
    setFormData({ ...formData, post: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.post.trim()) {
      setError("Field is reuqired!");
      return;
    }
    fetchData();
  };

  useEffect(() => {
    if (response?.status == "success") {
      // handleAdd(formData.post, formData.image);
      closeModal();
    }
  }, [response]);

  useEffect(() => {
    if (response?.status == "success") {
      const addedObj = {
        text: formData.post,
        _id: new Date().getMilliseconds(),
        user: {
          _id: new Date().getDate(),
          email: getData("user").data.email,
          name: getData("user").data.name,
        },
      };
      handleAdd(addedObj);
      closeModal();
    }
  }, [response]);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div>
        <h3 className="text-lg font-bold mb-4">Add Post</h3>
      </div>
      <div className="mb-8">
        <MiniCard className="!py-2 mb-3 hover:border-blue border-none">
          <div className="flex justify-center items-start flex-row-reverse">
            <form onSubmit={handleSubmit}>
              <textarea
                id="message"
                rows="4"
                name="post"
                value={formData.post}
                onChange={(e) => handleChange(e)}
                className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-5"></textarea>
              <div>
                {formData.image === "" ? (
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center">
                    <h2>Upload your image</h2>
                    <div>
                      <InputSvg />
                    </div>
                    <h2>Drage and drop or browse to choose a file</h2>
                  </label>
                ) : (
                  <div className=" w-52 h-52 overflow-hidden rounded-full shadow-lg cursor-pointer">
                    <img
                      src={window.URL.createObjectURL(formData.image)}
                      alt="selected file"
                      onClick={() => setFormData({ post: "", image: "" })}
                    />
                  </div>
                )}
              </div>
              <div className=" hidden">
                <Input
                  type="file"
                  name="image"
                  handleChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex mt-5 gap-2 justify-between">
                <Button
                  className="w-full bg-white border text-black"
                  type="button"
                  onClick={closeModal}>
                  Cancel
                </Button>
                <Button className="w-full">
                  {loading ? "Loading.." : "Add"}
                </Button>
              </div>
              {error && (
                <small className="text-xs text-red-700 text-center">
                  {error}
                </small>
              )}
            </form>
          </div>
        </MiniCard>
      </div>
    </Modal>
  );
}
