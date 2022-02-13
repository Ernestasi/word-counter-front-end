import Axios from "../config/axios-config";

class WordCounterService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return Axios.post("/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFileNames() {
    return Axios.get("/file-names");
  }

  getRanges() {
    return Axios.get("/ranges");
  }

  getLimit() {
    return Axios.get("/limit-value");
  }

  getMaps() {
    return Axios.get("/maps");
  }

  clearData() {
    return Axios.put("/clear-data");
  }

  changeLimit(value) {
    return Axios.get("/change-limit", {
      params: {
        limit: value,
      },
    });
  }

  changeRange(rangeIndex, min, max) {
    return Axios.get("/change-range", {
      params: {
        rangeIndex: rangeIndex,
        min: min,
        max: max
      },
    });
  }
}

export default new WordCounterService();
