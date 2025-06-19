import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
    try {
        await mongoose.connect(config.database_url!)
        console.log(`database connected successfully`)

        app.listen(config.port, () => {
            console.log(`server is running port: ${config.port}`)
        })
    } catch (error) {
        console.error(error)
    }
}

main()