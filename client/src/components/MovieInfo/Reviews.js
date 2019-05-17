import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import uuid from "uuid";

class Reviews extends Component {
  render() {
    const reviews = this.props.reviewData.results;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ExpansionPanel
              key={uuid()}
              className={classes.expPanel}
              square={true}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Review {index + 1}
                </Typography>
                <Typography
                  style={{
                    marginLeft: "33.33%"
                  }}
                  color="secondary"
                >
                  {" "}
                  <i style={{ fontSize: 10 }}>by: {review.author}</i>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <pre style={{ whiteSpace: "pre-wrap", color: "white" }}>
                  {review.content}
                </pre>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))
        ) : (
          <Typography
            align="center"
            color="inherit"
            style={{ paddingTop: 20, paddingBottom: 20 }}
          >
            {" "}
            No reviews{" "}
          </Typography>
        )}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: "4px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

Reviews.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Reviews);
