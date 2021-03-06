import React, { Component, Fragment } from "react";
import "../../css/admin/Item.css";

// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

// Redux
import { connect } from "react-redux";
import {
  editItem,
  deleteItem,
  uploadItemImage,
} from "../../redux/actions/dataActions";

class Item extends Component {
  state = {
    name: "",
    desc: "",
    price: "",
    itemId: "",
    open: false,
  };

  mapPropsToState = (data) => {
    this.setState({
      name: data.name,
      desc: data.desc,
      price: data.price,
      itemId: data.itemId,
    });
  };

  componentDidMount() {
    const { item } = this.props;
    this.mapPropsToState(item);
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const newData = {
      name: this.state.name,
      desc: this.state.desc,
      price: this.state.price,
    };
    e.preventDefault();
    this.props.editItem(newData, this.state.itemId);
    this.handleClose();
  };

  handleDelete = () => {
    this.props.deleteItem(this.state.itemId);
    this.handleClose();
  };

  handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    console.log(formData);
    this.props.uploadItemImage(formData, this.state.itemId);
  };

  handleImageInput = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  render() {
    const { item } = this.props;

    let isImageUploaded = item.imageUploaded ? (
      <p className="image-yes">Image Uploaded</p>
    ) : (
      <p className="image-no">No Image Found</p>
    );

    return (
      <Fragment>
        <div onClick={this.handleOpen} className="admin-item-wrapper">
          <div className="content-one">
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
          </div>
          <div className="content-two">
            <h3 className="price-tag">Rs. {item.price}/-</h3>
            <div className="image-upload-check">{isImageUploaded}</div>
          </div>
        </div>
        <Dialog
          className="create-item-form-dialog"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
        >
          <DialogContent>
            <h3>Edit {item.name}</h3>
            <div className="image-container">
              <img className="item-image" src={item.imageUrl} alt="main" />
              <div className="update-img-div">
                <div className="upload-check-edit">{isImageUploaded}</div>
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                <Button
                  onClick={this.handleImageInput}
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  Update Image
                </Button>
              </div>
            </div>
            <form autoComplete="off" className="create-item-form">
              <label htmlFor="name">Name</label>
              <input
                placeholder="Name of the Item"
                className="text-form"
                onChange={this.handleChange}
                type="text"
                name="name"
                id="item-name"
                value={this.state.name}
              />
              <label htmlFor="desc">Description</label>
              <input
                placeholder="Item Description"
                className="text-form"
                onChange={this.handleChange}
                type="text"
                name="desc"
                id="task-desc"
                value={this.state.desc}
              />
              <label htmlFor="desc">Price</label>
              <input
                placeholder="Item Price"
                className="text-form"
                onChange={this.handleChange}
                type="text"
                name="price"
                id="task-price"
                value={this.state.price}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleDelete}
            >
              Delete Item
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Update Item
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(null, { editItem, deleteItem, uploadItemImage })(Item);
