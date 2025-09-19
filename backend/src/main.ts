
import { createServer } from "./presentation/server/server.js";
import dotenv from 'dotenv'


dotenv.config({ path: "./src/config/.env" });


(async () => {
    const app = await createServer();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
})();
