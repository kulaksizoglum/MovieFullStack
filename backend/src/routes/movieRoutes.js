import Router from "express"
import { getMovies, getMovieById, createMovie, deleteMovie, updateMovie } from "../controllers/movieController.js"
import { requireAdmin } from "../middleware/requireAdmin.js"
const router = Router()


//TODO: do requireauth and require admin
router.get("/", getMovies)
router.get("/:id", getMovieById)
router.post("/", requireAdmin, createMovie)
router.delete("/:id", requireAdmin, deleteMovie)
router.put("/:id", requireAdmin, updateMovie)
export default router