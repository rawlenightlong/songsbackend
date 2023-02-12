import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const DATABASE_URL=process.env.DATABASE_URL

mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

  // export connection
  export default mongoose