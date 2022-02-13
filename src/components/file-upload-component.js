import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  Box,
  Typography,
  Button,
  ListItem,
  withStyles,
  ListItemText,
  Slider,
} from "@material-ui/core";
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import UploadFileService from "../service/upload-file-service";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

const useStyles = makeStyles({
  paper: {
    width: "80%",
    height: "1%",
  },
});

const letters = [
  {
    string: "a",
    label: "a",
    value: 97,
    scaledValue: "a",
  },
  {
    string: "b",
    label: "b",
    value: 98,
    scaledValue: "b",
  },
  {
    string: "c",
    label: "c",
    value: 99,
    scaledValue: "c",
  },
  {
    string: "d",
    label: "d",
    value: 100,
    scaledValue: "d",
  },
  {
    string: "e",
    label: "e",
    value: 101,
    scaledValue: "e",
  },
  {
    string: "f",
    label: "f",
    value: 102,
    scaledValue: "f",
  },
  {
    string: "g",
    label: "g",
    value: 103,
    scaledValue: "g",
  },
  {
    string: "h",
    label: "h",
    value: 104,
    scaledValue: "h",
  },
  {
    string: "i",
    label: "i",
    value: 105,
    scaledValue: "i",
  },
  {
    string: "j",
    label: "j",
    value: 106,
    scaledValue: "j",
  },
  {
    string: "k",
    label: "k",
    value: 107,
    scaledValue: "k",
  },
  {
    string: "l",
    label: "l",
    value: 108,
    scaledValue: "l",
  },
  {
    string: "m",
    label: "m",
    value: 109,
    scaledValue: "m",
  },
  {
    string: "n",
    label: "n",
    value: 110,
    scaledValue: "n",
  },
  {
    string: "o",
    label: "o",
    value: 111,
    scaledValue: "o",
  },
  {
    string: "p",
    label: "p",
    value: 112,
    scaledValue: "p",
  },
  {
    string: "q",
    label: "q",
    value: 113,
    scaledValue: "q",
  },
  {
    string: "r",
    label: "r",
    value: 114,
    scaledValue: "r",
  },
  {
    string: "s",
    label: "s",
    value: 115,
    scaledValue: "s",
  },
  {
    string: "t",
    label: "t",
    value: 116,
    scaledValue: "t",
  },
  {
    string: "u",
    label: "u",
    value: 117,
    scaledValue: "u",
  },
  {
    string: "v",
    label: "v",
    value: 118,
    scaledValue: "v",
  },
  {
    string: "w",
    label: "w",
    value: 119,
    scaledValue: "w",
  },
  {
    string: "x",
    label: "x",
    value: 120,
    scaledValue: "x",
  },
  {
    string: "y",
    label: "y",
    value: 121,
    scaledValue: "y",
  },
  {
    string: "z",
    label: "z",
    value: 122,
    scaledValue: "z",
  },
];

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      isError: false,
      fileInfos: [],
      results: [],
      ranges: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }
  checkMap(results) {
    console.log(results);
  }

  clearData() {
    UploadFileService.clearData().then((response) => {
      if (response.status === 200) {
        this.getData();
      }
    });
  }

  changeLimit = (event, newValue) => {
    UploadFileService.changeLimit(newValue).then((response) => {
      if (response.status === 200) {
        this.getData();
      }
    });
  };

  changeResultSetRange = (rangeIndex, val) => {
    UploadFileService.changeRange(rangeIndex, val[0], val[1]).then(
      (response) => {
        if (response.status === 200) {
          this.getData();
        }
      }
    );
  };

  getData() {
    this.getFileNames();
    this.getMaps();
    this.getRanges();
  }

  getRanges() {
    UploadFileService.getRanges().then((response) => {
      console.log(response.data);
      this.setState({
        ranges: response.data,
      });
    });
  }
  getFileNames() {
    UploadFileService.getFileNames().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  getMaps() {
    UploadFileService.getMaps().then((response) => {
      this.setState({
        results: response.data,
      });
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadFileService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
          isError: false,
        });
      })
      .then(() => {
        this.getFileNames();
      })
      .then(() => {
        this.getMaps();
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Nepavyko įkelti failo!",
          currentFile: undefined,
          isError: true,
        });
      });

    this.setState({
      selectedFiles: undefined,
      currentFile: undefined,
      progress: undefined,
    });
  }
  renderMap(map) {
    let words = [];

    for (let itemKey in Object.keys(map).map()) {
      words.push(
        <div key={itemKey}>
          <label>
            {itemKey} : {map[itemKey]}
          </label>
        </div>
      );
      return words;
    }
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
      results,
      isError,
      ranges,
    } = this.state;

    return (
      <div className="mg20">
        <Grid container xs={12}>
          <Grid item xs={6}>
            {currentFile && (
              <Box className="mb25" display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={progress}
                  />
                </Box>
                <Box minWidth={35}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >{`${progress}%`}</Typography>
                </Box>
              </Box>
            )}

            <label htmlFor="btn-upload">
              <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: "none" }}
                type="file"
                onChange={this.selectFile}
              />
              <Button
                className="btn-choose"
                variant="outlined"
                component="span"
              >
                Choose file
              </Button>
            </label>
            <div className="file-name">
              {selectedFiles && selectedFiles.length > 0
                ? selectedFiles[0].name
                : null}
            </div>
            <Button
              className="btn-upload"
              color="primary"
              variant="contained"
              component="span"
              disabled={!selectedFiles}
              onClick={this.upload}
            >
              Upload
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => this.clearData()}
            >
              Clear data
            </Button>
            <Box sx={{ m: 3 }} />
            <div>
              <Typography gutterBottom>Amount of top values</Typography>

              <Slider
                valueLabelDisplay="auto"
                onChangeCommitted={this.changeLimit}
                aria-label="custom thumb label"
                defaultValue={20}
              />
            </div>
            <div>
              <Typography gutterBottom>result set 1 from letter:</Typography>

              {(() => {
                if (ranges.length != 0) {
                  return (
                    <div>
                      <Slider
                        aria-label="Always visible"
                        marks={letters}
                        value={ranges[0]}

                        onChangeCommitted={(event, val) =>
                          this.changeResultSetRange(0, val)
                        }
                        valueLabelDisplay="auto"
                        disableSwap
                        min={97}
                        max={122}
                      />
                      <Slider
                        aria-label="Always visible"
                        marks={letters}
                        value={ranges[1]}

                        onChangeCommitted={(event, val) =>
                          this.changeResultSetRange(1, val)
                        }
                        valueLabelDisplay="auto"
                        disableSwap
                        min={97}
                        max={122}
                      />
                      <Slider
                        aria-label="Always visible"
                        marks={letters}
                        value={ranges[2]}

                        onChangeCommitted={(event, val) =>
                          this.changeResultSetRange(2, val)
                        }
                        valueLabelDisplay="auto"
                        disableSwap
                        min={97}
                        max={122}
                      />
                      <Slider
                        aria-label="Always visible"
                        marks={letters}
                        value={ranges[3]}

                        onChangeCommitted={(event, val) =>
                          this.changeResultSetRange(3, val)
                        }
                        valueLabelDisplay="auto"
                        disableSwap
                        min={97}
                        max={122}
                      />
                    </div>
                  );
                }
              })()}
            </div>
          </Grid>
        </Grid>
        <Typography
          variant="subtitle2"
          className={`upload-message ${isError ? "error" : ""}`}
        >
          {message}
        </Typography>

        <Typography variant="h6" className="list-header">
          Files uploaded
        </Typography>
        <ul className="list-group">
          {fileInfos &&
            fileInfos.map((file, index) => (
              <Paper elevation={3} className={useStyles.paper}>
                <ListItem divider key={index}>
                  <label>{file}</label>
                </ListItem>
              </Paper>
            ))}
        </ul>

        <Typography variant="h6" className="list-header">
          Results:
        </Typography>
        <ul className="list-group">
          {results &&
            results.map((map, mapIndex) => {
              return (
                <div>
                  <Typography variant="h6" className="list-header">
                    {mapIndex}
                  </Typography>
                  <Paper elevation={5} className={useStyles.paper}>
                    <ListItem divider key={mapIndex}>
                      <Grid container xs={12}>
                        {Object.keys(map).map((key) => (
                          <Grid item xs={2}>
                            <ListItem divider key={mapIndex}>
                              <ListItemText
                                primary={key}
                                secondary={map[key]}
                              />
                            </ListItem>
                          </Grid>
                        ))}
                      </Grid>
                    </ListItem>
                  </Paper>
                </div>
              );
            })}
        </ul>
      </div>
    );
  }
}
