import app from "./app";
import { config } from "./config/appConfig";

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});