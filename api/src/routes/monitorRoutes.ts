import { Router } from "express";
import {
  createMonitor,
  getMonitors,
  getMonitorById,
  deleteMonitor,
  updateMonitor,
} from "../controllers/monitorController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();
router.use(requireAuth)
router.post("/", createMonitor);
router.get("/", getMonitors);
router.get("/:id", getMonitorById);
router.delete("/:id", deleteMonitor);
router.put("/:id", updateMonitor);

export default router;
