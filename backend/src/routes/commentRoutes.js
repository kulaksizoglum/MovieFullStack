import Router from "express"
import { getComments, getCommentByMovieId, deleteComment } from "../controllers/commentController.js"
import { requireAdmin } from "../middleware/requireAdmin.js"
const router = Router()


router.get("/", getComments)
router.get("/movie/:movieId", getCommentByMovieId)
router.delete("/:id", requireAdmin, deleteComment)

export default router