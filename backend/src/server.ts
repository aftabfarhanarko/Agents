import "dotenv/config";
import app from "./app";
import { connectToDatabase, database } from "./config/database";

const PORT = Number(process.env.PORT) || 3000;

async function bootstrap(): Promise<void> {
  try {
    await connectToDatabase();
    console.log(
      `PostgreSQL connected: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'pricktise'}`,
    );

    const server = app.listen(PORT, () => {
      console.log(`
🚀 Server Started Successfully
🌐 URL: http://localhost:${PORT}
📡 API: http://localhost:${PORT}/api
💚 Health: http://localhost:${PORT}/health
      `);
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Application startup failed:", error);
    await database.end();
    process.exit(1);
  }
}

bootstrap();
