import {configureStore} from "@reduxjs/toolkit";
import book from "./slice/book.js";

export default configureStore({
  reducer: {
    book
  }
})