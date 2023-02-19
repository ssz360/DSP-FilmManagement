import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardSideMenuComponent from "../../components/dashboardSideMenu/dashboardSideMenu.component";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Films } from "../../open_api_models/Films";
import ImageUploading from "react-images-uploading";
import "./addFilm.page.css";
import React from "react";

function AddFilmPage() {
  const [title, setTitle] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [watchDate, setWatchDate] = useState("2022-12-16");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);

  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const api = new Films();
  function onSubmit(e: Event) {
    e.preventDefault();

    api
      .createNewFilm(
        {
          favorite,
          isPrivate,
          rating: +rating,
          title,
          watchDate,
          medias: images.map((x: any) => {
            return { data: x.data_url, name: x.file.name };
          }),
        },
        { credentials: "include" }
      )
      .then((film) => {
        setFavorite(false);
        setImages([]);
        setIsPrivate(false);
        setWatchDate("2022-12-16");
        setRating(0);
        setTitle("");
      });
  }

  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);
  };

  return (
    <Container>
      <Row>
        <Col lg="4">
          <DashboardSideMenuComponent></DashboardSideMenuComponent>
        </Col>
        <Col lg="8">
          <h2>Add a new Film:</h2>
          <Form className="text-left" onSubmit={(e) => onSubmit(e as any)}>
            <Form.Group className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="The title of the film"
                onChange={(e) => setTitle(e.target.value as any)}
                value={title}
              />
              <Form.Text className="text-muted">
                Enter the name of the film
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating:</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={10}
                onChange={(e) => setRating(e.target.value as any)}
                value={rating}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Watched Date:</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setWatchDate(e.target.value as any)}
                value={watchDate as any}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Private"
                onChange={(e) => setIsPrivate(e.target.checked)}
                value={isPrivate as any}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Favorite"
                onChange={(e) => setFavorite(e.target.checked)}
                value={favorite as any}
              />
            </Form.Group>

            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <Row>
                    {imageList.map((image, index) => (
                      <Col>
                        <div key={index} className="image-item">
                          <img
                            src={image["data_url"]}
                            alt=""
                            className="film-img"
                          />
                          <div className="image-item__btn-wrapper">
                            <Button
                              variant="success"
                              onClick={() => onImageUpdate(index)}
                            >
                              Update
                            </Button>
                            <Button
                              variant="warning"
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <div className="two-btn-wrapper">
                    <Button
                      variant="primary"
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </Button>
                    &nbsp;
                    <Button variant="danger" onClick={onImageRemoveAll}>
                      Remove all images
                    </Button>
                  </div>
                </div>
              )}
            </ImageUploading>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddFilmPage;
