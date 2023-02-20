import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Reviews } from "../../open_api_models/Reviews";
import {
  MqttReviewModel,
  ReviewModel,
  UserModel,
} from "../../open_api_models/data-contracts";

import "./review.component.css";
import { getGlobalUser } from "../../global/variables.global";
import { MosquitoService } from "../../services/mosquito.service";
import toast, { Toaster } from "react-hot-toast";

let mqttSrv: MosquitoService;

function ReviewFilmComponent(props: any) {
  const [comments, setComments] = useState<ReviewModel[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [reviewDate, setReviewDate] = useState("2022-12-16");
  const [review, setReview] = useState<string>("");
  const [user, setUser] = useState<UserModel>();
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewModel>();
  const [editMode, setEditMode] = useState<boolean>();

  const api = new Reviews();

  useEffect(() => {
    if (!mqttSrv) {
      mqttSrv = new MosquitoService(onNewMqttMessage);
      mqttSrv.subscribe(`film/${props.filmId}/review`);
    }

    getReviews();
    setUser(getGlobalUser());

    return () => {
      mqttSrv.client.end();
      mqttSrv = null as any;
    };
  }, []);

  async function getReviews() {
    const reviews = (
      await api.getReviewByFilmId(props.filmId as any, {
        credentials: "include",
      })
    ).data;
    setComments(reviews);

    reviews.forEach((el) => {
      mqttSrv?.subscribe(`review/${el.id}/+`);
    });
  }
  function onSubmit(e: Event) {
    e.preventDefault();

    api
      .submitNewReview(
        {
          completed: true,
          rating: +rating,
          review,
          reviewDate,
          filmId: +props.filmId,
        },
        { credentials: "include" }
      )
      .then((film) => {
        resetFields();
      });
  }

  function resetFields() {
    setRating(0);
    setReview("");
    setReviewDate("2022-12-16");
    setEditMode(false);
  }
  function showModalHandler(review: ReviewModel) {
    setShowModal(true);
    setSelectedReview(review);
  }
  const handleClose = () => setShowModal(false);

  async function reviewDeleteHandler(rId: any) {
    await api.deleteReview(rId, { credentials: "include" });
    // getReviews();
    setShowModal(false);
  }

  function selectedForEdit(review: ReviewModel) {
    setSelectedReview(review);

    setRating(review.rating as any);
    setReview(review.review as any);
    setReviewDate(
      new Date(review.reviewDate as any).toISOString().slice(0, 10)
    );
    setEditMode(true);
  }

  async function editHandler() {
    await api.updateReview(
      selectedReview?.id as any,
      {
        completed: true,
        rating,
        review,
        reviewDate,
      },
      { credentials: "include" }
    );
    resetFields();
    // getReviews();
  }

  const onNewMqttMessage = (channel: string, message: any) => {
    if (channel === `film/${props.filmId}/review`) {
      setComments((comments) => {
        const result: MqttReviewModel = JSON.parse(message.toString());

        const review: ReviewModel = comments.find((x) => x.id === result.id);
        if (result.status === "updated") {
          review.rating = result.rating;
          review.review = result.review;
          review.reviewDate = result.reviewDate;
        } else if (result.status === "created") {
          if (!review) {
            comments.push(result);
          }
        } else if (result.status === "deleted") {
          const index = comments.indexOf(review);
          comments.splice(index, 1);
        }

        return [...comments];
      });
    } else if (channel.startsWith("review/")) {
      console.log(channel);
      const messageId = channel.split("/")[1];
      const changed = channel.split("/")[2];
      const result: { old: string; new: string } = JSON.parse(
        message.toString()
      );

      toast.success(
        <div>
          <div>Review Changed:</div>
          <div>Review ID: {messageId}</div>
          <div>
            Changed From: {result.old} to {result.new}
          </div>
        </div>,
        {
          duration: 7000,
        }
      );
    }
  };

  return (
    <Container className="review-section">
      {comments.map((comment) => {
        return (
          <Row key={comment.id} className="comment">
            <Col lg={3}>
              <div>
                <span>
                  {new Date(comment.reviewDate as any).toDateString()}
                </span>
              </div>
              <hr></hr>
              <div>
                <span>Rating: </span>
                <span>{comment.rating}</span>
              </div>
            </Col>
            <Col lg={7}>
              <div className="text-left">
                <span>{comment.review}</span>
              </div>
            </Col>
            {comment.userId === user?.id ? (
              <Col lg={2}>
                <Row>
                  <Col>
                    <Button
                      onClick={() => selectedForEdit(comment)}
                      size="sm"
                      variant="warning"
                    >
                      Edit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => showModalHandler(comment)}
                      size="sm"
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Col>
            ) : (
              <></>
            )}
          </Row>
        );
      })}
      <h3 id="#review">Add a new Review:</h3>
      <Form className="text-left" onSubmit={(e) => onSubmit(e as any)}>
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
          <Form.Label>Set Date:</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setReviewDate(e.target.value as any)}
            value={reviewDate as any}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>review:</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="The review text"
            onChange={(e) => setReview(e.target.value as any)}
            value={review}
          />
          <Form.Text className="text-muted">
            Enter your opinion about the film
          </Form.Text>
        </Form.Group>

        <div className="text-center">
          {editMode ? (
            <>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  resetFields();
                }}
                variant="danger"
                type="submit"
              >
                Cancel
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  editHandler();
                }}
                variant="success"
                type="submit"
              >
                Edit
              </Button>
            </>
          ) : (
            <Button variant="primary" type="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
      {/* *************** modal ************** */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the Comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="warning"
            onClick={() => reviewDeleteHandler(selectedReview?.id as any)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* *************************** toast ***************************** */}
      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
}

export default ReviewFilmComponent;
