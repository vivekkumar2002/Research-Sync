import { getJson } from "serpapi";
import ErrorHandler from "../middlewares/error.js";
import Logbook from "../models/logbookModel.js";
import jwt from "jsonwebtoken";

export const googleSearch = async (req, res, next) => {
  const query = req.query.q;
  try {
    const apiKey = process.env.GOOGLE_API_KEY;

    const params = {
      engine: "google_scholar",
      q: query,
      api_key: apiKey,
    };

    // Show result as JSON (async/await)
    const response1 = await getJson(params);

    if (!response1) {
      return next(new ErrorHandler("Data not found", 404));
    }

    res.status(200).json({
      data: response1,
    });
  } catch (error) {
    next(error);
  }
};

export const versionControl = async (req, res, next) => {
  try {
    console.log(req.params);
    const documentId = req.params.documentId;

    if (!documentId) {
      return next(new ErrorHandler("Data not found", 404));
    }

    const data = await Logbook.find({ document_id: documentId });

    res.status(200).json({
      mssg: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

//changed here
export const getData = async (req, res, next) => {
  try {
      // Connect to the database
      console.log("working here 1")
      await connectDB();
      console.log("working here 1")

      // Fetch documents from the collection
      const documents = await Document.find({}); // Assuming you want all documents. Adjust the query as needed.
      console.log("working here 1")

      console.log("working here 1")
      // Send the response with the data
      res.status(200).json({
          success: true,
          data: documents
      });

  } catch (error) {
      // Handle any errors that occur
      console.error('Error fetching data:', error);
      res.status(500).json({
          success: false,
          message: 'Error fetching data',
          error: error.message
      });
  }
};

