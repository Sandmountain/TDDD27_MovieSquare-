import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  Typography,
  Grid,
  Avatar,
  Icon,
  TextField
} from "@material-ui/core";
import uuid from "uuid";

import {
  getComments,
  addComment,
  newCommentLoading
} from "../../actions/commentActions";

class Comments extends Component {
  state = {
    commentText: ""
  };

  render() {
    const { comments, newComment } = this.props;

    if (newComment) {
      this.props.getComments(this.props.movieID);
    }

    return (
      <div style={styles.root}>
        <Grid container style={styles.commentFieldGrid}>
          <TextField
            id="standard-multiline-flexible"
            label="Comment"
            placeholder="Enter comment"
            value={this.state.commentText}
            onChange={this.handleChange}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                this.handleChange(e);
              }
            }}
            style={styles.textField}
            margin="normal"
          />
        </Grid>
        {typeof comments !== "undefined" && comments.length ? (
          <Grid container>
            {comments.map(comment => (
              <Grid item style={{ width: "100%" }} key={uuid()}>
                <Card square={true} style={styles.card} key={uuid()}>
                  <CardHeader
                    style={{ padding: 8 }}
                    avatar={
                      <Avatar style={{ width: "40px", height: "40px" }}>
                        <Icon>perm_identity</Icon>
                      </Avatar>
                    }
                    title={comment.userName}
                    subheader={<span>{comment.comment}</span>}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            align="center"
            color="inherit"
            style={{ paddingTop: 20, paddingBottom: 20 }}
          >
            No comments. Be the first one to comment this movie.
          </Typography>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.props.getComments(this.props.movieID);
  }

  handleChange = e => {
    this.setState({ commentText: e.target.value });

    if (e.keyCode === 13) {
      this.props.addComment(this.state.commentText, this.props.movieID);
      this.props.newCommentLoading();
      this.setState({ commentText: "" });
    }
  };
}

const styles = {
  root: {
    minWidth: "100%"
  },

  textField: {
    width: "100%",
    marginRight: 8,
    marginLeft: 8
  },
  commentFieldGrid: {
    marginTop: 4,
    backgroundColor: "#424242"
  }
};
Comments.propTypes = {
  getComments: PropTypes.func.isRequired,
  comments: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  newComment: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  comments: state.comment.comments.comments,
  loading: state.comment.loading,
  newComment: state.comment.newComment
});

export default connect(
  mapStateToProps,
  { getComments, addComment, newCommentLoading }
)(Comments);
